Feature: F03 Agente Orchestrator y Capa de Tareas
  Como orquestador del arnés universal
  Quiero gestionar el backlog de tareas y coordinar el relevo de agentes basado en el progreso
  Para mantener un desarrollo ordenado, delegar turnos de forma interactiva y visualizar las tareas en tiempo real

  Scenario: Inicialización de la capa de tareas sin sobreescribir el archivo si ya existe
    Given que el directorio "/workspaces/CONECT4-/harness_universal/tareas/" existe o es creado por el sistema
    And el archivo "target_feature_list.json" no existe previamente
    When se inicializa la capa de tareas
    Then el archivo "target_feature_list.json" debe ser creado conteniendo un arreglo vacío
    And si el archivo "target_feature_list.json" ya existía previamente con tareas registradas
    And se ejecuta la inicialización de la capa de tareas
    And el archivo "target_feature_list.json" no debe ser sobreescrito para conservar el progreso histórico

  Scenario: Creación física del dúo y el script del agente Orchestrator
    Given el directorio de agentes "/workspaces/CONECT4-/harness_universal/agents/orchestator/"
    When se verifica la presencia del agente Orchestrator
    Then deben existir los archivos "orchestator.md", "orchestator.json" y "orchestator.mjs" en dicho directorio
    And el archivo "orchestator.md" debe definir el rol e instrucciones detallando que el agente respeta las reglas y contrato definidos en el JSON
    And el archivo "orchestator.json" debe cumplir exactamente con la estructura de contrato DbC definida, incluyendo "automaticMode" como falso y las opciones del menú

  Scenario: Ejecución del Orquestador en su turno y modo interactivo
    Given que el archivo de progreso "/workspaces/CONECT4-/harness_universal/state/progress.md" indica que el turno actual es "orchestator" u "Orchestrator"
    And el archivo "orchestator.json" tiene el value de "automaticMode" establecido en "false"
    When ejecuto el script del orquestador "node agents/orchestator/orchestator.mjs"
    Then el script debe mostrar en la consola un menú interactivo con las opciones de "menuOptions"
    And las opciones presentadas deben incluir "Crear una nueva tarea", "Delegar un agente dependiendo de /state/progress" y "Otras consultas"
    And al seleccionar la delegación y confirmar la acción en la consola interactiva, el script debe actualizar el archivo "progress.md" transicionando al siguiente agente

  Scenario: Ejecución del Orquestador cuando no es su turno
    Given que el archivo de progreso "/workspaces/CONECT4-/harness_universal/state/progress.md" indica un turno diferente a "orchestator" o "Orchestrator"
    When ejecuto el script del orquestador "node agents/orchestator/orchestator.mjs"
    Then el script debe informar en la consola que no es el turno del orquestador
    And debe finalizar la ejecución sin alterar el estado de "progress.md" ni del backlog

  Scenario: Integración MVC de tareas en ViewHarness
    Given la estructura del frontend y backend en "viewharness/"
    When se visualiza el dashboard
    Then debe existir una clase de modelo de tareas que cargue y gestione los datos de "target_feature_list.json"
    And se deben renderizar dinámicamente en tiempo real las tareas del backlog y sus estados mediante las extensiones del controlador y la vista en "ViewHarness"

  Scenario: Caso límite - Intento de delegación sin tareas activas en el backlog
    Given que el archivo "target_feature_list.json" no contiene ninguna tarea activa con estado "in_progress" o "active"
    And el turno actual en "progress.md" es "orchestator"
    When ejecuto el script del orquestador e intento delegar el turno al siguiente agente
    Then el script del orquestador debe informar del error al usuario
    And debe restringir y abortar la transición del turno en "progress.md" hasta que se defina al menos una tarea activa

  Scenario: Caso límite - Lectura de progress.md con formato inválido
    Given que el archivo de progreso "/workspaces/CONECT4-/harness_universal/state/progress.md" tiene un formato inválido o está corrupto
    When ejecuto el script del orquestador "node agents/orchestator/orchestator.mjs"
    Then el script debe emitir un mensaje de error explícito en la consola indicando la anomalía de formato
    And debe abortar la ejecución inmediatamente

  Scenario: Cumplimiento de Precondiciones del DbC
    Given la inicialización del agente Orchestrator y la capa de tareas
    When se validan las precondiciones del contrato
    Then el directorio "/workspaces/CONECT4-/harness_universal/state/" debe existir
    And el archivo "/workspaces/CONECT4-/harness_universal/state/progress.md" debe existir en disco

  Scenario: Cumplimiento de Poscondiciones del DbC
    Given la finalización de la inicialización y ejecución del Orchestrator
    When se validan las poscondiciones del contrato
    Then el archivo "/workspaces/CONECT4-/harness_universal/tareas/target_feature_list.json" debe estar creado y ser un JSON válido
    And los archivos dúo de ejecución y contrato para el orquestador deben existir bajo "agents/orchestator/"
    And el script ejecutable "agents/orchestator/orchestator.mjs" debe existir
    And la transición del turno en "progress.md" debe actualizarse correctamente al delegar interactivamente

  Scenario: Cumplimiento de Invariantes del DbC
    Given cualquier operación del agente Orchestrator o la capa de tareas
    When finaliza la ejecución o interacción con el usuario
    Then ningún archivo del código fuente de producción del proyecto objetivo "conect4" bajo "src/" o definido en paths.json debe ser modificado, alterado o eliminado
