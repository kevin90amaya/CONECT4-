Feature: F04 Contrato de Progreso y Dúo de gitAGENT
  Como desarrollador del arnés universal
  Quiero definir el contrato estático de progreso en JSON y el dúo del agente gitAGENT
  Para garantizar transiciones de turno seguras y una gestión del repositorio Git estructurada bajo demanda

  Scenario: Creación y validez de progress.json con estructura de MD y DbC
    Given que el directorio "/workspaces/CONECT4-/harness_universal/state/" existe
    When se valida la configuración de progreso
    Then el archivo "progress.json" debe existir en dicho directorio
    And debe ser un JSON válido
    And debe especificar en "mdStructure" la estructura requerida del archivo "progress.md"
    And debe contener el diseño por contrato con "precondicion", "poscondicion" e "invariant"

  Scenario: Estructura del dúo físico del agente gitAGENT
    Given el directorio de agentes "/workspaces/CONECT4-/harness_universal/agents/git_agent/"
    When se verifica la presencia del agente gitAGENT
    Then deben existir los archivos "git_agent.md" y "git_agent.json" en dicho directorio
    And el archivo "git_agent.json" debe contener la estructura DbC ("precondicion", "poscondicion", "invariant")
    And debe tener el atributo booleano "automaticMode" establecido en false
    And debe incluir un arreglo "menuOptions" con las opciones de control de versiones para modo manual
    And debe especificar en "mdStructure" la estructura que rige al archivo "git_agent.md"

  Scenario: Consistencia y actualización de progress.md antes del rol de desarrollador
    Given que el humano aprueba las características del feature activo
    When el agente se prepara para tomar el rol de desarrollador
    Then el agente debe actualizar primero el archivo "progress.md" registrando la transición de la fase
    And la información en "progress.md" debe respetar la estructura definida en "progress.json"

  Scenario: Cumplimiento de Invariantes del DbC
    Given cualquier operación del agente gitAGENT o la validación del progreso
    When finaliza la ejecución o verificación del paso
    Then ningún archivo del código fuente de producción del proyecto objetivo "conect4" bajo "src/" o definido en paths.json debe ser modificado, alterado o eliminado
