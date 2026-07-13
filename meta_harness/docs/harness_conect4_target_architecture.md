# Arquitectura Objetivo del Arnés de Conecta 4 (harness_conect4)

Este documento describe la arquitectura y el pipeline de agentes objetivo para el desarrollo del **harness_conect4**, basado en el diseño conceptual modelado en `harness_conect4/diagrams/harnes_poo.plantuml`.

El objetivo final de `harness_conect4` es automatizar todo el proceso de desarrollo de características (features) para el juego Connect 4 mediante una cadena estructurada de agentes interactivos con roles segregados (WIP = 1).

## 1. Estructura de Directorios y Alcance

El sistema divide el espacio de trabajo en dos componentes:
*   **`harness-conect4`** (Meta-Entorno): Alberga a los agentes especialistas, scripts operativos, especificaciones y reportes de validación.
*   **`conect4src`** (Entorno de Producción): Contiene el código fuente del juego Connect 4, organizado en `dominio` (lógica), `main` (interfaz/ejecución) y `test` (batería de pruebas).

---

## 2. El Pipeline de Agentes Especialistas

El proceso de desarrollo sigue una secuencia estricta de delegación (denotada como `--> :D`), donde cada agente realiza su tarea y pasa el control al siguiente. El diseño visual completo del flujo, paquetes, agentes y scripts se encuentra modelado en el diagrama PlantUML original:
*   Ver diagrama: [harnes_poo.plantuml](file:///workspaces/CONECT4-/harness_conect4/diagrams/harnes_poo.plantuml)

### Funciones Específicas de los Agentes

*   **instalador (Instalador)**: Configura y adapta el arnés al proyecto objetivo, administrando las rutas centralizadas (`direcciones`) y el stack de tecnologías para lograr un desacoplamiento completo del código fuente (`src`).
*   **AGENTINIT (Inicializador)**: Ejecuta `init.sh` (que corre `check-wip.sh`) para preparar la sesión de trabajo en un estado limpio (WIP=0/1) y lanzar al Orquestador.
1.  **Orchestrator (Orquestador)**
    *   **Responsabilidad**: Coordina la sesión completa, lee el archivo de progreso, gestiona/crea tareas en los JSON correspondientes y delega la ejecución al socio de especificación (`SpecPartner`).
2.  **SpecPartner (Socio de Especificación)**
    *   **Responsabilidad**: Inicia el desarrollo creando una nueva rama Git (`features_<id>`). Escribe el documento de especificación detallada (`specs/`) y delega en el autor Gherkin.
3.  **GherkinAuthor (Autor Gherkin)**
    *   **Responsabilidad**: Traduce la especificación en escenarios de prueba funcionales en formato Gherkin (archivos `.feature` en la carpeta `features/`). Delega al diseñador.
4.  **DesignPartner (Socio de Diseño)**
    *   **Responsabilidad**: Diseña la estructura del código y define la interfaz del dominio en `conect4src/dominio`. Delega al probador.
5.  **TestPartner (Socio de Pruebas)**
    *   **Responsabilidad**: Escribe las pruebas unitarias y de integración en `conect4src/test` basándose en los escenarios `.feature` de Gherkin. Delega al socio de código.
6.  **CodePartner (Socio de Código)**
    *   **Responsabilidad**: Escribe el código de producción real en `conect4src/main` para hacer pasar las pruebas escritas por `TestPartner`. Delega en el juez.
7.  **Judge (Juez)**
    *   **Responsabilidad**: Ejecuta las pruebas en un entorno aislado (`panteon`), almacena reportes de ejecución (`judgereports`) y delega al socio de refactorización.
8.  **RefactorPartner (Socio de Refactorización)**
    *   **Responsabilidad**: Evalúa la deuda técnica y el reporte del juez. Lanza pruebas de mutación (`mutate.sh` a través de `mutationtester`). Si detecta fallos, puede delegar hacia atrás en `DesignPartner`, `TestPartner` o `CodePartner`. Si la calidad es óptima, delega en el verificador de feature.
    *   **RefactoringXP (Refactorización XP)**: Sub-agente o componente especializado invocado por `RefactorPartner` para aplicar técnicas de refactorización extrema (Extreme Programming) sobre el código de dominio y eliminar deuda técnica crítica detectada.
9.  **VerifierFeature (Verificador de Feature)**
    *   **Responsabilidad**: Audita el cumplimiento del comportamiento contra el archivo `.feature`, genera evidencias y firmas de verificación (`verifications/`) y delega al verificador de sesión.
10. **VerifierSession (Verificador de Sesión)**
    *   **Responsabilidad**: Ejecuta el checklist de estado limpio (`cleanstatechecklist` y `cleanupscanner.sh`), genera el reporte final de limpieza, actualiza el relevo de sesión (`sessionhandoff.md`) y realiza el merge a `main`.

### Diseño por Contrato (DbC) para Todos los Agentes (`agentsALL`)
Todos los agentes del sistema tienen unjson con un disenio por contrato que deven cumplir antes durante y despues 
*   **Precondiciones**: Estado y condiciones requeridos antes de que actúe el agente.
*   **Poscondiciones**: Resultados y garantías que el agente debe entregar al finalizar su ejecución.
*   **Invariantes**: Condiciones del sistema y restricciones del arnés que deben mantenerse inalterables durante todo el ciclo.

---

## 3. Estado, Observabilidad y Control de Versiones

*   **GitAGENT**: Es el encargado de interactuar con Git según el turno del agente:
    *   Turno `SpecPartner` -> Crea la rama `features_<id>`.
    *   Agentes intermedios -> Realizan commits con su ID de agente.
    *   Turno `VerifierSession` -> Realiza el merge final a `main`.
*   **ViewHarness**: Interfaz de visualización HTML/JS (`index.html` y `scripts.js`) que renderiza de manera interactiva el progreso de las tareas, los specs, los reportes del juez, los diagramas y el estado de limpieza.
*   **Clean State**: Garantía estricta de que ningún archivo innecesario o temporal permanezca al finalizar la sesión.

## 4. Plan de Construcción Agente por Agente (Secuencial y con ViewHarness Incremental)

La construcción de `harness_conect4` se realizará de manera estrictamente secuencial de arriba hacia abajo (siguiendo el flujo de dependencias de entrada y salida de cada agente). A la par de la implementación de cada agente, se desarrollará e integrará de forma incremental la interfaz **ViewHarness** para reflejar la observabilidad de las nuevas salidas.

Este plan aplica los 4 pilares fundamentales (el diagrama `harnes_poo`, la estructura de `meta_harness`, el manifiesto y `bob-harness`) de manera iterativa:

### Pasos de Construcción Incremental:

#### Paso 0: Capa de Instalación y Desacoplamiento (Agnóstico) - OBLIGATORIO PRIMERO
*   **Agente/Componente**: Agente `instalador` y el paquete `direcciones` (incluyendo `direcciones/paths.json` y el mapeador del stack tecnológico).
*   **Dependencias de Entrada**: Estado inicial del repositorio.
*   **Entregables/Salidas**:
    *   Configuración centralizada de rutas del proyecto objetivo en `direcciones/paths.json`.
    *   Lógica del agente `instalador` para autoconfigurar el entorno de manera desacoplada del código fuente (`src`).
*   **ViewHarness (Incremental)**: Creación del esqueleto base del dashboard (`index.html` y `scripts.js`) configurando la visualización dinámica del árbol de directorios y el stack de tecnologías obtenido de `direcciones/`.

#### Paso 1: AGENTINIT y Capa de Estado Base (Bootstrap)
*   **Agente/Componente**: `AGENTINIT` (incluyendo `init.sh` y `check-wip.sh`).
*   **Dependencias de Entrada**: Capa de Instalación y Desacoplamiento (Paso 0) establecida.
*   **Entregables/Salidas**:
    *   Estructura base de directorios del arnés inicializada.
    *   Archivos de estado iniciales: `state/progress.md`
*   **ViewHarness (Incremental)**: Ampliación del dashboard para renderizar e interactuar con el estado de la sesión activa cargado desde el registro de `direcciones`.

#### Paso 2: Orchestrator y Capa de Tareas
*   **Agente/Componente**: `Orchestrator` (Orquestador).
*   **Dependencias de Entrada**: Capa de Estado Base (`state/`).
*   **Entregables/Salidas**:
    *   Backlog y control de tareas (`tareas/conect4_feature_list.json`).
    *   Lógica del bucle principal del Orquestador para delegar el control.
*   **ViewHarness (Incremental)**: Ampliación del dashboard para renderizar e interactuar con el listado de tareas en tiempo real.

#### Paso 3: SpecPartner y Capa de Especificación
*   **Agente/Componente**: `SpecPartner` (incluyendo su interacción con `gitAGENT` para crear ramas `features_<id>`).
*   **Dependencias de Entrada**: Tarea activa seleccionada por el Orquestador.
*   **Entregables/Salidas**: Documento de especificación técnica (`specs/conect4-project-spec.md`).
*   **ViewHarness (Incremental)**: Integración en la interfaz de la visualización del spec de la tarea activa.

#### Paso 4: GherkinAuthor y Capa de Comportamiento
*   **Agente/Componente**: `GherkinAuthor`.
*   **Dependencias de Entrada**: Especificación técnica redactada.
*   **Entregables/Salidas**: Escenarios de comportamiento Gherkin en la carpeta `feactures/` (ej. archivos `.feature`).
*   **ViewHarness (Incremental)**: Visualización estructurada de los escenarios Gherkin del feature activo.

#### Paso 5: DesignPartner y Capa de Diseño de Dominio
*   **Agente/Componente**: `DesignPartner`.
*   **Dependencias de Entrada**: Escenarios Gherkin.
*   **Entregables/Salidas**: Estructuración del dominio en `conect4src/dominio`.
*   **ViewHarness (Incremental)**: Visualización del estado del diseño del dominio.

#### Paso 6: TestPartner y Capa de Pruebas
*   **Agente/Componente**: `TestPartner`.
*   **Dependencias de Entrada**: Escenarios Gherkin e interfaces de dominio.
*   **Entregables/Salidas**: Tests unitarios y de integración en `conect4src/test`.
*   **ViewHarness (Incremental)**: Visualización y estadísticas de cobertura/estado de las pruebas.

#### Paso 7: CodePartner y Capa de Producción
*   **Agente/Componente**: `CodePartner`.
*   **Dependencias de Entrada**: Pruebas redactadas.
*   **Entregables/Salidas**: Implementación de la lógica del juego en `conect4src/main`.
*   **ViewHarness (Incremental)**: Visualización de los archivos de código modificados y estado del build.

#### Paso 8: Judge y Capa de Ejecución Aislada
*   **Agente/Componente**: `Judge` (Juez) y entorno `panteon`.
*   **Dependencias de Entrada**: Tests y código de producción.
*   **Entregables/Salidas**: Reporte formal de ejecución en `judgereports/`.
*   **ViewHarness (Incremental)**: Integración del reporte detallado del Juez en la interfaz.

#### Paso 9: RefactorPartner y Mutación
*   **Agente/Componente**: `RefactorPartner`, `RefactoringXP` y `MutationTester` (usando `scripts/mutate.sh`).
*   **Dependencias de Entrada**: Reportes del Juez y código de producción.
*   **Entregables/Salidas**: Código refactorizado libre de deuda técnica, reportes de pruebas de mutación y posibles bucles de feedback de refactorización.
*   **ViewHarness (Incremental)**: Visualización del puntaje de mutación y sugerencias de refactorización.

#### Paso 10: VerifierFeature y Verificaciones
*   **Agente/Componente**: `VerifierFeature`.
*   **Dependencias de Entrada**: Comportamiento functional en ejecución y código final.
*   **Entregables/Salidas**: Reportes firmados en `verifications/`.
*   **ViewHarness (Incremental)**: Renderizado de la firma y evidencia de verificación de la característica.

#### Paso 11: VerifierSession y Relevo Final (Cierre)
*   **Agente/Componente**: `VerifierSession` (interacción con `gitAGENT` para merge a `main`).
*   **Dependencias de Entrada**: Evidencia del feature y checklist final de estado limpio.
*   **Entregables/Salidas**: Relevo de sesión final (`session_handoff.md` actualizado) y merge a la rama principal.
*   **ViewHarness (Incremental)**: Reporte final de sesión limpia consolidada antes del cierre.

## 5. Diseño y Arquitectura Agnóstica al Proyecto (Modularidad y Reusabilidad)

Con el fin de garantizar que el arnés no esté acoplado de forma rígida a la lógica específica de Conecta 4, se adopta el principio de **Arquitectura Agnóstica al Proyecto**. Esto permitirá reutilizar la lógica de orquestación, el pipeline de agentes y las verificaciones en futuros desarrollos.

Para lograr este desacoplamiento:
1. **Abstracción del Dominio**: Las interfaces de comunicación entre los agentes y el código del juego deben ser genéricas (ej. utilizando abstracciones de entrada/salida para compilar, probar y validar sin importar el lenguaje de programación o el juego en cuestión).
2. **Estudio de Patrones de Referencia**: Se analizarán detalladamente los recursos y casos de estudio ubicados en la carpeta [dominio/EJEMPLOS HARNES/](file:///workspaces/CONECT4-/dominio/EJEMPLOS%20HARNES/) (especialmente en subcarpetas de agentes, plugins y estudios de arneses) para extraer implementaciones previas y aplicar esos aprendizajes al diseño del arnés agnóstico.
3. **Centralización de Rutas (Desacoplamiento del src)**: Ningún agente especialista interactúa directamente con rutas fijas de `src/` o `conect4/`. Todas las rutas son consultadas de manera dinámica en el archivo centralizado `direcciones/paths.json` generado por el agente `instalador`, garantizando portabilidad absoluta del arnés a cualquier otro proyecto.

