# Product Description -- Meta Harness

## What Is This?

El **Meta Harness** es el enrutador central y la fuente de verdad del entorno de Pair Programming. Su propósito es mantener la continuidad entre sesiones y reinicios, dictando reglas estrictas para el agente de IA y delimitando el alcance (scope) del trabajo.

## Core Features

### Control de Sesión y Continuidad
- **Reinicio predecible:** Al iniciar, el agente debe leer los archivos clave para recuperar el contexto inmediatamente.
- **Handoff (Relevo):** Documenta qué se hizo, qué falta y los bloqueos a través de `session_handoff.md`.

### Control de Alcance (Scope Bounds)
- Define explícitamente las áreas de "Solo Lectura" (El Manifiesto) y las áreas de "Lectura y Escritura".
- **Objetivo Central:** La misión del `meta_harness` es mejorarse a sí mismo y diseñar/mejorar el `harness_universal`. La implementación del código de producción real (el código fuente objetivo) es responsabilidad y problema exclusivo del `harness_universal`, no de este meta-arnés.

### Ciclo de Especificación (El Flujo Bob)
- El `meta_harness` aplica sobre sí mismo la disciplina de especificación conversada (`meta-project-spec.md` / `target-project-spec.md` en `specs/`) y destilación Gherkin (`.feature` en `features/`) antes de realizar cambios estructurales, exigiendo siempre una puerta de aprobación humana.

### Seguimiento de Progreso
- Utiliza `meta_feature_list.json` y `target_feature_list.json` como las fuentes de la verdad para las tareas pendientes y activas, separadas por dominio.
- Utiliza `progress.md` como puntero de alto nivel para el estado general.
- Utiliza `pendings.md` para micro-ajustes o deuda técnica.

## Constraints
- **Cero ambigüedades:** Ningún documento puede tener opciones abiertas.
- **Consentimiento explícito:** El agente NUNCA debe modificar código sin explicar, ofrecer alternativas y pedir permiso.
- **Arreglar el arnés primero:** Ante cualquier error del arnés, se debe priorizar su arreglo sobre el código de producción.
