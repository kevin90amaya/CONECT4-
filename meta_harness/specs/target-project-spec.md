# Especificación de Harness Universal (target-project-spec.md)

> Este documento es mantenido por el agente `spec_partner`.
> Aquí se registra el debate, el propósito, contrato y casos límite para las features orientadas a diseñar o mejorar el `harness_universal` desde el meta-entorno.

## Feature: F00_instalacion_desacoplamiento - Capa de Instalación y Desacoplamiento (Agnóstico)
- **Propósito:** Implementar el agente instalador y configurar el mapeo del stack tecnológico en `direcciones/paths.json` para lograr el desacoplamiento total del código fuente del proyecto objetivo (`conect4` o futuros proyectos). Esto permite que todos los agentes del pipeline del `harness_universal` operen de manera agnótica al stack tecnológico, delegando la ejecución de comandos y la búsqueda de rutas al mapeador centralizado.
- **Comportamiento:**
  1. **Detección Híbrida:** El agente instalador escanea firmas físicas (`package.json`, `pom.xml`, `vite.config.js`, etc.) del proyecto objetivo. Propone la configuración detectada al humano en consola para validación y confirmación. Si no encuentra firmas conocidas, el instalador entra en un modo declarativo interactivo asistido para que el usuario configure los parámetros manualmente.
  2. **Comandos Dinámicos en paths.json:** Crea el directorio `/workspaces/CONECT4-/harness_universal/direcciones/` y escribe el archivo `paths.json` con rutas absolutas normalizadas, stacks detectados y los comandos dinámicos asociados (`build`, `test`, `lint`, `clean`). Los agentes especialistas del arnés universal consultan este JSON en lugar de asumir rutas del proyecto o comandos del compilador/test.
  3. **Gobernanza de Progreso (turn en progress):** El flujo se coordinará a través de la variable `turn` (turno) dentro del archivo/objeto de estado `progress`, tal y como se diseñó en `harnes_poo.plantuml`. Cada agente especialista lee de `progress` si es su turno, actúa directamente sobre `src/dominio`, `src/main` o `src/test`, y delega al siguiente modificando el turno. El `gitAGENT` reaccionará de manera reactiva según este `turn` (crear rama en turno `specpartner`, hacer commits intermedios por agente, y hacer merge final en turno `verifiersession`), eliminando la necesidad de directorios temporales de workspace.
  4. **Divulgación Progresiva:** La documentación extensa, manuales de testing y guías de QA del arnés universal se guardarán en la carpeta `docs/` de `harness_universal/` (en lugar de una carpeta `rules/`). Las habilidades (`SKILL.md`) se mantendrán compactas (< 500 líneas) y leerán la documentación en `docs/` solo bajo demanda.
- **Casos límite:**
  - **Sin firmas conocidas (Stack no soportado):** El instalador pasa automáticamente a modo interactivo asistido solicitando la configuración de manera amigable.
  - **Ruta del proyecto objetivo inválida:** Valida la existencia y accesibilidad antes del escaneo. Si es inaccesible, aborta con salida distinta de cero (`1`) y un mensaje descriptivo.
  - **Normalización de rutas relativas:** El instalador forzará la resolución a rutas absolutas normalizadas antes de escribir en `paths.json` para evitar discrepancias debido al directorio de trabajo de los subagentes.
  - **Errores de permisos al escribir en `direcciones`:** El instalador verifica la disponibilidad de escritura en `/workspaces/CONECT4-/harness_universal` y emite un mensaje de diagnóstico específico si los permisos son suficientes.
- **Decisiones:**
  - **Detección Híbrida y Confirmación Humana:** Permite flexibilidad de configuración pero mantiene la conveniencia de la automatización reduciendo errores.
  - **Comandos Dinámicos en paths.json:** Asegura que los agentes operativos como `Judge` y `RefactorPartner` sean 100% agnósticos y reutilizables en cualquier stack tecnológico.
  - **Gobernanza mediante Turnos y Git Reactivo:** Consolida el control de la sesión en un único lugar (`progress`), manteniendo un histórico limpio en Git sin la sobrecarga de un directorio de workspace temporal.
  - **Divulgación Progresiva en `docs/` del arnés:** Evita la fatiga de contexto de los LLMs al separar los prompts de habilidades de las guías y manuales técnicos.
