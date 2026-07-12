Feature: F09 Validación Activa de Reglas (WIP=1)
  Como arnés automatizado
  Quiero asegurar que la regla de una sola tarea activa a la vez (WIP=1) se cumpla mecánicamente
  Para prevenir el desborde de alcance ("scope creep")

  @s1
  Scenario: Exactamente una tarea activa en total
    Given que "meta_feature_list.json" tiene 1 tarea con status "in_progress" o "active"
    And "bob_feature_list.json" tiene 0 tareas activas
    When ejecuto el script "scripts/check-wip.sh"
    Then el script debe terminar con código de salida 0
    And debe imprimir un mensaje indicando que la validación fue exitosa

  @s2
  Scenario: Cero tareas activas (estado de reposo)
    Given que ningún JSON tiene tareas con status "in_progress" ni "active"
    When ejecuto el script "scripts/check-wip.sh"
    Then el script debe terminar con código de salida 0
    And debe imprimir un mensaje indicando que no hay tareas activas (estado de reposo)

  @s3
  Scenario: Múltiples tareas activas (Violación de regla)
    Given que hay múltiples tareas (más de 1) con estado "in_progress" o "active" entre los json
    When ejecuto el script "scripts/check-wip.sh"
    Then el script debe terminar con código de salida 1
    And debe imprimir un mensaje explicando la violación de la regla WIP=1

  @s4
  Scenario: Archivos JSON inválidos o problemas de dependencias
    Given que un archivo JSON es inválido o no existe, o falta la herramienta jq
    When ejecuto el script "scripts/check-wip.sh"
    Then el script debe terminar con código de salida 1
    And debe indicar explícitamente un error al leer el archivo o ejecutar la validación
