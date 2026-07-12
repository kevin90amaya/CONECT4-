Feature: Separación de Roles y Autoverificación (Proyecto 05)
  Como Orquestador del meta-arnés
  Quiero delegar la generación de código y separar la verificación en dos contextos (Feature y Sesión)
  Para evitar que un agente se autoevalúe y asegurar un control de calidad estricto

  Scenario: El Orquestador delega la programación
    Given que una tarea está en progreso en el meta-arnés
    When el Orquestador llega al paso de Desarrollo del Flujo Bob
    Then el archivo ORCHESTRATOR.md prohíbe al agente programar
    And el Orquestador debe invocar a la habilidad "generator_partner" para implementar el código
    And el "spec_partner" debe exigir explícitamente secciones de "In Scope" y "Out of Scope"

  Scenario: Auditoría de la característica (Feature Verifier)
    Given que el "generator_partner" ha terminado su trabajo
    When el Orquestador invoca a "feature_verifier"
    Then el auditor debe generar un checklist basado en los escenarios Gherkin
    And debe evaluar el trabajo usando una "Evaluator Rubric" de 1 a 5 (Funcionalidad, Respeto de Alcance, Calidad de Código)
    And el auditor debe evaluar exclusivamente al generador y no auditar el cierre de sesión

  Scenario: Auditoría de la sesión y relevo (Session Verifier)
    Given que la característica fue auditada exitosamente
    When el Orquestador está listo para realizar el relevo de sesión (handoff)
    Then el Orquestador debe invocar a "session_verifier"
    And "session_verifier" debe auditar mecánicamente el "clean-state-checklist.md"
    And el proceso de cierre queda bloqueado hasta obtener aprobación humana explícita
