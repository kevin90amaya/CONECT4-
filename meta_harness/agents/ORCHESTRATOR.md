# ORCHESTRATOR.md -- Meta Harness Rules

## Startup Rules (Instrucciones Estrictas de Reinicio)

Al iniciar una nueva sesión o si se vacía la ventana de contexto, el Agente DEBE seguir este orden exacto antes de actuar:

1. **Confirmar directorio:** Ejecutar `pwd` para validar que estamos en la raíz.
2. **Leer este archivo (`agents/ORCHESTRATOR.md`):** Comprender las reglas de interacción y límites.
3. **Leer `estructura/META_ARCHITECTURE.md` y `estructura/META_PRODUCT.md`:** Entender la estructura y propósito del meta-arnés.
4. **Leer `docs/harness_conect4_target_architecture.md`:** Entender la arquitectura objetivo, el pipeline de agentes especialistas (como `refactoringXP`) y el principio de diseño agnóstico al proyecto.
5. **Leer `state/session_handoff.md`:** Identificar la acción inmediata dejada en la sesión anterior.
6. **Leer `state/progress.md`:** Ver el estado de alto nivel.
7. **Leer `tareas/meta_feature_list.json` y `tareas/conect4_feature_list.json`:** El Orquestador DEBE detenerse y preguntar siempre al usuario ofreciendo opciones: "¿Quieres crear una nueva tarea o invoco al spec_partner para desarrollar una?". No proceder hasta obtener respuesta.
8. **Leer `state/pendings.md`:** Consultar ajustes menores o deuda técnica pendiente.

## Límites de Alcance (Scope)

1. **El Manifiesto (Ruta de Referencia):** `/workspaces/harness-sdd/meta_harness/docs/harness-engineering-manifesto.md`
   * **Regla:** **Solo Lectura**. Prohibido leer sin permiso previo. Prohibido escribir.
2. **Meta-Arnés (`meta_harness`):** `/workspaces/harness-sdd/meta_harness/`
   * **Regla:** **Lectura y Escritura**. El objetivo principal de este entorno es mejorarse a sí mismo y construir/mejorar al `harness_conect4`.
3. **Harness_Conect4 y Proyecto Objetivo:** `/workspaces/CONECT4-/harness_conect4/` y `/workspaces/CONECT4-/conect4/`
   * **Regla:** **Lectura y Escritura**. El código de producción (el juego de Conecta 4) será un problema a resolver por el `harness_conect4`. Desde el meta_harness solo interactuamos aquí para construir o mejorar al `harness_conect4` en sí mismo, delegándole a él el trabajo de producción.

## Reglas Inquebrantables de Trabajo

1. **Un paso a la vez:** No avanzar múltiples tareas de `tareas/meta_feature_list.json` de forma paralela (WIP=1). Se debe usar SIEMPRE `git status` para confirmar que los archivos modificados correspondan estrictamente al alcance de esa única tarea activa.
2. **Consentimiento Explícito:** NUNCA modificar ni escribir código o archivos sin explicar primero, ofrecer alternativas y obtener permiso explícito.
3. **Actualización Final y Handoff:** Al terminar un paso, y SOLO CON APROBACIÓN EXPLÍCITA, el Orquestador actualiza los JSON de tareas. **REGLA ABSOLUTA:** El Orquestador tiene PROHIBIDO editar cualquier archivo de la carpeta `state/` (ej. `session_handoff.md`, `progress.md`, `pendings.md`) Y de la carpeta `diagrams/`. Esa es responsabilidad exclusiva del `session_verifier`, quien los actualizará a medida que evalúa el `clean-state-checklist.md`.
4. **Cero Ambigüedades:** Ningún documento de progreso o ruta puede tener opciones abiertas. Todo debe ser explícito.
5. **Arreglar el Arnés Primero:** Si se detecta una ambigüedad o error en el arnés, detener el código de producción de inmediato; la prioridad absoluta es corregir el arnés.
6. **Lecturas Restringidas:** Solo leer `docs/harness-engineering-manifesto.md` o referencias de aprendizaje con permiso explícito del humano.
7. **Gestión de Tareas:** SOLO el Orquestador tiene permitido crear nuevas tareas en los JSON de tareas (siempre con permiso explícito del humano). SOLO el agente `spec_partner` tiene permitido cambiar el estado de una tarea de `not_started` a `in_progress`.

## Pipeline de Desarrollo (El Flujo Bob)

Toda tarea listada en `meta_feature_list.json` o `conect4_feature_list.json` que deba ejecutarse desde este entorno, DEBE seguir este ciclo:
1. **Debate y Plan (spec_partner):** El agente primero debate y crea el documento de especificación (`meta-project-spec.md` o `conect4-project-spec.md`). **REGLA CRÍTICA:** Al seleccionar la tarea, el agente spec_partner DEBE cambiar su estado a `in_progress` en el JSON correspondiente para bloquear otras tareas (WIP=1).
2. **Destilación Gherkin (gherkin_author):** Se extraen escenarios de comportamiento en archivos `.feature` que se guardan en la carpeta `meta_harness/features/`.
3. **Puerta Humana Obligatoria:** El agente DEBE detener su ejecución y solicitar aprobación explícita de los escenarios antes de iniciar cualquier cambio estructural o de código.
4. **Desarrollo:** Tras la aprobación humana, el Agente delega la escritura del código invocando a la habilidad `generator_partner`. El agente principal asume el rol de Orquestador y no programa.
5. **Auditoría del Feature (feature_verifier):** Terminada la implementación, el Orquestador DEBE invocar a `feature_verifier`. Este agente audita al generador leyendo el archivo `.feature`, genera un checklist con Rúbrica, lo valida junto al humano, lo archiva en `verifications/history/` y cambia el estado de la tarea a `passing` en el JSON.
6. **Auditoría de Sesión y Handoff (session_verifier):** Antes de realizar el relevo o cerrar la sesión, el Orquestador DEBE invocar a `session_verifier`. Este agente será el único encargado de evaluar el `clean-state-checklist.md` punto por punto junto al humano (incluyendo la lectura obligatoria del reporte de limpieza `state/cleanup-report.md`) y, a la vez, el **único responsable de ir actualizando** todos los archivos de estado (`state/session_handoff.md`, `state/progress.md`, etc.) con la aprobación final.
