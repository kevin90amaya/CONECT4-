# Manifiesto de Ingeniería de Arneses (Harness Engineering Manifesto)

Este documento centraliza la filosofía, la arquitectura base y los consejos de orden de construcción extraídos del estudio de ingeniería de arneses (análisis de sistemas como Claude Code y Codex). Sirve como base para el diseño y evolución de `bob-harness`.

## Parte 1: Los 10 Principios Fundamentales
*(Basado en la experiencia de sistemas en producción, extraído del Capítulo 9 del Libro 1)*

1. **Los modelos son componentes inestables, no compañeros de equipo:** La confiabilidad del sistema debe residir en la estructura del arnés (permisos, recuperación, verificación), no en asumir que el modelo no se equivocará.
2. **El "Prompt" es parte del panel de control:** No es para darle personalidad al agente, es para dictar reglas de comportamiento estrictas, manejo de límites y protocolos de ejecución de herramientas.
3. **El bucle de ejecución (Query Loop) es el corazón del sistema:** Un arnés opera manteniendo un estado continuo a través de múltiples turnos. La preparación antes de llamar al modelo y la limpieza después son tan importantes como la llamada misma.
4. **Las herramientas son interfaces de ejecución administradas:** Especialmente Bash. No se le da acceso libre; cada ejecución requiere orquestación, verificación de permisos estricta y capacidad de interrupción.
5. **El contexto es memoria de trabajo:** No es un basurero. Se debe presupuestar, compactar inteligentemente y separar entre reglas permanentes e historial temporal para mantener la coherencia.
6. **Los caminos de error son caminos principales:** Los límites de tokens, errores de API e interrupciones son el día a día. El sistema debe diseñarse asumiendo que ocurrirán.
7. **La recuperación debe priorizar la continuidad:** Ante un error o corte, la prioridad del arnés es retomar el flujo de trabajo donde se quedó, no disculparse y empezar de cero.
8. **El esquema Multi-Agente particiona la incertidumbre:** Su valor radica en la separación de responsabilidades (uno investiga, otro implementa, otro verifica), no simplemente en correr procesos en paralelo.
9. **La verificación debe ser independiente:** Quien implementa (el modelo) no puede ser su propio validador exclusivo. Se requiere una capa de validación externa, objetiva y estricta.
10. **Las instituciones del equipo importan más que los trucos personales:** Las reglas, los permisos y las políticas de verificación deben estar codificadas en el sistema para que cualquier usuario pueda operar de forma segura sin depender del conocimiento de un experto.

---

## Parte 2: Arquitectura Lógica Base (Pseudocódigo)
*(El plano estructural para los componentes clave, extraído del Apéndice A)*

### 1. El Bucle de Ejecución (`queryLoop`)
```text
state = { messages, toolUseContext, compactTracking, turnCount, transition }
mientras no terminar(state):
    preparar_contexto(state)        // Limpiar, compactar, cargar memoria
    eventos = ejecutar_modelo(state)
    por cada evento en eventos:
        si es uso_herramienta: encolar(evento, state.toolUseContext)
        si es error_critico: retornar mostrar_error(evento)
    
    si interrumpido_por_usuario:
        cerrar_herramientas_pendientes()
        romper
        
    state = avanzar(state, intentar_recuperacion(state))
```

### 2. Decisiones de Permisos
```text
decision = verificar_permisos_herramienta(herramienta, parametros, contexto)
segun decision:
    allow (Permitir):  ejecutar(herramienta, parametros)
    deny (Denegar):    rechazar(razon)
    ask (Preguntar):   derivar_a(orquestador | usuario_humano)

// Reglas críticas:
// - La decisión SIEMPRE es de 3 vías (nunca simplificar a booleano).
// - Un "ask" nunca escala automáticamente a "allow".
```

### 3. Recuperación de Errores (Ejemplo: Prompt demasiado largo)
```text
al_recibir error_recuperable(e):
    si e es limite_de_contexto:
        si hay_colapsos_pendientes > 0: 
            ejecutar_recuperacion_leve()
        sino si no_hemos_intentado_compactar: 
            ejecutar_compactacion_reactiva()
        sino: 
            mostrar_error(e) // No crear un bucle infinito
```

---

## Parte 3: Consejos para el Orden de Construcción

*(Una guía estratégica de qué atacar primero, basada en el Capítulo 8 del Libro 2)*

El siguiente orden no es una camisa de fuerza, sino una recomendación para ir estabilizando el arnés sin ahogarse en complejidad prematura.

### Prioridad 1: Domar lo destructivo
- Declarar las acciones de alto riesgo y definir un modelo mínimo de permisos (qué se deniega automáticamente, qué requiere preguntar).
- Establecer las reglas estrictas de qué directorios o comandos (`git`, comandos destructivos) están prohibidos.

### Prioridad 2: Estabilizar el latido (Heartbeat)
- Definir el estado del bucle principal (`messages`, contadores, estado de herramientas).
- Asegurar que toda herramienta ejecutada tenga un cierre (incluso si es interrumpida, no dejar llamadas "colgando").
- Conectar la ruta de cancelación/aborto.

### Prioridad 3: Gobernanza del contexto y recuperación
- Definir umbrales para la memoria y reglas de compactación.
- Implementar las rutas de recuperación ante exceso de tokens sin crear bucles infinitos.

### Prioridad 4: Expandir capacidades y reglas locales
- Introducir las habilidades (`skills`), reglas específicas del proyecto y "hooks" (eventos de ciclo de vida).

### Prioridad 5: Multi-Agente y complejidad
- Dividir roles, delegar tareas y habilitar orquestación compleja solo cuando el bucle base ya es robusto y verificable por sí mismo.

---

## Parte 4: Lecciones Prácticas (Learn Harness Engineering)
*(Conocimiento extraído de las lecciones prácticas del curso)*

### Lección 01: Los modelos fuertes no significan ejecución fiable
- **Tesis Central:** Actualizar a un modelo más potente rara vez soluciona los fallos. El problema suele ser el "Harness" (equipo de monta).
- **Las 5 Capas Defensivas del Harness:** Todo fallo debe atribuirse a una de estas capas para corregirlo:
  1. **Especificación de la tarea:** Evitar ambigüedades.
  2. **Provisión de contexto:** Hacer explícitas las reglas arquitectónicas (ej. `AGENTS.md`).
  3. **Entorno de ejecución:** Garantizar dependencias y herramientas listas.
  4. **Feedback de verificación:** Dar herramientas para probar (evita la "brecha de verificación", donde el agente cree que terminó sin probar).
  5. **Gestión del estado:** Prevenir pérdida de contexto en tareas largas.
- **Bucle Diagnóstico:** Cuando hay un fallo, no culpar al modelo. Identificar en qué capa del arnés ocurrió el error, corregirla y reintentar.
- **Definition of Done (DoD) Explícita:** Exigir siempre criterios verificables por máquina (ej. *los tests pasan*).

### Lección 02: Qué significa realmente harness
- **El Harness es una infraestructura completa:** No es solo un archivo de prompt. Entregar solo instrucciones es como dar ingredientes sin una cocina (herramientas, entorno, estado).
- **El Repositorio es la Única Fuente de Verdad:** Lo que no está en el repositorio mediante instrucciones o reglas explícitas, el agente no lo sabe.
- **Mapa, no manual:** El `AGENTS.md` debe ser conciso (~100 líneas). Para reglas profundas, enlazar a una carpeta `docs/`.
- **Los 5 Subsistemas (La Cocina):**
  1. **Instrucciones:** Resumen, stack y restricciones fijas (`AGENTS.md`).
  2. **Herramientas:** Acceso shell/archivos con privilegios adecuados.
  3. **Entorno:** Dependencias autodescriptivas (`pyproject.toml`, Docker).
  4. **Estado:** Seguimiento del progreso entre sesiones (`PROGRESS.md`).
  5. **Feedback de Verificación:** El subsistema de mayor retorno (ROI). Comandos explícitos de test y lint.
- **Ablación:** Para saber el valor de cada subsistema, quita uno a la vez y observa la caída de rendimiento.

### Lección 03: Convierte el repositorio en la fuente única de verdad
- **Repo as Spec:** Lo que no está en el repositorio (en archivos) no existe para el agente. No puede preguntar por Slack ni ver Confluence.
- **Prueba de Arranque en Frío:** Un repositorio está listo si un agente nuevo puede responder 5 preguntas leyendo el código: ¿Qué es? (`AGENTS.md`), ¿Cómo se organiza? (`ARCHITECTURE.md`), ¿Cómo se ejecuta? (Makefile), ¿Cómo se verifica? (Tests/Lint), ¿En qué estado estamos? (`PROGRESS.md`).
- **Principios del Mapa de Conocimiento:**
  - El conocimiento vive junto al código (ej. un README por módulo).
  - Archivo de entrada estandarizado (`AGENTS.md`).
  - Mínimo pero completo.
  - Se actualiza junto con el código (docs desactualizadas son fatales).
- **Principios ACID para Agentes:**
  - **Atomicidad:** Cada paso es un commit o se revierte entero.
  - **Consistencia:** Solo se guarda si los tests/lint pasan.
  - **Aislamiento:** Múltiples agentes no editan el mismo estado a la vez.
  - **Durabilidad:** El conocimiento importa en archivos de texto, no en la memoria de chat.

### Lección 04: Divide las instrucciones entre archivos
- **La trampa del Archivo Gigante:** Poner todo en `AGENTS.md` (cientos de líneas) agota el contexto, aumenta el ruido y empeora el rendimiento del agente.
- **Efecto "Lost in the Middle":** Los LLMs ignoran las instrucciones en el medio de textos largos. Las reglas críticas siempre deben ir arriba o abajo.
- **Ambigüedad de Prioridades:** Mezclar reglas estrictas con consejos de estilo confunde al agente sobre qué es verdaderamente innegociable.
- **El Archivo Enrutador:** `AGENTS.md` debe ser corto (50-200 líneas) y contener: resumen, comandos rápidos, restricciones duras y enlaces a otros documentos.
- **Divulgación Progresiva (Progressive Disclosure):** Carga los detalles (ej. `docs/api-patterns.md`) solo si la tarea lo requiere, mejorando así la eficiencia de tokens (Signal-to-Noise Ratio).
- **Mantenimiento:** Gestiona las instrucciones como si fuesen código. Si una regla queda obsoleta o no se usa, elimínala sin piedad.

### Lección 05: Mantén vivo el contexto entre sesiones
- **El Artesano Amnésico:** Un agente en una tarea larga pierde memoria si no se le deja un "diario". Perder el contexto lleva a decisiones inconsistentes y reescritura de código.
- **Ansiedad de Contexto:** Cuando los agentes ven que su ventana de contexto se agota, tienden a apresurarse y cerrar la tarea prematuramente, saltando tests y eligiendo soluciones simples sobre las óptimas.
- **El Diario (Artefactos de Continuidad):** 
  - `PROGRESS.md`: Documenta estado actual, tareas completadas, en progreso, bloqueos y siguientes pasos.
  - `DECISIONS.md`: Guarda el "por qué" de las cosas, no solo el "qué" (el código).
  - Puntos de control: Commits frecuentes de Git.
- **Compresión vs Reseteo:** Comprimir el contexto retiene información superficial pero no quita la ansiedad. Resetear (sesión nueva) leyendo los artefactos de continuidad quita la ansiedad pero exige un diario impecable.
- **Costo de Reconstrucción:** El éxito de tu arnés se mide por el tiempo que tarda una nueva sesión en ser funcional y retomar la tarea (el ideal es menos de 3 minutos).

### Lección 06: Inicializa antes de cada sesión del agente
- **Cimientos primero, paredes después:** Mezclar la configuración del proyecto con la escritura de funcionalidades (features) es un error. El agente priorizará escribir código, dejando un entorno mal configurado que arruinará el proyecto a la larga.
- **Sesión 1 dedicada:** La primera sesión de trabajo debe dedicarse EXCLUSIVAMENTE a crear infraestructura, no a programar lógica de negocio.
- **El Contrato de Arranque:** Un proyecto solo está listo para que el agente trabaje si cumple 5 condiciones:
  1. Entorno instalable y ejecutable sin fallos (`make setup`).
  2. Framework de testing configurado con al menos un test pasando.
  3. Documentación clara de cómo iniciar y probar el código.
  4. Lista de tareas (Task breakdown) clara.
  5. Primer commit limpio en Git.
- **Arranque en caliente (Warm Start):** No empieces nunca desde cero. Usa plantillas (templates) para tener directorios, tests y dependencias preconfiguradas. Es como llegar a un terreno con agua y luz instaladas.
- **ROI de la inicialización:** Invertir 20 minutos de presupuesto extra en esta fase inicial se recupera por completo (y ahorra tiempo) en las 3 o 4 sesiones siguientes.

### Lección 07: Define límites claros para las tareas del agente
- **Sobrealcance (Overreach):** Los agentes tienden a intentar resolver múltiples cosas a la vez (ej. añadir un login y de paso refactorizar la BD). Esto agota el contexto y resulta en mucho código escrito pero ninguna funcionalidad completada.
- **La atención es matemática:** Si el agente abre "k" tareas, la atención se divide. Entre más líneas de código escribe un agente de golpe, menor es su tasa de éxito real.
- **La Regla WIP=1 (Work In Progress):** El arnés debe obligar al agente a tener solo **UNA** tarea activa a la vez. Termina una, pruébala, y solo entonces empieza la siguiente.
- **Evidencia de Completitud:** "El código se ve bien" no es un estado válido. Una tarea solo está terminada si pasa una prueba verificable por máquina (ej. `curl` devuelve 201 o un test automatizado pasa en verde).
- **Superficie de Alcance externalizada:** El estado de las tareas debe vivir en un archivo legible por máquina (`PROGRESS.md` o JSON) que dicte qué tarea está activa y qué falta, evitando así el scope creep (aumento descontrolado del alcance).

### Lección 08: Usa listas de funciones para limitar al agente
- **La Lista de Funciones es un primitivo:** No es solo una "todo-list" para humanos; es una estructura de datos vital. El planificador, verificador y generador de reportes dependen completamente de ella.
- **Definición de "Terminado":** Si no hay un estándar claro, el agente asumirá que "terminado" es simplemente haber escrito código sin errores de sintaxis obvios.
- **La Tripleta Obligatoria:** Cada tarea debe tener tres elementos inseparables: (1) Comportamiento esperado, (2) Comando de Verificación (ej. script de test) y (3) Estado (`not_started`, `active`, `blocked`, `passing`).
- **Control de Transición (Pass-state gating):** El agente NUNCA puede marcar una tarea como completada por sí mismo. Solo el Arnés puede cambiar el estado a `passing` después de ejecutar el Comando de Verificación exitosamente.
- **Única Fuente de Verdad:** Lo que hay que hacer vive en la lista de funciones (`features.md` o JSON). Lo discutido en el chat que no esté ahí, no existe.
- **Granularidad de Sesión:** Las tareas deben ser del tamaño de "una sesión". Ni tan grandes como "hacer todo el carrito", ni tan pequeñas como "añadir un campo a la tabla".

### Lección 09: Evita que los agentes declaren victoria demasiado pronto
- **Falso sentido de finalización:** Los agentes sufren de un exceso de confianza sistemático. Creen que terminaron si el código compila y los tests unitarios pasan, ignorando fallos de entorno, de base de datos o de integración end-to-end.
- **Pasar tests unitarios ≠ Tarea terminada:** Los tests unitarios usan "mocks" que ocultan problemas reales de integración. Nunca confíes únicamente en ellos para declarar "hecho".
- **Verificación de 3 Capas:** El arnés debe exigir que el código pase 3 barreras antes de dar por terminada la tarea: (1) Sintaxis/Estático, (2) Pruebas Unitarias y Arranque de la App, y (3) Simulación de usuario End-to-End.
- **El Calificador Independiente:** Un agente que se evalúa a sí mismo siempre será indulgente. Necesitas que la evaluación la haga un script estricto del arnés o un agente evaluador independiente.
- **Prohibido Refactorizar prematuramente:** Nunca permitas que el agente intente "limpiar el código" antes de haber verificado que la funcionalidad principal opera correctamente.
- **Corrección con "Bolígrafo Rojo":** No devuelvas al agente un simple "Falló el test". Entrégale feedback explícito y accionable (ej. "El test falló porque falta la variable de entorno de BD. Verifica el `.env`").

### Lección 10: Solo las pruebas end-to-end son verificación real
- **Los puntos ciegos de las pruebas unitarias:** Probar componentes de manera aislada con mocks no detectará problemas de interacción entre componentes, diferencias de entorno ni fugas de recursos.
- **Las pruebas E2E cambian la mentalidad del agente:** Si el agente sabe que el flujo completo será probado, escribirá el código prestando más atención a las interfaces, los errores y la arquitectura global.
- **Reglas arquitectónicas ejecutables:** Una regla en un `README` (ej. "el frontend no accede a la BD") es inútil si no se impone. Debe convertirse en un script automatizado que falle (linting/grep) si el agente viola el límite.
- **Promoción de Feedback:** Cuando un agente comete un error repetitivo que se atrapa en las revisiones, esa lección debe convertirse en una regla automatizada dentro del arnés. Así, el arnés se vuelve progresivamente más estricto y fuerte.
- **Mensajes de error orientados a agentes (Red-Pen):** Los errores de las pruebas no deben decir solo "Falló". Deben explicar *qué* falló, *por qué*, y lo más importante, *cómo solucionarlo* con instrucciones precisas.

### Lección 11: Haz observable el runtime del agente
- **El problema de adivinar a ciegas:** Si el agente falla pero el arnés no le da registros detallados, sus reintentos serán modificaciones aleatorias al código, desperdiciando tiempo y recursos.
- **Las dos capas de Observabilidad:** 
  1. *Runtime (Qué pasó):* Logs, trazas, uso de memoria, eventos.
  2. *Proceso (Por qué se acepta/rechaza):* Planes, criterios de aceptación y rúbricas.
- **Sprint Contracts (Contratos de Sprint):** Un acuerdo escrito antes de programar que define: alcance, estándares de verificación y exclusiones explícitas. Evita que el agente trabaje en algo que de todos modos será rechazado.
- **Rúbricas de Evaluación Estructuradas:** Eliminar la evaluación subjetiva. Transformarla en puntuaciones basadas en dimensiones exactas (Ej. Pasa todos los tests = A, Falla el build = F).
- **El Acantilado del Handoff (Relevo):** Sin trazas detalladas, un agente nuevo que retoma el trabajo de otro desperdiciará hasta el 50% de su tiempo solo tratando de entender en qué estado quedó el sistema.

### Lección 12: Deja un handoff limpio al final de cada sesión
- **La entropía es el estado por defecto:** Si una sesión termina sin limpiar, el código base se degrada rápidamente. Los builds empiezan a fallar y el tiempo para que el agente arranque la próxima sesión se dispara.
- **Las 5 Dimensiones del "Clean State" (Estado Limpio):** 
  1. Compila sin errores.
  2. Todos los tests pasan.
  3. El progreso está actualizado en el archivo de seguimiento.
  4. Código temporal de debug (logs, TODOs) eliminado.
  5. La ruta de inicio estándar funciona.
- **Limpiar después es no limpiar nunca:** El próximo agente no va a limpiar tu desastre, simplemente escribirá código nuevo encima del caos existente. La limpieza es obligatoria antes de salir.
- **El Documento de Calidad:** Un registro vivo que califica cada módulo de tu sistema. Sirve para saber exactamente qué partes de la base de código necesitan refactorización.
- **Simplificación del Arnés:** A medida que los modelos de IA se vuelven más inteligentes, elimina periódicamente reglas y restricciones antiguas del arnés que ya solo aportan burocracia.

## Parte 5: Proyectos Prácticos (Learn Harness Engineering)

### Proyecto 01: El Arnés Mínimo vs Solo Prompt
> **Fuente de Referencia:** [Proyecto 01 - Index](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/projects/project-01-baseline-vs-minimal-harness/index.md) | [Carpeta de Solución](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/projects/project-01-baseline-vs-minimal-harness/project-01/solution/)

- **El problema de "Solo Prompt":** Sin una estructura definida, las tareas complejas carecen de límites, verificación y memoria, llevando a código no determinista o fallos silenciosos.
- **Los 5 Pilares del Arnés Mínimo:** Para que el trabajo sea fiable y comprobable, el esqueleto mínimo debe contener:
  1. **`AGENTS.md` (Reglas y Límites):** Define "Startup Rules" (pasos obligatorios antes de escribir código), límites arquitectónicos y la objetiva Definition of Done (DoD).
  2. **`CLAUDE.md` (Referencia Rápida):** Punto de entrada que contiene comandos exactos de compilación/ejecución, mapeo de archivos clave y guías mecánicas paso a paso.
  3. **`init.sh` (Verificación de Estado Limpio):** Un script simple (instalar, build, check) que sirve como sanity check para asegurar que el entorno está limpio antes de que el agente empiece a trabajar.
  4. **`feature_list.json` (Alcance y Evidencia):** Lista estructurada de tareas exigiendo `"status": "pass"` y `"evidence"`. Obligar al agente a escribir la evidencia evita declaraciones de éxito prematuras.
  5. **`claude-progress.md` (Memoria de Sesión):** Bitácora inmutable (Duración, Meta, Qué se hizo, Decisiones, Problemas) que preserva el contexto entre ventanas de ejecución.

### Proyecto 02: Workspace Legible y Continuidad
> **Fuente de Referencia:** [Proyecto 02 - Index](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/projects/project-02-agent-readable-workspace/index.md) | [Carpeta de Solución](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/projects/project-02-agent-readable-workspace/project-02/solution/)

- **Separación de Preocupaciones (SoC) en Documentación:** Un documento de instrucciones gigante confunde al agente. Es crucial separar:
  - `docs/ARCHITECTURE.md`: Contiene el *cómo* (patrones, límites de capas, stack técnico).
  - `docs/PRODUCT.md`: Contiene el *qué* (requisitos funcionales de negocio).
  - `AGENTS.md`: Exclusivo para reglas de comportamiento y gobernanza del agente.
- **El Patrón de Relevo (`session-handoff.md`):** Funciona como puente de memoria a corto plazo entre sesiones. Obliga a que cada sesión termine registrando: 
  - *What Was Accomplished* y *What Remains*.
  - *Decisions Made* (el "por qué", vital para evitar regresiones de diseño cuando otro agente retoma el trabajo).
  - *Files Modified* y *Blockers*.
Con este documento, la siguiente sesión del agente no pierde tiempo infiriendo el estado actual del repositorio, logrando continuidad total.

### Proyecto 03: Continuidad Multi-Sesión y Control de Alcance
> **Fuente de Referencia:** [Proyecto 03 - Index](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/projects/project-03-multi-session-continuity/index.md) | [Carpeta de Solución](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/projects/project-03-multi-session-continuity/project-03/solution/)

- **Verificación Estricta (Evidence-based passing):** Regla inquebrantable de enfocarse en una sola funcionalidad a la vez. Jamás se marca una tarea como `"pass"` en la lista de funcionalidades sin escribir explícitamente *cómo* se probó. Esto anula las alucinaciones del agente.
- **Lista de Estado Limpio (`clean-state-checklist.md`):** Es el contrato final de salida. Obliga a verificar exhaustivamente 5 dimensiones antes de dar el relevo (`session-handoff.md`):
  1. *Build*: El código compila sin errores de tipos.
  2. *Features*: El producto funciona según `PRODUCT.md`.
  3. *Scope*: Se respetó el "un feature a la vez" y existen evidencias escritas.
  4. *Code Quality*: Se respetó `ARCHITECTURE.md` (sin `any`, respeto estricto de capas).
  5. *Documentation*: Las bitácoras y la arquitectura fueron actualizadas.
  Sin cumplir estos checks, la sesión no puede terminar, garantizando que el siguiente agente (o sesión) jamás heredará un entorno roto.

### Proyecto 04: Observabilidad en Runtime y Reglas Ejecutables
> **Fuente de Referencia:** [Proyecto 04 - Index](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/projects/project-04-incremental-indexing/index.md) | [Carpeta de Solución](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/projects/project-04-incremental-indexing/project-04/solution/)

- **Observabilidad en Runtime:** Sin logs estructurados ni trazas de error claras, cuando un agente se topa con un fallo, intenta arreglarlo modificando código al azar ("adivinando a ciegas"). Proveer observabilidad y logs precisos acorta el tiempo de diagnóstico drásticamente y evita que el agente destruya código funcional.
- **Restricciones Arquitectónicas Ejecutables:** Una regla de arquitectura documentada pasivamente en `ARCHITECTURE.md` (ej. "el frontend no debe importar fs") no es suficiente porque la IA puede ignorarla al alucinar. La solución definitiva es convertir esas reglas de texto en **Scripts de Validación** (ej. un `check-architecture.sh` que falle si encuentra imports prohibidos) y hacer que este script se ejecute obligatoriamente dentro del *Clean State*. Así, la regla se convierte en un muro infranqueable.

### Proyecto 05: Autoverificación y Separación de Roles
> **Fuente de Referencia:** [Proyecto 05 - Index](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/projects/project-05-grounded-qa-verification/index.md) | [Carpeta de Solución](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/projects/project-05-grounded-qa-verification/project-05/solution/)

- **El Problema del Agente Solitario:** Un agente que planifica, codifica y se evalúa a sí mismo tiene un sesgo de confirmación enorme. Declarará "victoria prematura" asumiendo que su código funciona aunque falten requisitos o tenga errores.
- **Separación de Roles (Planner, Generator, Evaluator):** 
  - *El Planificador (Planner)* redacta un **Sprint Contract** (`sprint-contract.md`) estableciendo Criterios de Aceptación estrictos y límites ("fuera de alcance") *antes* de tocar código.
  - *El Generador (Generator)* programa intentando cumplir ese contrato.
  - *El Evaluador / Juez (Evaluator)* revisa el trabajo cruzándolo con una **Rúbrica Estructurada** (`evaluator-rubric.md`) que puntúa del 1 al 5 en múltiples dimensiones (Funcionalidad, Diseño, Casos Borde, Código).
  Esta división obliga al Generador a pasar por ciclos de revisión y corrección reales, elevando drásticamente la calidad final.

### Proyecto 06: Arnés Completo (Capstone)
> **Fuente de Referencia:** [Proyecto 06 - Index](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/projects/project-06-runtime-observability-and-debugging/index.md) | [Carpeta de Solución](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/projects/project-06-runtime-observability-and-debugging/project-06/solution/)

- **El Arnés Definitivo:** Es la suma sistemática de todas las capas: Arnés Mínimo (`AGENTS.md`, `init.sh`, `feature_list.json`) + Workspace Legible (`ARCHITECTURE.md`, `PRODUCT.md`) + Continuidad (`session-handoff.md`) + Estado Limpio (`clean-state-checklist.md`) + Separación de Roles (Sprint Contracts y Rúbricas) + Reglas Ejecutables (`check-architecture.sh`).
- **Control de Deuda Técnica de IA:** Los agentes suelen dejar comentarios huérfanos, console.logs temporales o "código muerto". Es vital crear un **Script de Limpieza** (ej. `cleanup-scanner.sh`) que barra la basura generada por la IA antes de cerrar ciclos de desarrollo largos.
- **Estudios de Ablación Periódicos:** Los LLMs mejoran mes a mes. El arnés no debe acumular reglas infinitamente. Regularmente se deben "apagar" restricciones del arnés para comprobar si el agente actual sigue rompiendo el código sin ella; si el modelo ya lo domina de forma natural, la regla se elimina para reducir la burocracia del prompt.

## Parte 6:Estudios de Recursos (Resources y Plantillas)

### El Paquete Mínimo Recomendado
> **Fuente de Referencia:** [Resources Index](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/resources/index.md)

Para evitar que los agentes tengan que redescubrir el entorno en cada sesión y declaren "victoria" prematuramente en tareas complejas, se recomienda fuertemente implementar un "Paquete Mínimo de Estabilidad". Este paquete es el núcleo básico para hacer que los flujos con agentes sean estables y consta de 4 archivos base:

1. **Instrucciones Raíz (`AGENTS.md` o `CLAUDE.md`)**: Define el comportamiento, reglas y límites del agente.
2. **Estado de Funcionalidades (`feature_list.json`)**: Mantiene un registro estructurado y objetivo del estado de los requerimientos.
3. **Registro de Progreso (`claude-progress.md` o análogos)**: Mantiene la bitácora activa para que el agente sepa exactamente dónde está y qué se hizo en la sesión anterior.
4. **Script de Arranque (`init.sh`)**: Automatiza la validación del entorno y el estado inicial (y final) del código, estandarizado típicamente en 3 pasos: Instalación, Verificación y Arranque.

*Nota:* Para proyectos muy grandes y de múltiples dominios, este paquete no es suficiente y se debe transicionar a un esquema de "gobernanza agent-first" más complejo (`openai-advanced`). Adicionalmente, el paquete mínimo puede ser complementado con herramientas de entrega de sesión (`session-handoff.md`) y validación de estado final (`clean-state-checklist.md`).

### Reglas de Oro de las Plantillas Avanzadas
> **Fuente de Referencia:** [Templates Index](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/resources/templates/index.md)

1. **Gestión Estricta de Funcionalidades (`feature_list.json`)**:
   - Existen solo 4 estados permitidos: `not_started`, `in_progress`, `blocked`, `passing`.
   - **Regla Inquebrantable**: Solo puede haber **una** característica en `in_progress` a la vez. No se marca como `passing` sin aportar evidencia concreta de la verificación.
2. **Medición de Calidad a Dos Niveles**:
   - **Rúbrica del Evaluador (`evaluator-rubric.md`)**: Responde a "¿Hizo el agente un buen trabajo en esta sesión?". Mide la calidad de la salida y la disciplina a corto plazo.
   - **Documento de Calidad (`quality-document.md`)**: Responde a "¿El proyecto se está fortaleciendo o debilitando con el tiempo?". Mide la salud arquitectónica del código base a largo plazo.
3. **Estudios de Ablación del Arnés**: El documento de calidad se utiliza para justificar la simplificación del arnés. Se "apagan" componentes o reglas del arnés temporalmente; si la calidad no baja al ejecutar benchmarks, la regla se elimina permanentemente. Esto reduce la burocracia del prompt conforme los modelos de IA evolucionan naturalmente.

### Teoría de Modos de Fallo y Calibración
> **Fuente de Referencia:** [Reference Index](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/resources/reference/index.md) y Referencias Internas

1. **La Verdadera Definición de un Arnés**: Un arnés NO es un prompt gigante. Es el **sistema de ejecución completo** alrededor del modelo, que incluye: el bucle del agente, ejecución de herramientas, sandboxing, estado, contexto, verificación, terminación, orquestación y observabilidad.
2. **Mapa de Modos de Fallo (`method-map.md`)**:
   - Para curar la **Confusión de inicio en frío**, usa `claude-progress.md`.
   - Para curar la **Expansión de alcance (Scope creep)**, usa `feature_list.json`.
   - Para curar la **Completación prematura**, usa `clean-state-checklist.md`.
   - Para curar el **Inicio frágil**, usa `init.sh`.
   - Para curar la **Revisión subjetiva**, usa `evaluator-rubric.md`.
3. **Principio de Calibración de Prompts (`prompt-calibration.md`)**:
   - **Regla de Oro**: Evita resolver cada problema de fiabilidad volcando más texto en el archivo de instrucciones global (conocido como *prompt stuffing*).
   - *Mantén en el archivo raíz* (`AGENTS.md`): el propósito, las rutas de inicio/verificación, restricciones no negociables, y reglas estables de inicio/fin de sesión.
   - *Saca del archivo raíz*: casos límite históricos, detalles específicos de un subsistema o notas de arquitectura locales (crea documentos más pequeños y enlázalos en su lugar).
4. **Separación de Flujos Operativos**:
   - **Inicializador (`initializer-agent-playbook.md`)**: Solo prepara la superficie operativa inicial.
   - **Codificador (`coding-agent-startup-flow.md`)**: Sigue un flujo rígido: 1) `pwd`, 2) leer progreso, 3) leer características, 4) revisar últimos commits, 5) ejecutar `init.sh`, 6) validar test baseline, y 7) escoger la tarea prioritaria y no salir de ese alcance.

### El Paquete Avanzado (Gobernanza Agent-First)
> **Fuente de Referencia:** [OpenAI Advanced Index](file:///workspaces/harness-sdd/estudio%20de%20arneses%20y%20agentes/learn-harness-engineering/resources/openai-advanced/index.md)

Cuando el repositorio crece masivamente, el "paquete mínimo" evoluciona a un sistema complejo donde las reglas se descentralizan para no saturar la memoria del modelo.

#### 1. La Estructura de `repo-template/`
* **`AGENTS.md`**: Es un enrutador. En lugar de contener cientos de reglas, le dice al agente: "Revisa la arquitectura, lee la puntuación de calidad, abre tu plan activo, lee la especificación y ejecuta los tests antes de hacer nada". Exige evidencia ejecutable.
* **`ARCHITECTURE.md`**: Define la forma del sistema, dominios, e impone un modelo de capas estricto (`Types -> Config -> Repo -> Service -> Runtime -> UI`) con reglas claras de dependencia.

##### Documentos de Política (`docs/`)
* **`DESIGN.md`**: Enrutador para decisiones de diseño. Evita que el contexto histórico sature el prompt principal.
* **`FRONTEND.md`**: Reglas inquebrantables de UI. Exige claridad, flujos reiniciables, uso de componentes reutilizables y verificaciones de accesibilidad integradas.
* **`PLANS.md`**: Define el ciclo de vida de los "Planes de Ejecución". Obliga a usar un plan cuando el trabajo dura más de una sesión. Mantiene el orden en `exec-plans/active/` y `completed/`.
* **`PRODUCT_SENSE.md`**: Transmite el "criterio de producto". Define el usuario, frustraciones a resolver y lista anti-patrones (como fallos silenciosos o acciones destructivas ocultas).
* **`QUALITY_SCORE.md`**: Una matriz de evaluación continua del proyecto. Califica cada dominio y capa arquitectónica. Registra la "Ablación" (cuándo se quitó una regla del arnés).
* **`RELIABILITY.md`**: Define los "recorridos dorados" y exige señales en tiempo de ejecución. Establece la regla de oro: ninguna tarea está lista si el sistema no se puede reiniciar limpiamente después.
* **`SECURITY.md`**: Políticas duras de seguridad. Prohíbe secretos en código, valida entradas y documenta comandos destructivos prohibidos.

#### 2. Procedimientos Operativos Estándar (`sops/`)
A mayor escala, las instrucciones genéricas fallan. Los SOPs son guías de ejecución paso a paso para tareas complejas:
* **`chrome-devtools-validation-loop.md`**: Bucle estricto para validar UI: Seleccionar ruta -> Limpiar consola -> Capturar ANTES -> Disparar evento -> Capturar DESPUÉS -> Evaluar -> Corregir y repetir.
* **`encode-knowledge-into-repo.md`**: Para evitar el "conocimiento tribal". Si el agente tiene que preguntar cómo funciona algo, ese conocimiento debe codificarse inmediatamente en el documento correspondiente.
* **`layered-domain-architecture.md`**: Para corregir violaciones arquitectónicas. Obliga a mapear dominios, enrutar dependencias a través de adaptadores y añadir un linter/test que evite la violación mecánicamente.
* **`observability-feedback-loop.md`**: Para cuando la depuración es lenta. Obliga al agente a emitir logs, métricas y trazas y a razonar basándose en la ejecución real, no adivinando el código estático.

### Estudio de Skills: Harness Creator
> **Fuente de Referencia:** `skills/harness-creator/`

**El Modelo Core de 5 Subsistemas:**
Todo arnés útil para agentes de código debe tener 5 componentes fundamentales:
1. **Instrucciones (Instructions):** Archivos como `AGENTS.md`. Marcan la ruta de inicio, reglas de trabajo y la definición de "terminado".
2. **Estado (State):** Archivos como `feature_list.json` y `progress.md`. Mantienen el feature actual, el estatus, la evidencia de éxito y el siguiente paso (no dependen del historial del chat).
3. **Verificación (Verification):** Scripts como `init.sh` o comandos explícitos. Pruebas que el agente debe ejecutar obligatoriamente antes de reclamar victoria.
4. **Alcance (Scope):** Criterios de finalización y dependencias. Previenen el sobrealcance y el trabajo a medias.
5. **Ciclo de Vida (Lifecycle):** Archivos como `session-handoff.md`. Rutinas de cierre que garantizan reinicios seguros de contexto.

**Reglas de Diseño Clave:**
- Mantén el archivo raíz (`AGENTS.md`) corto: solo ruteo e invariantes, no un manual completo.
- Los detalles del proyecto van en la documentación del proyecto, no en el arnés.
- Mantén solo un feature activo a la vez (WIP=1) a menos que haya claros límites multi-agente.
- Exige evidencia antes de marcar un feature como terminado.
- Usa archivos de estado (append/update) en lugar de depender del historial del chat.
- Ningún comportamiento destructivo oculto en scripts (los sobrescritos exigen aprobación).

**Patrones Avanzados de Diseño:**
* **Ingeniería de Contexto y Memoria:** El contexto es un presupuesto finito. Usa la "Divulgación Progresiva" (cargar detalles solo a demanda) y evita basureros de historial. La memoria persistente debe usar un **guardado en dos pasos** (archivo de detalle completo + puntero de una línea en un índice principal) para evitar corrupciones. En reglas de instrucción, **lo local siempre manda** (Local > Proyecto > Usuario > Org).
* **Coordinación Multi-Agente:** El agente Coordinador no delega contexto en crudo; debe "sintetizar" la investigación en especificaciones estrictas antes de enviarla a los implementadores (0 herencia de contexto). En delegaciones paralelas (Fork), los agentes heredan el contexto pero **tienen prohibido** lanzar más sub-agentes (límite recursivo estricto de 1 nivel) para no multiplicar el coste exponencialmente.
* **Registro de Herramientas (Tool Registry):** Las herramientas deben ser "Fail-closed" (no concurrentes y modificadoras por defecto). La concurrencia se evalúa por **llamada específica** (ej. `cat file.txt` es seguro, pero `rm -rf` obliga ejecución en serie).
* **Ciclo de Vida (Lifecycle) y Hooks:** La confianza en un workspace es "Todo o Nada" (si el entorno no es de absoluta confianza, **ningún** hook debe ejecutarse). Las tareas largas o asíncronas deben tener IDs tipados, estado rígido y guardar su output en disco, con una "evicción en dos fases" al terminar.

### Estudio de Skills: Skill Creator
> **Fuente de Referencia:** `skills/skill-creator/`

**Anatomía y Divulgación Progresiva:**
Un "Skill" bien diseñado usa 3 niveles de carga para ahorrar contexto:
1. **Nivel 1 (Metadatos):** Nombre y Descripción (siempre en contexto). La descripción es el disparador (trigger) y debe ser específica y ligeramente "insistente" indicando exactamente *cuándo* usarse.
2. **Nivel 2 (Instrucciones):** Archivo `SKILL.md` (< 500 líneas). Carga en contexto solo al invocarse.
3. **Nivel 3 (Recursos Empaquetados):** `scripts/`, `references/` y `assets/`. Se cargan estrictamente bajo demanda.

**El Bucle de Creación Guiado por Evaluaciones (Eval-Driven Loop):**
El proceso requiere rigor empírico: 1) Escribir borrador, 2) Crear 2-3 prompts de prueba realistas (`evals/evals.json`), 3) Lanzar ejecuciones paralelas con la skill vs. sin la skill (baseline), 4) Evaluar cuantitativamente mediante aserciones programáticas y cualitativamente mediante revisión humana (con visor web HTML), 5) Iterar basado en el feedback.

**Optimización del Trigger:**
Si el agente ignora la skill cuando debería usarla, se optimiza la descripción. Esto se logra creando ~20 queries de prueba (casos positivos y negativos engañosos) y ejecutando un algoritmo que ajusta el texto descriptivo hasta maximizar la precisión (True Positives) sin sobreajustar.

### Estudio Práctico: Toolkit de Desarrollo de Plugins
> **Fuentes de Referencia:** `plugin-dev/skills/plugin-structure` y `plugin-dev/skills/plugin-settings`

**Arquitectura de Auto-Descubrimiento:**
Todo plugin debe seguir una estructura estandarizada que el arnés lee automáticamente al iniciar, eliminando configuración manual redundante:
* `.claude-plugin/plugin.json`: Manifiesto (metadatos, versión y override de rutas).
* `commands/`: Comandos slash (`/comando`) definidos en Markdown con YAML frontmatter.
* `agents/`: Roles de subagentes invocables (Markdown).
* `skills/`: Habilidades contextuales (directorios con `SKILL.md`).
* `hooks/hooks.json`: Interceptores del ciclo de vida (`PreToolUse`, `SessionStart`, etc.).
* **Regla de Portabilidad Estricta:** Las rutas dentro del plugin NUNCA deben ser absolutas ni relativas (`./`). Siempre se debe usar la variable de entorno `${CLAUDE_PLUGIN_ROOT}` para garantizar portabilidad.

**Gestión de Estado (Settings):**
La configuración del plugin y el estado por proyecto no se guarda en el código del plugin, sino en un archivo local en el repositorio objetivo: `.claude/plugin-name.local.md`.
* **Formato Híbrido:** Utiliza YAML frontmatter para variables estructurales (ej. `enabled: true`, `mode: strict`) y el cuerpo en Markdown para el contexto o prompts específicos del proyecto.
* **Integridad y Rendimiento (Patrón Quick Exit):** Todo script de los hooks debe comenzar verificando la existencia de este archivo local; si no existe o dice `enabled: false`, el hook ejecuta `exit 0` inmediatamente para no degradar el rendimiento del agente.
* **Ciclo de vida:** Este archivo es administrado por el usuario y DEBE ser excluido en el `.gitignore`. Cualquier cambio manual requiere reiniciar el agente para recargar los hooks en memoria.

**Desarrollo de Agentes (Subprocesos Autónomos):**
* **Triggering basado en Ejemplos:** La `description` en el YAML de un agente es su prompt de enrutamiento. Debe incluir bloques `<example>` explícitos mostrando *Contexto, Usuario, Asistente y Comentario* para enseñarle al orquestador cuándo invocarlo.
* **Privilegio Mínimo:** La propiedad `tools` permite restringir qué herramientas puede usar el subagente (ej. `["Read", "Grep"]` para un analizador de solo lectura, evitando que modifique código por error).
* **System Prompt:** El cuerpo del Markdown es el system prompt real. Debe escribirse en **segunda persona** ("You are...", "Your responsibilities are...").

**Desarrollo de Skills (Conocimiento Procedimental):**
* **Triggering en Tercera Persona:** La `description` de una skill debe estar escrita en **tercera persona** ("This skill should be used when...") e incluir frases de activación exactas que un usuario diría.
* **Estilo Imperativo:** A diferencia de los agentes, las instrucciones del cuerpo de la skill deben escribirse en **modo imperativo u objetivo** ("Parse the file", "Validate input"), NUNCA en segunda persona ("You should parse...").
* **Disclosure Estricto:** `SKILL.md` no debe pasar de las 2,000 palabras. Todo el detalle pesado (patrones, APIs, ejemplos grandes) debe moverse a la carpeta `references/` para ser cargado solo a demanda.

**Desarrollo de Hooks (Interceptores de Eventos):**
* **Prompt-Based vs Command-Based:** Se prefieren los hooks basados en prompts (`"type": "prompt"`) porque usan la capacidad de razonamiento del LLM para decisiones dependientes del contexto, sin necesidad de programar en bash. Los de tipo `command` se reservan para validaciones determinísticas y de alto rendimiento.
* **Ejecución en Paralelo:** Todos los hooks que coincidan con un evento (ej. `PreToolUse` para la herramienta `Write`) se ejecutan en **paralelo**. Por tanto, no pueden depender del estado del otro.
* **Seguridad y Carga:** Si usas hooks en bash, SIEMPRE debes parsear las entradas JSON de `stdin` con `jq` y entrecomillar todas las variables. Es crucial saber que los hooks **se cargan solo al iniciar sesión**; si editas un script de hook, debes reiniciar el agente para ver los cambios (`claude --debug` es indispensable para probarlos).

**Orquestación de Flujos Complejos:**
* **Máquinas de Estado por Fases:** Para comandos inmensos (ej. crear un plugin entero), el trabajo debe dividirse en fases explícitas numeradas (Fase 1, Fase 2...).
* **Puntos de Sincronización:** Cada fase crítica debe terminar con una orden absoluta: *"Wait for answers before proceeding to implementation"*. El orquestador JAMÁS asume cosas; pregunta y se detiene.
* **Carga de Contexto JIT:** El comando orquestador no carga todas las reglas de golpe. Usa la herramienta de cargar skills de forma secuencial, solo para la fase que está ejecutando en ese momento.
* **Delegación a Subagentes:** El orquestador no ejecuta el trabajo pesado de generación de código o validación. Invoca a "Especialistas" (ej. `agent-creator`, `plugin-validator`), manteniéndose él mismo como un administrador de alto nivel con un "contexto limpio".
* **Persistencia Externa:** Se usa la herramienta `TodoWrite` o similar para registrar en disco qué fases se han completado. Así el estado sobrevive a los cambios de contexto.

## Parte 7: La Crítica Estructural (El Límite del Modelo de Control)
> **Fuentes de Referencia:** `unacriticadeloquelefalta.md` y `2310.01798v2.pdf` (DeepMind: "Large Language Models Cannot Self-Correct Reasoning Yet")

El consenso actual de la industria asume que "Agente = Modelo + Arnés", tratando al arnés como simple infraestructura de soporte. Este enfoque es **estructuralmente deficiente** (pensamiento centrado en el motor). Un sistema basado en agentes requiere subsistemas *pares* e independientes para funcionar con seguridad.

**Principios Críticos para la Arquitectura Reestructurada:**
1. **La Autoverificación es un Mito (El problema del Oráculo):** La investigación de DeepMind demuestra que los LLMs **no pueden autocorregir su razonamiento de forma intrínseca**. Un modelo revisando su propio trabajo padece de "ceguera correlacionada". La autoverificación aislada en realidad degrada el rendimiento.
2. **Requisito de Verificación Externa:** El sistema DEBE poseer un "Oráculo Independiente". La verificación debe ser mecánica, determinista y ajena al modelo (ej. ejecución real de código, tests unitarios en un entorno aislado, comprobadores de tipos, compiladores). 
3. **El Teorema de Incompletitud en IA (Vassilev):** Ningún conjunto finito de reglas o "guardrails" (prompts de validación) puede controlar la infinita ambigüedad del espacio de generación de código. El diseño no debe buscar la invulnerabilidad mediante prompts infinitos, sino asumir la falla y mitigarla con oráculos estrictos.
4. **Intención Declarada vs. Inferida:** El agente no debe "adivinar" eternamente qué está bien. Debe existir una especificación estricta redactada por un humano (el contrato) contra la cual el sistema se evalúe mecánicamente.
5. **Disciplina de Sustracción (Anti-Acumulación):** Un arnés que solo suma (código, memoria, agentes) aumenta la superficie de ataque y los errores de estado. El arnés debe incluir mecanismos o agentes dedicados exclusivamente a **borrar** y simplificar; el arte de maximizar el trabajo *no* generado.
6. **Coordinación por Protocolos, no por Archivos:** Múltiples agentes no logran coherencia solo por leer el mismo sistema de archivos. Se requieren especificaciones y contratos de interfaz claros para que sus resultados converjan y no se contradigan.
