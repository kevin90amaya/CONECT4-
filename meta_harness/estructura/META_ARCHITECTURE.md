# Architecture -- Meta Harness

## System Overview

El Meta Harness no es código de producción, sino una estructura de reglas, convenciones y documentos (JSON/Markdown) que gobiernan el comportamiento del agente de IA durante el desarrollo.

## Layer Diagram

```text
+-----------------------------------------------------------+
|                     Meta Harness Raíz                     |
|  README.md         -> Enrutador base o índice general     |
|  init_meta.sh      -> Script de inicialización            |
|  clean-state-ch... -> Checklist obligatorio de salida     |
+-----------------------------------------------------------+
         |
+-----------------------------------------------------------+
|   agents/          |   Control de Reglas                  |
|  ORCHESTRATOR.md         -> Reglas de inicio y permisos         |
+-----------------------------------------------------------+
         |  (Guía el comportamiento base del Agente)
+-----------------------------------------------------------+
|   state/           |   Estado y Continuidad               |
|  session_handoff.md-> Estado exacto del último cierre     |
|  progress.md       -> Puntero a la tarea activa           |
|  pendings.md       -> Lista de ajustes menores            |
+-----------------------------------------------------------+
         |  (Define las tareas inmediatas de la sesión)
+-----------------------------------------------------------+
|   features/        |   Backlog de Tareas                  |
|  meta_feature_list...-> Features del meta-harness         |
|  target_feature_list.json -> Features del target-harness     |
+-----------------------------------------------------------+
|   specs/           |   Especificaciones Conversadas       |
|  meta-project-spec.md  -> Spec del meta-harness           |
|  target-project-spec.md -> Spec del target-harness        |
+-----------------------------------------------------------+
|   docs/            |   Manifiesto y Referencias           |
|   estructura/      |   Definición de Producto y Arq.      |
|   diagrams/        |   Diagramas en PlantUML              |
|   verifications/   |   Historial de Auditorías            |
+-----------------------------------------------------------+
```

## Data Storage

Todos los archivos residen en `/workspaces/CONECT4-/meta_harness/`.
- `clean-state-checklist.md`: Contrato de verificación final requerido antes del handoff.
- `verifications/history/`: Directorio donde se archivan los checklists auditados.
- `meta_feature_list.json` / `target_feature_list.json`: Arrays JSON estructurados con IDs, descripciones, status y evidencia. Separados por arnés.
- Archivos `.md`: Documentos Markdown puros y estáticos sin código ejecutable que actúan como memoria a largo plazo.
