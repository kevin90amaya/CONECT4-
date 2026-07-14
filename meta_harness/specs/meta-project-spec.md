# Especificación del Meta-Arnés (meta-project-spec.md)

> Este documento es mantenido por el agente `spec_partner`.
> Aquí se registra el debate, el propósito, contrato y casos límite para las features orientadas a mejorar el propio `meta_harness`.

## Feature: F_PENDIENTE_03 - Paso de Verificación del Flujo Bob
- **Propósito:** Asegurar de manera explícita que toda característica desarrollada en el meta-arnés cumpla sus criterios de aceptación, cerrando formalmente el ciclo del Flujo Bob.
- **Comportamiento:** Se creará un nuevo rol/agente llamado `verification_partner`. Este agente, al ser invocado tras la aprobación humana, leerá los archivos `.feature`, generará una plantilla `verification_checklist.md`, y asistirá al humano en validar cada escenario manualmente.
- **Casos límite:** El archivo `verification_checklist.md` completado no será borrado, sino que se archivará en la ruta `meta_harness/verifications/history/` para mantener un registro de auditoría permanente, evitando contaminar la raíz o perder el historial.
- **Decisiones:**
  1. **Uso de un checklist manual en lugar de un script automático.** Razón: Permite una validación más reflexiva, flexible y supervisada explícitamente por el humano.
  2. **Guardado en directorio histórico.** Razón: Mantiene una auditoría demostrable de que el agente y el humano verificaron la tarea antes de cerrarla.
  3. **Creación del agente `verification_partner`.** Razón: Separa responsabilidades. Evita sobrecargar al `gherkin_author` con la coordinación de la prueba final.

## Feature: F_PENDIENTE_04 - Integración de Graphify al Meta-Harness
- **Propósito:** Dotar al `meta-harness` de un motor de mapeo visual y semántico que permita comprender y explorar la estructura del arnés.
- **Comportamiento:** Se integrará Graphify nativamente instalándolo como una *Skill* a nivel de proyecto. Su ejecución será bajo demanda (manual) para actualizar los mapas solo cuando sea necesario.
- **Casos límite:** Dado que Graphify genera sus propias instrucciones en `.agents/skills/`, su ciclo de vida y configuración se gestionarán desde allí en lugar de dispersarlos en la carpeta `tools/`.
- **Decisiones:**
  1. **Integración nativa como Skill.** Razón: Respeta la arquitectura de la herramienta original y la hace descubrible de inmediato para todos los agentes del arnés.
  2. **Ejecución manual bajo demanda.** Razón: Otorga control absoluto sobre el momento de ejecución, previniendo sobrecargas de rendimiento (o consumo excesivo) durante los flujos automáticos como el `session_handoff`.

## Feature: F_PENDIENTE_05 - Configuración de Secretos para Graphify
- **Propósito:** Proveer un mecanismo seguro y estandarizado para que los agentes puedan inyectar claves de API (como `GEMINI_API_KEY`) al usar Graphify sin comprometer la seguridad del repositorio.
- **Comportamiento:** Se requerirá la existencia de un archivo `.env` en la raíz del proyecto, el cual será ignorado por Git. Antes de ejecutar Graphify en cualquier exploración, los agentes deberán cargar las variables de este archivo en su entorno (`export $(cat .env | xargs)`). Además, se actualizará el `.gitignore` global para bloquear estos archivos.
- **Casos límite:** 
  1. Si el archivo `.env` no existe, el agente debe fallar de forma controlada y pedir al humano que lo cree, en lugar de intentar ejecutar Graphify a ciegas.
  2. Asegurar que el `.gitignore` cubra cualquier variante (ej. `.env.local`, `.env.test`).
- **Decisiones:**
  1. **Uso del estándar `.env` en lugar de un Vault/Script propio.** Razón: Es el enfoque más simple, seguro y estándar en la industria. Se descartó crear un script interactivo para evitar agregar complejidad y mantenimiento innecesario al meta-arnés.

## Feature: F_PENDIENTE_05.2_05.3 - Control de Cuotas y Throttling para Graphify
- **Propósito:** Permitir que el agente `graphify` realice extracciones semánticas masivas sin violar los límites de peticiones y tokens de la capa gratuita (Free Tier) de Gemini u otros LLMs.
- **Comportamiento:** Se implementará una fusión entre la gestión de sub-agentes nativa de Graphify y un script local configurable. Se añadirá un script en `meta_harness/.agents/skills/graphify/scripts/throttled_extraction.py`. Las instrucciones del agente (`SKILL.md` o referencias) se modificarán para obligarlo a usar este script local en lugar de la ejecución estándar de Python para la Extracción Semántica. Este script leerá las variables `GRAPHIFY_MAX_TPM` y `GRAPHIFY_REST_SECONDS` desde el `.env`, se encargará de particionar la lista de archivos, contará tokens dinámicamente y ejecutará pausas (`sleep`) para respetar los límites configurados.
- **Casos límite:** 
  1. **Archivo gigante anómalo:** Si un archivo excede por sí solo el `GRAPHIFY_MAX_TPM`, será truncado a la capacidad máxima permitida por la cuota para evitar un bloqueo general.
- **Decisiones:**
  1. **Script dedicado local en la Skill.** Razón: Evita tocar el código fuente global del paquete Graphify (riesgoso) y limpia el `SKILL.md` de código Python demasiado extenso, externalizando la lógica compleja de partición y pausas al lado del propio agente.
  2. **Configuración por variables `.env`.** Razón: Permite a cada usuario ajustar el `MAX_TPM` y los tiempos de pausa según su cuenta de LLM sin necesidad de alterar código, usando parámetros por defecto muy conservadores como red de seguridad.

## Feature: F_PENDIENTE_05.5 - Mapeador Interno Propio (Harness Mapper)
- **Propósito:** Reemplazar Graphify con un sistema de mapeo de relaciones semánticas y deterministas que garantice que el 100% de los nodos correspondan a archivos físicos reales, evitando alucinaciones y puntos ciegos.
- **Comportamiento:** Se implementará una arquitectura de dos pasos. Primero, un **Agente Extractor Híbrido** usará un LLM para detectar referencias, pero estará obligado a verificar en el disco que el archivo destino existe antes de sugerir la arista. Segundo, un **Agente Comprobador** verificará lógicamente cada sugerencia re-leyendo el contexto y pedirá aprobación interactiva (Y/n) al humano para cada conexión. Finalmente, se generará una suite idéntica a Graphify (`graph.json`, `GRAPH_REPORT.md`, `graph.html` y `manifest.json`).
- **Casos límite:**
  1. Si un archivo sugerido no existe físicamente, el Extractor descarta la conexión silenciosamente.
  2. Si el humano rechaza una conexión durante la auditoría, ésta no se registra en el grafo.
- **Decisiones:**
  1. **Motor Híbrido.** Razón: Combina el entendimiento de lenguaje natural con la seguridad determinista de rutas reales.
  2. **Auditoría con aprobación humana.** Razón: Evita falsos positivos y mantiene el control total de la calidad del grafo, aprendiendo de las limitaciones observadas en Graphify.
  3. **Replicación Completa de Salida.** Razón: Mantiene la experiencia visual y programática intacta, aunque requiera mayor esfuerzo al reusar la plantilla HTML y lógica de hashes antigua.
  4. **Actualización Incremental (Caching).** Razón: Reduce drásticamente el costo y tiempo de ejecución aprovechando el `manifest.json` para omitir el procesamiento LLM en archivos no modificados.

## Feature: F08_proyecto_03_control_alcance - Clean State Checklist
- **Propósito:** Crear un documento `clean-state-checklist.md` en el `meta_harness` que obligue a verificar 5 dimensiones fundamentales antes de permitir el relevo (handoff) o el cierre de sesión, garantizando que el entorno quede siempre estable y verificable.
- **Comportamiento:** Se implementará un checklist que deberá ser completado antes de actualizar el `session_handoff.md`. Las 5 dimensiones verificadas serán:
  1. **Build:** Ejecución limpia de `./init_meta.sh`.
  2. **Feature Verification:** Validación documental explícita (el campo `evidence` del JSON de features debe contener el comando exacto o ruta que demuestre el éxito).
  3. **Scope Control:** Solo puede haber una tarea `active` a la vez (WIP=1) en el JSON y se debe usar `git status` para validar que los archivos modificados correspondan estrictamente a esa tarea.
  4. **Code Quality:** Cumplimiento total de las directrices en `AGENTS.md` y `META_ARCHITECTURE.md`, con archivos Markdown/JSON bien formados.
  5. **Documentation:** Bitácoras de relevo (`progress.md`, `pendings.md`, `session_handoff.md`) actualizadas, y los diagramas de arquitectura deben estar actualizados reflejando el estado real del arnés.
- **Casos límite:**
  1. Si alguna de las dimensiones falla, el relevo de sesión no puede realizarse y el agente debe retroceder para corregir el entorno.
- **Decisiones:**
  1. **Adaptación de Build.** Razón: Al no haber compilación de código de producción, `init_meta.sh` actúa como el test de integridad estructural base.
  2. **Evidencia estricta en JSON.** Razón: Obliga a dejar rastros auditables y mecánicos en lugar de afirmaciones vacías.
  3. **Requisito explícito de diagramas.** Razón: Mantiene la documentación visual sincronizada de forma obligatoria con la realidad estructural.

## Feature: F09_proyecto_04_observabilidad_reglas - Validación Activa de Reglas (WIP=1)
- **Propósito:** Convertir la regla pasiva "mantener solo una tarea activa a la vez (WIP=1)" de `AGENTS.md` en un script bash de validación activa, basándose en la lección del Proyecto 04 original.
- **Comportamiento:** Se creará un script `check-wip.sh` (ej. en una carpeta `scripts/` o análogo) que analizará `meta_feature_list.json` y `bob_feature_list.json`. El script contará cuántas tareas tienen el estado `in_progress` o `active`. Si la suma es mayor a 1, el script terminará con error (`exit 1`) e imprimirá un mensaje explicativo.
- **Casos límite:**
  1. Si hay 0 tareas activas, el script debe pasar exitosamente (el entorno está en reposo esperando nueva tarea).
  2. Fallos al leer los JSON (ej. JSON inválido o jq no disponible) deben hacer fallar al script explícitamente.
- **Decisiones:**
  1. **Comenzar con la regla WIP=1.** Razón: Es la regla de comportamiento más crítica para evitar el desborde de alcance ("scope creep").
  2. **Script bash separado (`check-wip.sh`).** Razón: Sigue la arquitectura del Proyecto 04 original, permitiendo ejecutarlo de forma aislada o inyectarlo en el `init_meta.sh`.

## Feature: F11_proyecto_06_capstone - Ensamblaje final y Script de Limpieza de Basura
- **Propósito:** Proveer un escáner de limpieza que detecte la deuda técnica generada por la IA (archivos huérfanos, TODOs sin resolver, referencias rotas) para mantener la salud del meta-arnés.
- **In Scope (En Alcance):** 
  - Creación del script `scripts/cleanup-scanner.sh` que analice los directorios del meta-arnés.
  - El escáner funcionará en modo "Dry-Run" (solo lectura) y exportará sus resultados a un archivo físico de reporte (`state/cleanup-report.md`).
  - **Archivos Involucrados:** `scripts/cleanup-scanner.sh` (ejecutor), `state/cleanup-report.md` (salida), `clean-state-checklist.md` (se añadirá un paso obligando a que el escaneo esté limpio antes del relevo), y `ORCHESTRATOR.md` (para instruir su uso).
  - **Agentes Involucrados:** `session_verifier` (será el encargado exclusivo de leer el `cleanup-report.md` y bloquear el relevo si hay "basura").
- **Out of Scope (Fuera de Alcance):** 
  - El escáner tiene estrictamente PROHIBIDO borrar archivos o modificar código automáticamente.
  - No debe evaluar la lógica del código, solo rastrear marcadores residuales explícitos y archivos rotos.
- **Casos límite:**
  - Si se detecta "basura", el relevo (`session_handoff`) queda bloqueado por el `session_verifier` hasta que el humano o un agente limpie los archivos reportados.
- **Decisiones:**
  1. **Control Total (Código + Docs).** Razón: Garantiza la limpieza exhaustiva en ambas capas del meta-arnés.
  2. **Modo Dry-Run con Reporte Físico.** Razón: Evoluciona el diseño original del Proyecto 06, previniendo eliminaciones accidentales y evitando inundar la memoria del chat al depositar los resultados en un archivo.

## Feature: F12_redefinicion_progress_meta_harness - Redefinición del rol de progress.md
- **Propósito:** Redefinir la función del archivo `progress.md` en el `meta_harness` para que actúe como un relevo dinámico entre agentes (en lugar de relevo de sesiones), facilitando la continuidad entre fases y permitiendo que todos los agentes registren sus decisiones.
- **In Scope (En Alcance):**
  - Actualizar `progress.md` para soportar una estructura que incluya: ID de tarea activa, fase actual del Flujo Bob, `último_turno` (Last Turn), `siguiente_turno` (Next Turn), decisiones tomadas y recursos estudiados.
  - Modificar las reglas en `ORCHESTRATOR.md` para autorizar a todos los agentes en el pipeline a editar `progress.md` al finalizar su fase (tras el OK del humano).
  - Modificar las reglas en `.agents/skills/session_verifier/SKILL.md` y `.agents/skills/generator_partner/SKILL.md` para reflejar que `progress.md` ya no es responsabilidad exclusiva de `session_verifier`.
  - Definir la estructura estandarizada que debe tener la bitácora de relevo de cada agente dentro de `progress.md`.
- **Out of Scope (Fuera de Alcance):**
  - Modificar el comportamiento de `session_handoff.md` o del checklist `clean-state-checklist.md` (estos siguen siendo de exclusividad de `session_verifier` en la auditoría general de sesión).
  - Automatizar la escritura de `progress.md` mediante scripts complejos del sistema (la edición sigue siendo realizada por el agente activo en su turno tras la validación humana).
- **Casos límite:**
  - Si un agente inicia su turno y detecta que el `siguiente_turno` en `progress.md` no coincide con su rol, debe alertar de inmediato al humano y detenerse.
  - Al concluir la sesión completa de trabajo (handoff general), el estado final de `progress.md` debe estar en reposo (`último_turno: session_verifier`, `siguiente_turno: Orchestrator` o `ninguno`).
- **Decisiones:**
  - **Permisos distribuidos:** Se descentraliza la edición de `progress.md` para que cada agente especialista registre su relevo directo, evitando sobrecargar al `session_verifier` con la síntesis detallada de micro-decisiones de diseño o código que él no implementó.
  - **Estructura de Relevo Simple:** Se mantiene un formato estructurado en Markdown legible tanto por humanos como por futuros agentes que inicien en frío.

