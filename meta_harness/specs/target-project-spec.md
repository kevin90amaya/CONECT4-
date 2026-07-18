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

## Feature: F03_orquestador_y_tareas - Agente Orchestrator y Capa de Tareas
- **Propósito:** Implementar el Agente Orchestrator y la Capa de Tareas de `harness_universal`. Esto incluye el archivo backlog `harness_universal/tareas/target_feature_list.json` para registrar y dar seguimiento a las tareas de desarrollo del proyecto objetivo (`conect4`), la lógica de control del Orquestador (`harness_universal/agents/orchestator/orchestator.mjs`) para coordinar el relevo de agentes basado en `progress.md`, y la actualización incremental de `ViewHarness` para visualizar las tareas del backlog y su estado en tiempo real.
- **Comportamiento y Decisiones de Diseño:**
  1. **Capa de Tareas:** Crear el directorio `/workspaces/CONECT4-/harness_universal/tareas/` si no existe e inicializar `/workspaces/CONECT4-/harness_universal/tareas/target_feature_list.json` con un array estructurado vacío. Si el archivo ya existe, no se debe sobrescribir para conservar el progreso histórico de las tareas.
  2. **Archivos Dúo y Ubicación de Agentes:** Los agentes se colocan en su respectiva subcarpeta bajo `harness_universal/agents/`. Para el Orquestador, su dúo físico consta de:
     - `/workspaces/CONECT4-/harness_universal/agents/orchestator/orchestator.md` (definición de rol e instrucciones del agente, donde se establece explícitamente que el agente debe respetar las reglas y contrato definidos en su archivo JSON).
     - `/workspaces/CONECT4-/harness_universal/agents/orchestator/orchestator.json` (diseño por contrato DbC, automaticMode y menuOptions).
     La lógica ejecutable del agente se coloca en:
     - `/workspaces/CONECT4-/harness_universal/agents/orchestator/orchestator.mjs` (script de ejecución).
  3. **Lógica de Ejecución del Orquestador (`orchestator.mjs`):**
     - Lee `/workspaces/CONECT4-/harness_universal/state/progress.md` para verificar el estado de la tarea activa y el `Turno actual`.
     - Lee su archivo de contrato `orchestator.json` para verificar si `automaticMode` está activo (`true` o `false`).
     - Si el turno en `progress.md` es `orchestator` u `Orchestrator`, y `automaticMode` es `false` (modo interactivo), presenta en la consola un menú interactivo con las opciones obtenidas de `menuOptions`:
       * Opción 1: Crear una nueva tarea.
       * Opción 2: Delegar un agente dependiendo de `/state/progress.md`.
       * Opción 3: Otras consultas.
     - Si no es el turno del orquestador, el script informará en consola y finalizará sin alterar el estado.
  4. **Integración con ViewHarness:**
     - La integración con la vista sigue el patrón de diseño MVC en `viewharness/`:
       * Se agrega una clase de modelo de tareas (Model) encargada de cargar y gestionar los datos del backlog `/workspaces/CONECT4-/harness_universal/tareas/target_feature_list.json`.
       * Se implementan los métodos correspondientes en el controlador (Controller) y en la vista (View) de `ViewHarness` para renderizar dinámicamente las tareas y su estado.
- **Diseño por Contrato (DbC):**
  - **Precondiciones:**
    * El directorio `/workspaces/CONECT4-/harness_universal/state/` y el archivo `progress.md` deben existir.
  - **Poscondiciones:**
    * Creado e inicializado el archivo `/workspaces/CONECT4-/harness_universal/tareas/target_feature_list.json` (sin sobreescribir contenido existente).
    * Creado el dúo del agente Orchestrator en la ruta `harness_universal/agents/orchestator/`: `orchestator.md`, `orchestator.json` y `orchestator.mjs`.
    * Al ejecutar `node agents/orchestator/orchestator.mjs`, si el turno es `orchestator` y el usuario aprueba la delegación en la consola interactiva, se actualiza el archivo `progress.md` transicionando al siguiente turno.
    * El backend y frontend de ViewHarness se estructuran bajo MVC utilizando la clase Model de tareas y las extensiones correspondientes en Controller y View.
  - **Invariantes:**
    * No se modifica ningún archivo del código fuente de producción del proyecto objetivo `conect4`.
- **Estructura del Contrato DbC (orchestator.json):**
  El archivo `/workspaces/CONECT4-/harness_universal/agents/orchestator/orchestator.json` debe cumplir exactamente con la siguiente estructura:
  ```json
  {
    "name": "ORCHESTRATOR",
    "role": "Orquestador del Arnés Universal",
    "description": "Agente encargado de coordinar la sesión de desarrollo, leer el progreso, gestionar el backlog de tareas e interactuar con el usuario para la delegación de turnos o creación de tareas.",
    "automaticMode": false,
    "menuOptions": [
      {
        "id": "1",
        "option": "Crear una nueva tarea"
      },
      {
        "id": "2",
        "option": "Delegar un agente dependiendo de /state/progress"
      },
      {
        "id": "3",
        "option": "Otras consultas"
      }
    ],
    "precondicion": {
      "progress_exists": "El archivo de progreso /workspaces/CONECT4-/harness_universal/state/progress.md debe existir."
    },
    "poscondicion": {
      "target_feature_list_initialized": "El archivo de tareas /workspaces/CONECT4-/harness_universal/tareas/target_feature_list.json ha sido creado y es un JSON válido.",
      "duo_files_exist": "Los archivos duo de ejecución y contrato para el orquestador existen bajo agents/orchestator/.",
      "runner_exists": "Existe el script agents/orchestator/orchestator.mjs.",
      "interactive_delegation_successful": "Al ejecutarse, si el turno es orchestator y el usuario decide delegar, transiciona el turno en progress.md al siguiente agente."
    },
    "invariant": {
      "production_code_untouched": "Ningún archivo de código de producción de conect4 ha sido modificado."
    }
  }
  ```
- **Fuera de Alcance (Out of Scope):**
  - No se implementa la lógica real de SpecPartner ni de creación de ramas git.
  - No se implementan las pruebas unitarias ni de integración del juego `conect4`.
- **Casos Límite:**
  - Si no hay tareas activas en `target_feature_list.json`, el script del orquestador debe informar al usuario y restringir la transición de turno hasta que se defina una.
  - Si el archivo `progress.md` tiene un formato inválido, el script debe informar del error en consola y abortar.

## Feature: F04_contrato_progress_y_git_agent - Contrato de Progreso y Dúo de gitAGENT
- **Propósito:** Diseñar e implementar el contrato estático JSON para gobernar el progreso de la sesión, y crear el dúo de agente (Markdown y JSON) para `gitAGENT` en `harness_universal`.
- **Comportamiento y Decisiones de Diseño:**
  1. **Contrato de Progreso (`progress.json`):**
     - Ubicación: `/workspaces/CONECT4-/harness_universal/state/progress.json`
     - Propósito: Actuar como especificación estática para el archivo dinámico `/workspaces/CONECT4-/harness_universal/state/progress.md`.
     - Estructura:
       * `mdStructure`: Define la estructura requerida del archivo `progress.md` (título: "Registro de Progreso - Relevo entre Agentes", secciones: "Estado de la Tarea Activa", "Relevo Activo" y campos: "Tarea Activa", "Fase Activa", "Último Turno", "Siguiente Turno", "Decisiones tomadas", "Recursos estudiados", "Recursos a estudiar").
       * Diseño por Contrato (DbC): Define `precondicion`, `poscondicion` e `invariant`. Las transiciones siguen estrictamente la secuencia `Orchestrator -> SpecPartner -> GherkinAuthor -> DesignPartner -> TestPartner -> CodePartner -> Judge -> RefactorPartner -> VerifierFeature -> VerifierSession -> Orchestrator`.
  2. **Dúo de Agente `git_agent`:**
     - Directorio: `/workspaces/CONECT4-/harness_universal/agents/git_agent/`
     - Archivo `git_agent.json` (Contrato DbC):
       * `name`: `"gitAGENT"`
       * `role`: `"Gestor de Versiones de los Agentes"`
       * `description`: `"Agente encargado de gestionar el repositorio Git según el agente activo en el progreso."`
       * `automaticMode`: `false` (requiere confirmación humana).
       * `menuOptions`: Contiene un arreglo con opciones para modo manual (Crear rama de feature, Realizar commit intermedio por agente, Realizar merge a main, Verificar estado).
       * `mdStructure`: Define la estructura de `git_agent.md` (título: "Agente gitAGENT - Instrucciones y Rol", secciones: "Rol", "Instrucciones de Control de Versiones", "Comandos Git Permitidos").
       * DbC: Precondiciones, poscondiciones, invariantes (prohibido hacer commit directo a main durante el ciclo de desarrollo).
     - Archivo `git_agent.md` (Instrucciones y Rol):
       * Instrucciones explícitas de cómo y cuándo ejecutar comandos Git.
- **Casos límite:**
  - Archivo `progress.md` modificado externamente con turnos no reconocidos en `progress.json`.
  - Conflictos en comandos Git o estado de trabajo sucio (dirty working tree).
  - Intento de transición de turno sin cumplir las poscondiciones del agente saliente.
- **DbC (Diseño por Contrato):**
  - **Precondiciones:**
    * El directorio `harness_universal/state/` existe.
  - **Poscondiciones:**
    * Creado el archivo `/workspaces/CONECT4-/harness_universal/state/progress.json` válido.
    * Creada la carpeta `/workspaces/CONECT4-/harness_universal/agents/git_agent/`.
    * Creados los archivos `/workspaces/CONECT4-/harness_universal/agents/git_agent/git_agent.md` y `/workspaces/CONECT4-/harness_universal/agents/git_agent/git_agent.json`.
  - **Invariantes:**
    * No se modifica ningún archivo del código fuente de producción del proyecto objetivo `conect4`.
