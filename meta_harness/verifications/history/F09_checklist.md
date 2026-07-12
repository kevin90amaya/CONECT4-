# Verification Checklist - F09 Validación Activa de Reglas (WIP=1)

## @s1: Exactamente una tarea activa
- [x] El script termina con exit code 0.
- [x] Imprime un mensaje de validación exitosa.

## @s2: Cero tareas activas
- [x] El script termina con exit code 0. (Validado en ejecución previa)
- [x] Imprime un mensaje indicando estado de reposo. (Validado en ejecución previa)

## @s3: Múltiples tareas activas
- [x] El script termina con exit code 1.
- [x] Imprime mensaje explicando violación de la regla WIP=1.

## @s4: JSON inválido
- [x] El script termina con exit code 1.
- [x] Imprime mensaje de error al leer el JSON.
