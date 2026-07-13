# Análisis de Referencias: harness-creator y harness-plugin

Este documento detalla el estudio de los patrones de diseño y mecanismos de implementación utilizados por las herramientas de referencia ubicadas en `/dominio/EJEMPLOS HARNES/`. El objetivo es comprender cómo gestionan la detección tecnológica, el andamiaje, la separación de roles, la orquestación y el control de contexto para aplicar estas lecciones al diseño de nuestro **Harness Universal** y, específicamente, a la tarea `F00_instalacion_desacoplamiento`.

---

## 1. Análisis de `harness-creator` (Skill)
Ubicación del recurso: [SKILL.md (harness-creator)](file:///workspaces/CONECT4-/dominio/EJEMPLOS%20HARNES/agentes%20y%20pugins/skills/harness-creator/SKILL.md)

### Propósito y Enfoque
Esta skill se enfoca en crear un **arnés mínimo y ligero** (lightweight harness) directamente sobre el espacio de trabajo local. Su filosofía es no saturar a los agentes con documentos extensos, sino proveer cinco subsistemas fundamentales (el Core Model) para asegurar la predictibilidad del desarrollo.

### Mecanismo de Detección e Inicialización
El script central [create-harness.mjs](file:///workspaces/CONECT4-/dominio/EJEMPLOS%20HARNES/agentes%20y%20pugins/skills/harness-creator/scripts/create-harness.mjs) realiza la detección del entorno a través de funciones deterministas expuestas en [harness-utils.mjs](file:///workspaces/CONECT4-/dominio/EJEMPLOS%20HARNES/agentes%20y%20pugins/skills/harness-creator/scripts/lib/harness-utils.mjs):

1. **Firma Tecnológica (`detectProject`):**
   Rastrea el árbol de archivos en busca de firmas clave de construcción del proyecto:
   - `pom.xml` $\rightarrow$ Java con Maven.
   - `build.gradle` / `build.gradle.kts` $\rightarrow$ Java con Gradle.
   - `package.json` $\rightarrow$ Node.js / TypeScript.
   - `requirements.txt` / `pyproject.toml` $\rightarrow$ Python.
   - `go.mod` $\rightarrow$ Go.
   - `Cargo.toml` $\rightarrow$ Rust.
   - `.csproj` / `.sln` $\rightarrow$ .NET.
2. **Gestión de Paquetes (`detectPackageManager`):**
   Identifica si se usa `npm`, `pnpm`, `yarn` o `bun` mediante la presencia de sus respectivos lockfiles (`package-lock.json`, `pnpm-lock.yaml`, etc.).
3. **Generación de Comandos de Verificación (`verificationCommands`):**
   Dependiendo del stack tecnológico detectado, extrae o autogenera los comandos de prueba y construcción. Por ejemplo:
   - Python $\rightarrow$ `python -m pytest` y compilación básica.
   - Java Maven $\rightarrow$ `mvn test`.
   - Node $\rightarrow$ Extrae scripts específicos de `package.json` como `check`, `typecheck`, `lint`, `test` o `build`.
4. **Andamiaje de Entrada Failsafe (`init.sh`):**
   Escribe un script de inicialización con la bandera de Bash `set -e` (para forzar la detención del script al primer error). Este script ejecuta secuencialmente los comandos de instalación, linting, compilación y pruebas unitarias obtenidos en el paso anterior.

### Sistema de Auditoría
El script `validate-harness.mjs` lee los archivos generados y califica del 1 al 5 las 5 dimensiones clave (Instrucciones, Estado, Verificación, Alcance y Ciclo de vida), identificando el cuello de botella técnico del arnés actual.

---

## 2. Análisis de `harness-plugin` (Plugin / Fábrica de Equipos)
Ubicación del recurso: [SKILL.md (harness-plugin)](file:///workspaces/CONECT4-/dominio/EJEMPLOS%20HARNES/agentes%20y%20pugins/plugins/harness-plugin/skills/harness/SKILL.md)

### Propósito y Enfoque
A diferencia de `harness-creator`, que opera a nivel de archivos individuales de configuración, `harness-plugin` es una **Fábrica de Arquitecturas de Equipos** (Team Architecture Factory). Permite estructurar un pipeline completo de múltiples subagentes y habilidades que colaboran de manera segregada para resolver problemas complejos de un dominio.

### Arquitectura de Colaboración
* **Estructura Empaquetada:** Todo el equipo de agentes se empaqueta dentro de la carpeta `.agents/plugins/{domain}-plugin/`.
* **Definición de Agentes (`agent.json`):** Cada subagente tiene un rol estricto delimitado por su prompt del sistema y se le asigna un juego de herramientas óptimo.
* **Definición de Habilidades (`SKILL.md`):** Se crean habilidades individuales con descripciones sumamente asertivas y agresivas ("pushy") para forzar a que el orquestador o la herramienta las invoque de forma predecible según el contexto del usuario.
* **El Rol del Orquestador:** Un agente principal (el Orquestador) ejecuta secuencialmente a los subagentes llamando a la herramienta `invoke_subagent`.

### Gestión del Contexto y Paso de Datos
1. **Divulgación Progresiva (Progressive Disclosure):**
   Para no agotan la ventana de contexto de los LLMs, la información se divide en tres capas de carga condicional:
   - **Metadata (Muy ligera):** Nombre y descripción del prompt (siempre en memoria).
   - **Cuerpo del SKILL.md:** Instrucciones principales limitadas a menos de 500 líneas.
   - **Rules (`rules/`):** Manuales técnicos extensos o referencias de diseño que solo se leen bajo demanda explícita (ej. si se está trabajando en AWS, solo lee `rules/aws.md`).
2. **Protocolo del Workspace Temporal:**
   Los subagentes no se comunican directamente. Comparten información escribiendo y leyendo archivos en un directorio temporal común `_workspace/` usando una nomenclatura numérica y prefijos de rol (ej: `_workspace/01_analyst_spec.md` $\rightarrow$ `_workspace/02_builder_code.py`). Esto permite tener un registro auditable e inmutable del paso de control.

---

## 3. Lecciones Aprendidas para nuestro Arnés Universal

Al diseñar el pipeline de agentes de nuestro `harness_universal` y, en especial, la tarea `F00_instalacion_desacoplamiento`, aplicaremos las siguientes decisiones acordadas en el debate:

| Concepto | Cómo se aplica en nuestro Arnés Universal |
|---|---|
| **Detección Tecnológica (Punto 1 - Híbrida)** | El agente `instalador` escaneará firmas físicas (`package.json`, `vite.config.js`, etc.) para detectar el stack del proyecto (`conect4`). Le pedirá confirmación a Kevin con opciones para verificar que la detección es correcta. En caso de fallas o de no detectar firmas, pasará a un modo declarativo interactivo. |
| **Normalización de Rutas y Desacoplamiento (Punto 2 - Comandos Dinámicos)** | El instalador registrará rutas absolutas y comandos dinámicos (`build`, `test`, `lint`, `clean`) en el archivo `harness_universal/direcciones/paths.json`. Agentes especialistas como `Judge` o `RefactorPartner` no conocerán los comandos de Vite o Jest; simplemente leerán y ejecutarán los comandos del JSON, logrando desacoplamiento total de la tecnología. |
| **Gobernanza de Progreso (Punto 3 - Turno y Progreso en `harnes_poo`)** | No utilizaremos la transferencia de archivos intermedios de un directorio temporal `_workspace/` para el paso de control. En su lugar, el flujo de desarrollo será gobernado por el estado centralizado en la clase/archivo `progress` mediante la variable `turn` (turno), tal como está en el modelo [harnes_poo.plantuml](file:///workspaces/CONECT4-/harness_universal/diagrams/harnes_poo.plantuml). |
| **Delegación del Turno (`:D`)** | Los agentes especialistas leen de `progress` si es su turno, operan directamente sobre el código fuente (`src/dominio`, `src/main`, `src/test`) y, al finalizar su tarea, modifican el turno (`turn`) delegando al siguiente rol de la cadena. |
| **Automatización Reactiva de Git (`gitAGENT`)** | El agente `gitAGENT` reaccionará de manera reactiva según el estado de la variable `turn` en `progress`: si `turn = specpartner` crea una rama `features_<id>`; si `turn = agents.*` (desarrollo intermedio) realiza commits con el ID del agente; si `turn = verifiersession` realiza el merge final de la rama a `main`. |
| **Divulgación Progresiva (Docs en el arnés)** | Para evitar la sobrecarga de la ventana de contexto de los agentes, implementaremos divulgación progresiva. En lugar de usar una carpeta `rules/` separada por habilidad (como en `harness-plugin`), almacenaremos todos los manuales técnicos, guías de testing y QA en la carpeta **`docs/` dentro de `harness_universal`**. Los agentes mantendrán sus habilidades `SKILL.md` muy cortas e independientes (< 500 líneas) y leerán la documentación extensa de `docs/` solo bajo demanda. |
