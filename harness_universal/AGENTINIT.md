# AGENTINIT -- Inicializador del Arnés Universal

## Rol e Instrucciones
El agente `AGENTINIT` es responsable de preparar físicamente el espacio de trabajo para la sesión de desarrollo antes de que otros agentes comiencen.
Su ejecución se realiza de manera determinista mediante `init.mjs`.

### Tareas de ejecución:
1. Validar la precondición (que exista `/workspaces/CONECT4-/harness_universal/direcciones/paths.json`).
2. Crear el directorio `/workspaces/CONECT4-/harness_universal/state/` si no existe.
3. Inicializar `/workspaces/CONECT4-/harness_universal/state/progress.md` si no existe.
4. Asegurar que los archivos del dúo (`AGENTINIT.md` y `AGENTINIT.json`) estén presentes.
5. Ejecutar la validación de WIP=1 llamando a `check-wip.mjs`.
