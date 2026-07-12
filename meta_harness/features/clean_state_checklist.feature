Feature: F08_proyecto_03_control_alcance - Clean State Checklist
  Propósito: Garantizar que antes del handoff, el entorno cumpla 5 dimensiones (Build, Feature, Scope, Code Quality, Documentation).

  @s1
  Scenario: Verificación de Build Estructural
    Given que el agente intenta finalizar la sesión
    When ejecuta el script "./init_meta.sh"
    Then el script debe terminar sin errores con código de salida 0

  @s2
  Scenario: Validación de Feature Verification documental
    Given que el agente ha completado una tarea del feature list
    When el agente actualiza "meta_feature_list.json"
    Then el campo "evidence" de la tarea debe contener el comando exacto o ruta física que demuestre su funcionamiento

  @s3
  Scenario: Control estricto de Scope (WIP=1) y archivos modificados
    Given que el agente se prepara para el handoff
    When revisa el estado del JSON de features y usa "git status"
    Then solo debe existir una tarea en estado "active"
    And los archivos listados como modificados en "git status" deben corresponder estrictamente al alcance de esa tarea "active"

  @s4
  Scenario: Verificación de Code Quality
    Given que el agente ha generado o modificado archivos
    When se revisa la integridad del código aportado
    Then los cambios deben cumplir estrictamente con las directrices en "AGENTS.md" y "META_ARCHITECTURE.md"
    And los archivos JSON y Markdown deben estar bien formados sin errores de sintaxis o contradicciones

  @s5
  Scenario: Documentación y actualización obligatoria de diagramas
    Given que se han realizado modificaciones estructurales o de avance
    When el agente completa el checklist de salida
    Then las bitácoras "progress.md", "pendings.md" y "session_handoff.md" deben estar actualizadas con lo logrado hoy
    And cualquier diagrama de arquitectura debe actualizarse para reflejar los cambios realizados en el meta arnés

  @s6
  Scenario: Fallo en el checklist bloquea el Handoff
    Given que alguna de las 5 dimensiones obligatorias no se cumple
    When el agente intenta realizar el relevo actualizando "session_handoff.md"
    Then el proceso de salida debe bloquearse
    And el agente debe retroceder para corregir la desviación en el entorno antes de cerrar la sesión

  @s7
  Scenario: Aprobación humana obligatoria del checklist
    Given que el agente ha verificado las 5 dimensiones exitosamente
    When el agente se prepara para finalizar el relevo
    Then debe presentar el estado del checklist al humano
    And debe requerir y obtener la aprobación explícita del humano antes de dar por cerrada la sesión
