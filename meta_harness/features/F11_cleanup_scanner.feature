Feature: F11 Ensamblaje final y Script de Limpieza de Basura
  Propósito: Proveer un escáner que detecte la deuda técnica generada por la IA para mantener la salud del meta-arnés.

  @s1
  Scenario: El escáner detecta basura y genera un reporte en modo Dry-Run
    Given que el meta-arnés contiene archivos residuales (ej. archivos .md temporales, referencias rotas o TODOs en scripts)
    When ejecuto el comando `bash scripts/cleanup-scanner.sh`
    Then el script termina con un código de error explícito
    And el script NO elimina ningún archivo del sistema operativo de forma automática
    And vuelca el resultado de los hallazgos en el archivo de reporte físico `state/cleanup-report.md`

  @s2
  Scenario: El escáner confirma un estado limpio
    Given que el meta-arnés está libre de deuda técnica y basura
    When ejecuto el comando `bash scripts/cleanup-scanner.sh`
    Then el script termina con un código de éxito (0)
    And actualiza el archivo de reporte `state/cleanup-report.md` indicando un estado completamente limpio

  @s3
  Scenario: El session_verifier bloquea el relevo (handoff) si hay basura
    Given que el archivo `state/cleanup-report.md` reporta inconsistencias o basura en el arnés
    When el agente `session_verifier` realiza el check obligatorio del `clean-state-checklist.md`
    Then el agente se niega a marcar la casilla de validación de limpieza
    And el agente prohíbe el relevo (bloquea la escritura de `state/session_handoff.md`) hasta que el humano o un agente corrija el estado
