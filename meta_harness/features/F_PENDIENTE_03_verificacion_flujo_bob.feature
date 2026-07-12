Feature: Paso de Verificación del Flujo Bob

  Propósito: Asegurar de manera explícita que toda característica desarrollada en el meta-arnés cumpla sus criterios de aceptación, cerrando formalmente el ciclo del Flujo Bob.

  @s1
  Scenario: Invocación del agente verificador y generación de plantilla
    Given que una característica ha superado la puerta de aprobación humana
    And existen escenarios Gherkin definidos en "meta_harness/features/"
    When se invoca al agente "verification_partner"
    Then el agente debe leer los archivos ".feature" correspondientes
    And el agente debe generar el archivo temporal "verification_checklist.md"
    And el agente asiste al humano para validar cada punto manualmente

  @s2
  Scenario: Archivo del historial de auditoría al finalizar la verificación
    Given que todos los puntos en "verification_checklist.md" han sido validados
    When la característica se marca como terminada
    Then el archivo "verification_checklist.md" NO debe ser eliminado
    And debe ser movido a la ruta "meta_harness/verifications/history/"
