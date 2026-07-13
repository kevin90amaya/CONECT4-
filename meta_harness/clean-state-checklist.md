# Clean State Checklist -- Meta Harness

> **Instrucción:** Este checklist debe ser verificado por el agente y el humano punto por punto , y **aprobado obligatoriamente por el humano**  , ANTES de realizar el relevo (handoff) o cerrar la sesión. Si alguna dimensión falla, el proceso se detiene hasta corregir el entorno.

## 1. Build Estructural
- [x] Se ejecutó el script `./init_meta.sh`.
- [x] El script finalizó sin errores (código de salida 0).

## 2. Feature Verification (Documental)
- [x] El estado de la tarea en el JSON correspondiente (`meta_feature_list.json` o `target_feature_list.json`) está actualizado.
- [x] El campo `"evidence"` de la tarea contiene el comando exacto o la ruta física que demuestra su funcionamiento.

## 3. Scope Control (WIP=1)
- [x] Existe solo **una** tarea en estado `"active"` en el JSON.
- [x] Se validó usando `git status` que los archivos modificados corresponden *estrictamente* al alcance de esa única tarea activa.

## 4. Code Quality
- [x] Los archivos modificados cumplen de forma estricta con las reglas de `ORCHESTRATOR.md` y `META_ARCHITECTURE.md`.
- [x] Los archivos generados (JSON, Markdown) están bien formados, sin errores de sintaxis o contradicciones lógicas.

## 5. Documentation y Diagramas
- [x] La bitácora `state/progress.md` está actualizada con lo logrado en la sesión.
- [x] La bitácora `state/pendings.md` ha sido revisada y actualizada si aplica.
- [x] Los datos para el relevo están recabados y listos para escribirse en `state/session_handoff.md` (una vez aprobado este checklist).
- [x] **Diagramas de Arquitectura:** Cualquier modificación estructural realizada al meta-arnés ha sido actualizada obligatoriamente en los archivos de la carpeta `diagrams/`.

## 6. Cleanup (Deuda Técnica de IA)
- [x] El reporte `state/cleanup-report.md` indica "0 issues" (estado LIMPIO) garantizando que no hay basura de IA en el arnés. (Para generarlo, ejecuta `bash scripts/cleanup-scanner.sh`).

## 7. Aprobación Humana (Puerta Final)
- [x] El agente ha presentado el estado de este checklist.
- [x] **El humano ha dado su aprobación explícita** para dar por terminada la sesión.
