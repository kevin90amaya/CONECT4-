Feature: F_PENDIENTE_05.5 - Mapeador Interno Propio (Harness Mapper)
  Propósito: Reemplazar Graphify con un sistema de mapeo de relaciones semánticas y deterministas que garantice que el 100% de los nodos correspondan a archivos físicos reales.

  @s1
  Scenario: El Agente Extractor descarta sugerencias de archivos inexistentes
    Given el Agente Extractor lee un archivo de origen para detectar referencias
    When el LLM del Extractor sugiere una conexión a un archivo llamado "inexistente.md"
    And la herramienta de validación física comprueba que "inexistente.md" no existe en el disco
    Then el Extractor descarta la conexión silenciosamente
    And la conexión no es enviada al Agente Comprobador

  @s2
  Scenario: El Agente Comprobador rechaza una conexión si el humano no la aprueba
    Given el Agente Extractor ha sugerido una conexión válida físicamente entre "origen.md" y "destino.md"
    When el Agente Comprobador lee "origen.md" para verificar la lógica
    And el Agente Comprobador pide aprobación interactiva al humano
    And el humano rechaza (n) la conexión
    Then la conexión no se registra en el grafo final (graph.json)

  @s3
  Scenario: El sistema genera una suite completa de artefactos tras la aprobación
    Given el Agente Extractor ha sugerido conexiones y validado su existencia física
    And el humano aprueba (Y) las conexiones sugeridas por el Agente Comprobador
    When el proceso de mapeo finaliza
    Then se deben generar los siguientes artefactos en el directorio de salida:
      | archivo            |
      | graph.json         |
      | GRAPH_REPORT.md    |
      | graph.html         |
      | manifest.json      |

  @s4
  Scenario: El sistema realiza actualizaciones incrementales para ahorrar tiempo y tokens
    Given un "manifest.json" de una ejecución anterior existe en el directorio de salida
    When el proceso de mapeo inicia
    And el sistema compara los archivos actuales contra el "manifest.json"
    And detecta que un archivo de origen no ha sido modificado
    Then el Agente Extractor omite el procesamiento por LLM de dicho archivo
    And reutiliza las conexiones (aristas) cacheadas de la ejecución anterior
