# Verification Checklist - F00 Capa de Instalación y Desacoplamiento Agnóstico

## Escenario 1: Detección híbrida exitosa de stack y confirmación interactiva
- [x] `@s1-1`: el instalador debe detectar el stack tecnológico basado en Node.js y Vite
- [x] `@s1-2`: debe proponer la configuración detectada en la consola para validación del usuario
- [x] `@s1-3`: al recibir la confirmación del usuario, debe proceder con la instalación

## Escenario 2: Detección con stack no soportado (modo interactivo asistido)
- [x] `@s2-1`: el instalador debe entrar automáticamente en modo interactivo asistido
- [x] `@s2-2`: debe solicitar al usuario ingresar manualmente los parámetros del stack y comandos
- [x] `@s2-3`: al recibir los datos ingresados por el usuario, debe proceder con la instalación

## Escenario 3: Generación de la estructura de direcciones y archivo paths.json con rutas absolutas y comandos dinámicos
- [x] `@s3-1`: debe crear el directorio "/workspaces/CONECT4-/harness_universal/direcciones/" si no existe
- [x] `@s3-2`: debe escribir el archivo "paths.json" dentro de dicho directorio
- [x] `@s3-3`: el archivo "paths.json" debe contener las rutas absolutas y normalizadas del proyecto
- [x] `@s3-4`: el archivo "paths.json" debe definir los comandos dinámicos "build", "test", "lint" y "clean" correspondientes al stack

## Escenario 4: Intento de instalación con ruta de proyecto objetivo inválida
- [x] `@s4-1`: el instalador debe abortar la ejecución inmediatamente
- [x] `@s4-2`: debe terminar con un código de salida igual a 1
- [x] `@s4-3`: debe imprimir un mensaje de error descriptivo en la salida de error estándar

## Escenario 5: Normalización de rutas relativas a absolutas en paths.json
- [x] `@s5-1`: el instalador debe resolver la ruta relativa a su ruta absoluta normalizada correspondiente
- [x] `@s5-2`: el archivo "paths.json" debe ser guardado conteniendo únicamente la ruta absoluta normalizada resolviendo discrepancias de directorios de trabajo

## Escenario 6: Error de permisos al intentar escribir en el directorio de direcciones
- [x] `@s6-1`: el instalador debe detectar la falta de permisos de escritura
- [x] `@s6-2`: debe abortar la ejecución sin realizar cambios parciales
- [x] `@s6-3`: debe emitir un mensaje de diagnóstico específico sobre el error de permisos en el directorio de destino
- [x] `@s6-4`: debe terminar con un código de salida igual a 1

## Evaluator Rubric

| Dimensión | Puntuación (1-5) | Notas del Evaluador / Humano |
| :--- | :---: | :--- |
| **1. Funcionalidad** | [puntuacion = "3"] | Evaluado por Kevin, sin comentarios adicionales. |
| **2. Respeto de Alcance** | [puntuacion = "3"] | Evaluado por Kevin, sin comentarios adicionales. |
| **3. Calidad de Código** | [puntuacion = "3"] | Evaluado por Kevin, sin comentarios adicionales. |

**Puntuación Final:** 3 / 5
