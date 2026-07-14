Feature: F01 Andamiaje de Harness Universal (Estructura Inicial y WIP=1)
  Como inicializador del arnés universal (AGENTINIT)
  Quiero crear la estructura base de directorios y verificar el límite de WIP=1
  Para garantizar un espacio de trabajo inicial limpio y ordenado sin multitarea ni alteraciones al código de producción

  Scenario: Inicialización exitosa del arnés universal con precondiciones cumplidas
    Given que el archivo de mapeo "/workspaces/CONECT4-/harness_universal/direcciones/paths.json" existe y es legible en el disco
    And el directorio "/workspaces/CONECT4-/harness_universal/" está disponible para escritura
    When ejecuto el script de inicialización "init.mjs"
    Then se debe crear únicamente el directorio de estado del arnés: "state"
    And se debe inicializar el archivo de estado "/workspaces/CONECT4-/harness_universal/state/progress.md" si no existía previamente
    And se deben crear los archivos dúo de AGENTINIT: "AGENTINIT.md" y "AGENTINIT.json" en la raíz del arnés "/workspaces/CONECT4-/harness_universal/"
    And el archivo "AGENTINIT.json" debe cumplir estrictamente con la estructura de contrato DbC definida
    And el script de validación "check-wip.mjs" debe ejecutarse con éxito
    And ningún archivo en el directorio de código de producción "src/" debe ser modificado

  Scenario: Fallo de inicialización por ausencia o invalidez del archivo de mapeo paths.json
    Given que el archivo de mapeo "/workspaces/CONECT4-/harness_universal/direcciones/paths.json" no existe o contiene un formato JSON inválido
    When ejecuto el script de inicialización "init.mjs"
    Then el proceso de inicialización debe abortar inmediatamente
    And el script debe terminar con un código de salida igual a 1
    And se debe imprimir un mensaje de error descriptivo en la salida estándar o de error
    And no se debe realizar ningún cambio en la estructura de directorios ni archivos del arnés
    And ningún archivo en el directorio de código de producción "src/" debe ser modificado

  Scenario: Validación exitosa de WIP=1 con una única tarea activa
    Given que el archivo de tareas "/workspaces/CONECT4-/meta_harness/tareas/target_feature_list.json" tiene exactamente 1 tarea con estado "in_progress" o "active"
    When ejecuto la validación mediante el script "check-wip.mjs"
    Then el script debe finalizar exitosamente con código de salida 0
    And debe imprimir un mensaje indicando que se cumple la restricción de WIP=1

  Scenario: Fallo de validación de WIP=1 con múltiples tareas activas
    Given que el archivo de tareas "/workspaces/CONECT4-/meta_harness/tareas/target_feature_list.json" tiene más de 1 tarea con estado "in_progress" o "active"
    When ejecuto la validación mediante el script "check-wip.mjs"
    Then el script debe fallar y abortar la ejecución
    And el script debe terminar con un código de salida igual a 1
    And se debe imprimir un mensaje de error explicativo que detaille la violación de WIP=1 y liste las tareas activas

  Scenario: Verificación de invariante del código de producción intacto
    Given que se ejecuta cualquier operación del arnés universal
    When finaliza la inicialización o verificación de WIP
    Then el código fuente de producción bajo "src/" o la ruta definida en paths.json no debe ser alterado ni modificado
