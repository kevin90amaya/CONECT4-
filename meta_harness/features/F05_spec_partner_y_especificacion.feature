Feature: F05 Agente SpecPartner y Capa de Especificación en harness_universal
  Como desarrollador del arnés universal
  Quiero implementar el agente SpecPartner y la integración de especificaciones en ViewHarness
  Para documentar la sesión de desarrollo y visualizar dinámicamente las especificaciones en el dashboard

  @s1
  Scenario: Estructura del dúo físico del agente SpecPartner
    Given el directorio de agentes "/workspaces/CONECT4-/harness_universal/agents/spec_partner/"
    When se verifica la presencia del agente SpecPartner
    Then deben existir los archivos "spec_partner.md" y "spec_partner.json" en dicho directorio
    And el archivo "spec_partner.json" debe contener la estructura DbC ("precondicion", "poscondicion", "invariant")
    And debe tener el atributo booleano "automaticMode" establecido en false
    And debe incluir un arreglo "menuOptions" con las opciones conceptuales del agente

  @s2
  Scenario: Flujo operativo del ciclo de especificación del SpecPartner
    Given el agente SpecPartner es invocado
    When inicia el proceso de especificación
    Then debe leer su propio dúo json y las tareas activas
    And debe iniciar el ciclo interactivo de debate, propuesta, ajuste y nueva propuesta con el humano
    And una vez aprobada la especificación por el humano, debe guardarla en "specs/target-project-spec.md"
    And debe actualizar "state/progress.md" configurando "Siguiente Turno" como "gherkinauthor"
    And debe delegar la tarea de guardado y control de versiones a "git_agent"
    And "git_agent" debe procesar la delegación y retornar el control al "orquestador" al finalizar

  @s3
  Scenario: Integración MVC en ViewHarness para visualización de especificaciones
    Given que el usuario opens la vista "viewharness/index.html" en un navegador
    And los componentes "HarnessController", "HarnessView" y la clase "SpecModel" están definidos
    When el dashboard se inicializa y carga la especificación activa
    Then "SpecModel" realiza la petición para leer "/workspaces/CONECT4-/harness_universal/specs/target-project-spec.md"
    And "HarnessController" coordina la llamada a "SpecModel" y delega el contenido a la vista
    And "HarnessView" renderiza el contenido Markdown en HTML usando un renderizador vanilla
    And dicho renderizador traduce títulos, listas y negritas sin dependencias externas

  @s4
  Scenario: Caso límite de especificación no existente o vacía
    Given que el archivo "/workspaces/CONECT4-/harness_universal/specs/target-project-spec.md" no existe o está vacío
    When el dashboard intenta cargar la especificación activa
    Then "SpecModel" captura el error de carga o fetch
    And "HarnessView" renderiza el mensaje informativo: "No hay especificaciones activas redactadas para la sesión actual"

  @s5
  Scenario: Cumplimiento de Invariantes del DbC
    Given el desarrollo y verificación de la característica F05
    When finaliza la ejecución o validación del paso
    Then ningún archivo del código fuente de producción en "/src/main" ni de pruebas en "/src/test" debe ser modificado o eliminado
    And no se debe crear ningún archivo ejecutable ".mjs" para SpecPartner
    And el agente no debe realizar comandos git directamente, delegando a "git_agent"
    And la escritura de archivos ".feature" se delega a "gherkinauthor"
