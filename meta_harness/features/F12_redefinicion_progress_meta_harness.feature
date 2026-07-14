Feature: F12 Redefinición del rol de progress.md
  Propósito: Redefinir la función de progress.md como un relevo dinámico entre agentes y permitir su edición por parte de todos los agentes autorizados.

  @s1
  Scenario: Estructura del archivo progress.md
    Given que el archivo `state/progress.md` está inicializado en la sesión activa
    When se lee su contenido
    Then debe contener obligatoriamente los campos:
      | Campo            | Descripción                                                           |
      | Último Turno     | Rol del agente que acaba de terminar su fase                         |
      | Siguiente Turno  | Rol del agente que debe ejecutar la siguiente fase                    |
      | Fase Activa      | Debate, Gherkin, Desarrollo, Auditoría o Reposo                       |
      | Tarea Activa     | ID de la tarea en progreso                                            |
      | Decisiones       | Lista de decisiones de diseño, código o arquitectura tomadas          |
      | Recursos         | Recursos estudiados por el agente y recursos recomendados al siguiente|

  @s2
  Scenario: Actualización de relevo al finalizar el turno de un agente
    Given que el agente actual (ej. `spec_partner`) ha finalizado su trabajo en la tarea activa
    And el humano ha otorgado el "OK" explícito
    When el agente actualiza el archivo `state/progress.md`
    Then registra el relevo con sus decisiones y recursos estudiados
    And establece `Último Turno` como su propio rol
    And establece `Siguiente Turno` como el rol del siguiente agente en el pipeline (ej. `gherkin_author`)

  @s3
  Scenario: Validación de turno al iniciar la ejecución de un agente
    Given que un agente se despierta para iniciar su fase de trabajo
    When lee el archivo `state/progress.md`
    Then verifica que el campo `Siguiente Turno` coincida estrictamente con su rol
    And si no coincide, emite una alerta explícita al humano y detiene su ejecución de inmediato

  @s4
  Scenario: Modificación de reglas del Orquestador y agentes
    Given las reglas de interacción en `agents/ORCHESTRATOR.md` y las skills de los agentes
    When se evalúan las restricciones de escritura sobre la carpeta `state/`
    Then se permite la edición de `state/progress.md` a cualquier agente en su respectivo turno de relevo
    And se mantiene la prohibición exclusiva para el resto de archivos (`session_handoff.md`, `pendings.md`) los cuales solo puede modificar `session_verifier`
