# Especificación de Harness Universal (target-project-spec.md)

> Este documento es mantenido por el agente `spec_partner`.
> Aquí se registra el debate, el propósito, contrato y casos límite para las features orientadas a diseñar o mejorar el `harness_universal` desde el meta-entorno.

## Feature: F00_instalacion_desacoplamiento - Capa de Instalación y Desacoplamiento (Agnóstico)
- **Propósito:** Implementar el agente instalador y configurar el mapeo del stack tecnológico en `direcciones/paths.json` para lograr el desacoplamiento total del código fuente del proyecto objetivo (`conect4` o futuros proyectos). Esto permite que todos los agentes del pipeline del `harness_universal` operen de manera agnótica al stack tecnológico, delegando la ejecución de comandos y la búsqueda de rutas al mapeador centralizado.
- **Comportamiento:**
  1. **Detección Híbrida:** El agente instalador escanea firmas físicas (`package.json`, `pom.xml`, `vite.config.js`, etc.) del proyecto objetivo. Propone la configuración detectada al humano en consola para validación y confirmación. Si no encuentra firmas conocidas, el instalador entra en un modo declarativo interactivo asistido para que el usuario configure los parámetros manualmente.
  2. **Comandos Dinámicos en paths.json:** Crea el directorio `/workspaces/CONECT4-/harness_universal/direcciones/` y escribe el archivo `paths.json` con rutas absolutas normalizadas, stacks detectados y los comandos dinámicos asociados (`build`, `test`, `lint`, `clean`). Los agentes especialistas del arnés universal consultan este JSON en lugar de asumir rutas del proyecto o comandos del compilador/test.
  3. **Gobernanza de Progreso (turn en progress):** El flujo se coordinará a través de la variable `turn` (turno) dentro del archivo/objeto de estado `progress`, tal y como se diseñó en `harnes_poo.plantuml`. Cada agente especialista lee de `progress` si es su turno, actúa directamente sobre `src/dominio`, `src/main` o `src/test`, y delega al siguiente modificando el turno. El `gitAGENT` reaccionará de manera reactiva según este `turn` (crear rama en turno `specpartner`, hacer commits intermedios por agente, y hacer merge final en turno `verifiersession`), eliminando la necesidad de directorios temporales de workspace.
  4. **Divulgación Progresiva:** La documentación extensa, manuales de testing y guías de QA del arnés universal se guardarán en la carpeta `docs/` de `harness_universal/` (en lugar de una carpeta `rules/`). Las habilidades (`SKILL.md`) se mantendrán compactas (< 500 líneas) y leerán la documentación en `docs/` solo bajo demanda.
- **Casos límite:**
  - **Sin firmas conocidas (Stack no soportado):** El instalador pasa automáticamente a modo interactivo asistido solicitando la configuración de manera amigable.
  - **Ruta del proyecto objetivo inválida:** Valida la existencia y accesibilidad antes del escaneo. Si es inaccesible, aborta con salida distinta de cero (`1`) y un mensaje descriptivo.
  - **Normalización de rutas relativas:** El instalador forzará la resolución a rutas absolutas normalizadas antes de escribir en `paths.json` para evitar discrepancias debido al directorio de trabajo de los subagentes.
  - **Errores de permisos al escribir en `direcciones`:** El instalador verifica la disponibilidad de escritura en `/workspaces/CONECT4-/harness_universal` y emite un mensaje de diagnóstico específico si los permisos son suficientes.
- **Decisiones:**
  - **Detección Híbrida y Confirmación Humana:** Permite flexibilidad de configuración pero mantiene la conveniencia de la automatización reduciendo errores.
  - **Comandos Dinámicos en paths.json:** Asegura que los agentes operativos como `Judge` y `RefactorPartner` sean 100% agnósticos y reutilizables en cualquier stack tecnológico.
  - **Gobernanza mediante Turnos y Git Reactivo:** Consolida el control de la sesión en un único lugar (`progress`), manteniendo un histórico limpio en Git sin la sobrecarga de un directorio de workspace temporal.
  - **Divulgación Progresiva en `docs/` del arnés:** Evita la fatiga de contexto de los LLMs al separar los prompts de habilidades de las guías y manuales técnicos.

## Feature: F01_andamiaje_harness_universal - Andamiaje de Harness Universal (Estructura Inicial y WIP=1)
- **Propósito:** Configurar la estructura base de directorios y validar scripts iniciales de inicialización para `harness_universal`. Esto incluye la especificación del agente `AGENTINIT` encargado de asegurar que la estructura del directorio del arnés y los archivos de estado estén en su lugar antes de proceder con el desarrollo del pipeline.
- **Comportamiento y Decisiones de Diseño:**
  1. **Motor del Script de Inicialización (`init.mjs`):** Un script de Node.js/ESM que leerá el archivo `/workspaces/CONECT4-/harness_universal/direcciones/paths.json` y creará únicamente el directorio requerido para el estado del `harness_universal` (específicamente la carpeta `state/` para alojar `progress.md`). Los demás directorios operativos (`panteon`, `judgereports`, `specs`, `tareas`, etc.) se crearán bajo demanda por cada agente correspondiente en su respectivo turno.
  2. **Validador WIP=1 (`check-wip.mjs`):** Un script de Node.js/ESM que analizará el archivo `/workspaces/CONECT4-/meta_harness/tareas/target_feature_list.json`. El script contará cuántas tareas tienen el estado `in_progress` o `active`. Si la suma es estrictamente mayor que 1, el script fallará (saldrá con código de retorno `1`) e imprimirá un mensaje explicativo, impidiendo que avance el desarrollo si hay multitarea.
  3. **Arquitectura Dúo para Agentes (AGENTINIT):** Cada agente en el arnés objetivo se compone de un dúo físico de archivos lado a lado en el mismo directorio:
     - Un archivo markdown (`.md`) que define las instrucciones y rol del agente.
     - Un archivo JSON (`.json`) que contiene el contrato JSON-POO-DbC (con `precondicion`, `poscondicion`, e `invariant`) y el booleano `manualMode` para el modo de operación.
     Para el agente `AGENTINIT`, ubicado en la raíz del arnés (`harness_universal/`), sus archivos son:
     - `/workspaces/CONECT4-/harness_universal/AGENTINIT.md`
     - `/workspaces/CONECT4-/harness_universal/AGENTINIT.json`
     La inicialización debe asegurar la creación de este dúo.
  4. **Escáner de Limpieza fuera de alcance:** El desarrollo de un escáner de limpieza (`cleanup-scanner` o similar) queda explícitamente **FUERA DE ALCANCE** para esta feature. Pertenece al alcance de la sesión del verificador (`VerifierSession`) y se implementará cuando lleguemos a ese agente.
- **DbC (Diseño por Contrato):**
  - **Precondiciones:**
    * El archivo de mapeo `/workspaces/CONECT4-/harness_universal/direcciones/paths.json` debe existir y ser legible en el disco.
  - **Postcondiciones:**
    * Se ha creado y está disponible el directorio de estado del arnés universal (`state/`). Los directorios de los demás agentes se delegarán a su respectivo inicio de ejecución.
    * Se ha inicializado el archivo `/workspaces/CONECT4-/harness_universal/state/progress.md` si no existía previamente.
    * El script de validación `check-wip.mjs` se ejecuta exitosamente, validando que se cumple la restricción WIP=1 (únicamente la tarea `F01_andamiaje_harness_universal` en progreso en este momento).
    * Se ha creado el dúo físico del agente `AGENTINIT` (`AGENTINIT.md` y `AGENTINIT.json`) en la raíz del arnés `harness_universal/`.
  - **Invariantes:**
    * Ningún código fuente de producción del proyecto objetivo (bajo `src` o según defina `paths.json`) puede ser alterado o modificado durante la inicialización.
- **Estructura del Contrato DbC (AGENTINIT.json):**
  El archivo `/workspaces/CONECT4-/harness_universal/AGENTINIT.json` debe cumplir exactamente con la siguiente estructura:
  ```json
  {
    "name": "AGENTINIT",
    "role": "Inicializador del Arnés Universal",
    "description": "Agente encargado de inicializar y preparar físicamente el espacio de la sesión de trabajo. Crea los directorios operativos base y los archivos de estado iniciales.",
    "manualMode": false,
    "precondicion": {
      "paths_exists": "El archivo de mapeo /workspaces/CONECT4-/harness_universal/direcciones/paths.json debe existir y ser legible en el disco."
    },
    "poscondicion": {
      "directories_created": "Se ha creado y está disponible el directorio state/ en harness_universal/.",
      "progress_initialized": "Se ha inicializado el archivo /workspaces/CONECT4-/harness_universal/state/progress.md si no existía previamente.",
      "check_wip_success": "El script de validación check-wip.mjs se ejecuta exitosamente, validando que se cumple la restricción WIP=1 (únicamente la tarea F01_andamiaje_harness_universal en progreso en este momento).",
      "duo_files_exist": "Los archivos duo /workspaces/CONECT4-/harness_universal/AGENTINIT.md y /workspaces/CONECT4-/harness_universal/AGENTINIT.json se han creado en la raíz de harness_universal/."
    },
    "invariant": {
      "production_code_untouched": "Ningún código fuente de producción del proyecto objetivo (bajo src o según defina paths.json) puede ser alterado o modificado durante la inicialización."
    }
  }
  ```
- **Fuera de Alcance (Out of Scope):**
  - El escáner de limpieza (cleanup-scanner) queda excluido de esta feature.
  - No se realiza automatización del versionado de git en este paso.
  - La creación de directorios operativos no relacionados directamente con AGENTINIT (`panteon`, `judgereports`, `specs`, `tareas`, etc.) queda excluida de esta característica.
- **Casos Límite:**
  - Si `paths.json` no existe o no tiene formato JSON válido, `init.mjs` debe fallar con un error explícito.
  - Si más de una tarea en `target_feature_list.json` está marcada como `in_progress`, el script `check-wip.mjs` debe fallar impidiendo cualquier ejecución subsecuente.

## Feature: F02_vista_harness_universal - Desarrollo Incremental de la Vista (ViewHarness)
- **Propósito:** Implementar la interfaz visual (dashboard) interactiva y responsiva para el `harness_universal` en `/workspaces/CONECT4-/harness_universal/viewharness/` que visualice el estado de progreso actual y los diagramas de arquitectura del arnés.
- **Comportamiento:**
  1. **Interfaz Premium (Estética y Responsiva):** Diseño con paleta oscura, tipografía premium, tarjetas animadas y un menú de pestañas para alternar entre la vista de **Progreso** y la de **Diagramas**.
  2. **Panel de Progreso:** Muestra la fase activa, el turno actual y el estado WIP de forma gráfica. Carga y parsea dinámicamente `/workspaces/CONECT4-/harness_universal/state/progress.md`.
  3. **Panel de Diagramas:** Muestra de manera interactiva el diagrama de arquitectura cargando el archivo SVG estático `/workspaces/CONECT4-/harness_universal/diagrams/harnes_poo.svg`.
  4. **Modo Autónomo:** El dashboard se ejecuta abriendo directamente `index.html` en el navegador (usando fetch con rutas relativas a la carpeta `viewharness`).
- **Diseño por Contrato (DbC):**
  - **Precondiciones:**
    * El archivo `/workspaces/CONECT4-/harness_universal/state/progress.md` debe existir.
    * El archivo `/workspaces/CONECT4-/harness_universal/diagrams/harnes_poo.plantuml` debe existir.
  - **Poscondiciones:**
    * Creados los archivos `/workspaces/CONECT4-/harness_universal/viewharness/index.html`, `style.css` y `app.js` en `viewharness/`.
    * Generado el archivo SVG estático `/workspaces/CONECT4-/harness_universal/diagrams/harnes_poo.svg` a partir del archivo PlantUML.
    * La vista renderiza de forma interactiva tanto el progreso actual como el diagrama de arquitectura del arnés.
  - **Invariantes:**
    * No se modifica ningún archivo del proyecto objetivo `conect4`.
- **Fuera de Alcance:**
  - Visualización del stack en `paths.json` (se pospone para una fase posterior).
  - Escaneo de la estructura de archivos del proyecto (se pospone para una fase posterior).
  - Reportes del Juez o especificaciones de tareas que aún no han sido completadas o creadas.
