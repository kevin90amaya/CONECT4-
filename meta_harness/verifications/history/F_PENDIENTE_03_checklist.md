# Checklist de Verificación: F_PENDIENTE_03_verificacion_flujo_bob

## Escenario 1: Invocación y generación de plantilla
- [x] El agente lee los archivos `.feature` correspondientes.
- [x] El agente genera el archivo temporal `verification_checklist.md`.
- [x] El agente asiste al humano para validar cada punto manualmente.

## Escenario 2: Archivo del historial de auditoría
- [x] El archivo `verification_checklist.md` NO es eliminado tras terminar.
- [x] El archivo es movido a la ruta `meta_harness/verifications/history/`.
