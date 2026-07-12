# Checklist de Verificación - F11 (Escáner de Limpieza)

## Escenario 1: El escáner detecta basura y genera un reporte en modo Dry-Run
- [x] El script termina con un código de error explícito (exit 1).
- [x] El script NO elimina ningún archivo de forma automática.
- [x] Vuelca el resultado en el archivo de reporte físico `state/cleanup-report.md`.

## Escenario 2: El escáner confirma un estado limpio
- [x] El script termina con un código de éxito (0).
- [x] Actualiza el archivo de reporte indicando un estado limpio.

## Escenario 3: Bloqueo del relevo
- [x] El agente `session_verifier` se niega a marcar la casilla si hay basura (verificable en `clean-state-checklist.md`).

---

## Rúbrica de Evaluación (Evaluator Rubric)
| Dimensión | Puntuación (1-5) | Nota de Evaluación |
| :--- | :--- | :--- |
| **1. Funcionalidad** | 4 | Funciona bien pero con detalles menores. |
| **2. Respeto de Alcance** | 5 | Se respetó al 100%. Dry-Run estricto. |
| **3. Calidad de Código** | 4 | Código bueno, pero podría mejorar. |
