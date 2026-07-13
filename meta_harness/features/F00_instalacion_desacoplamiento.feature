Feature: F00 Capa de Instalación y Desacoplamiento Agnóstico
  Como agente instalador
  Quiero detectar el stack del proyecto objetivo y generar un mapeo centralizado de rutas y comandos
  Para lograr el desacoplamiento total del código fuente y permitir que el arnés opere de forma agnóstica

  Scenario: Detección híbrida exitosa de stack y confirmación interactiva
    Given que el proyecto objetivo tiene firmas físicas conocidas como "package.json" y "vite.config.js"
    And la ruta del proyecto objetivo es válida y accesible
    When ejecuto el instalador con la ruta del proyecto
    Then el instalador debe detectar el stack tecnológico basado en Node.js y Vite
    And debe proponer la configuración detectada en la consola para validación del usuario
    And al recibir la confirmación del usuario, debe proceder con la instalación

  Scenario: Detección con stack no soportado (modo interactivo asistido)
    Given que el proyecto objetivo no contiene firmas físicas conocidas de ningún stack soportado
    And la ruta del proyecto objetivo es válida y accesible
    When ejecuto el instalador con la ruta del proyecto
    Then el instalador debe entrar automáticamente en modo interactivo asistido
    And debe solicitar al usuario ingresar manualmente los parámetros del stack y comandos
    And al recibir los datos ingresados por el usuario, debe proceder con la instalación

  Scenario: Generación de la estructura de direcciones y archivo paths.json con rutas absolutas y comandos dinámicos
    Given que la instalación ha sido configurada y confirmada
    And el directorio "/workspaces/CONECT4-/harness_universal/direcciones/" está disponible para escritura
    When el instalador finaliza la configuración
    Then debe crear el directorio "/workspaces/CONECT4-/harness_universal/direcciones/" si no existe
    And debe escribir el archivo "paths.json" dentro de dicho directorio
    And el archivo "paths.json" debe contener las rutas absolutas y normalizadas del proyecto
    And el archivo "paths.json" debe definir los comandos dinámicos "build", "test", "lint" y "clean" correspondientes al stack

  Scenario: Intento de instalación con ruta de proyecto objetivo inválida
    Given que la ruta especificada para el proyecto objetivo no existe o no es accesible
    When ejecuto el instalador con dicha ruta
    Then el instalador debe abortar la ejecución inmediatamente
    And debe terminar con un código de salida igual a 1
    And debe imprimir un mensaje de error descriptivo en la salida de error estándar

  Scenario: Normalización de rutas relativas a absolutas en paths.json
    Given que el usuario proporciona una ruta relativa para el proyecto objetivo
    And la ruta relativa existe y es accesible
    When ejecuto el instalador y confirmo la configuración
    Then el instalador debe resolver la ruta relativa a su ruta absoluta normalizada correspondiente
    And el archivo "paths.json" debe ser guardado conteniendo únicamente la ruta absoluta normalizada resolviendo discrepancias de directorios de trabajo

  Scenario: Error de permisos al intentar escribir en el directorio de direcciones
    Given que el usuario no tiene permisos de escritura en la ruta "/workspaces/CONECT4-/harness_universal"
    When ejecuto el instalador y confirmo la configuración
    Then el instalador debe detectar la falta de permisos de escritura
    And debe abortar la ejecución sin realizar cambios parciales
    And debe emitir un mensaje de diagnóstico específico sobre el error de permisos en el directorio de destino
    And debe terminar con un código de salida igual a 1
