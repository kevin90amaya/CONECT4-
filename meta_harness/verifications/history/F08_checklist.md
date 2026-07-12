# Verification Checklist: F08_proyecto_03_control_alcance

- [x] `@s1`: el script `./init_meta.sh` debe terminar sin errores con código de salida 0
- [x] `@s2`: el campo "evidence" de la tarea debe contener el comando exacto o ruta física que demuestre su funcionamiento
- [x] `@s3`: solo debe existir una tarea en estado "active"
- [x] `@s3`: los archivos listados como modificados en "git status" deben corresponder estrictamente al alcance de esa tarea "active"
- [x] `@s4`: los cambios deben cumplir estrictamente con las directrices en "AGENTS.md" y "META_ARCHITECTURE.md"
- [x] `@s4`: los archivos JSON y Markdown deben estar bien formados sin errores de sintaxis o contradicciones
- [x] `@s5`: las bitácoras "progress.md", "pendings.md" y "session_handoff.md" deben estar actualizadas con lo logrado hoy
- [x] `@s5`: cualquier diagrama de arquitectura debe actualizarse para reflejar los cambios realizados en el meta arnés
- [x] `@s6`: el proceso de salida debe bloquearse si hay fallos
- [x] `@s6`: el agente debe retroceder para corregir la desviación en el entorno antes de cerrar la sesión
- [x] `@s7`: debe presentar el estado del checklist al humano
- [x] `@s7`: debe requerir y obtener la aprobación explícita del humano antes de dar por cerrada la sesión
