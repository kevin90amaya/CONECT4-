# Verification Checklist - F10 Separación de Roles y Autoverificación

## Criterios de Aceptación (Escenarios Gherkin)
- [x] El archivo `ORCHESTRATOR.md` prohíbe al agente programar.
- [x] El Orquestador debe invocar a la habilidad `generator_partner` para implementar el código.
- [x] El `spec_partner` exige explícitamente secciones de "In Scope" y "Out of Scope".
- [x] El auditor genera un checklist basado en los escenarios Gherkin.
- [x] Se evalúa el trabajo usando una "Evaluator Rubric" de 1 a 5.
- [x] El auditor evalúa exclusivamente al generador y no audita el cierre de sesión.
- [x] El Orquestador debe invocar a `session_verifier`.
- [x] `session_verifier` audita mecánicamente el `clean-state-checklist.md`.
- [x] El proceso de cierre queda bloqueado hasta obtener aprobación humana explícita.

*(Auditoría Mecánica: Todos los puntos han sido verificados positivamente en el repositorio).*

## Evaluator Rubric

| Dimensión | Puntuación (1-5) | Notas del Evaluador / Humano |
| :--- | :---: | :--- |
| **1. Funcionalidad** | 5 | si en 4 roles |
| **2. Respeto de Alcance** | 5 | si |
| **3. Calidad de Código** | 4 | ya lo veremos |

**Ciclo de Revisión Actual:** Revision 2 (Re-evaluación post Gherkin)
**Puntuación Final:** 4.6 / 5 (APROBADO)
