#!/usr/bin/env bash

# check-wip.sh - Verifica que solo haya una tarea activa (WIP=1) en los arneses

set -euo pipefail

# Asegurarse de estar en el directorio correcto (raíz del meta_harness)
cd "$(dirname "$0")/.."

echo "=== Validación de Regla WIP=1 ==="

# Verificar si jq está instalado
if ! command -v jq &> /dev/null; then
    echo "ERROR: jq no está instalado. Se requiere jq para analizar los JSON."
    exit 1
fi

META_JSON="tareas/meta_feature_list.json"
CONECT4_JSON="tareas/conect4_feature_list.json"

# Verificar existencia de los archivos
if [[ ! -f "$META_JSON" ]]; then
    echo "ERROR: No se encuentra el archivo $META_JSON"
    exit 1
fi

if [[ ! -f "$CONECT4_JSON" ]]; then
    echo "ERROR: No se encuentra el archivo $CONECT4_JSON"
    exit 1
fi

# Extraer y validar
# jq -e asegura que devuelva error si el json es inválido
if ! meta_count=$(jq -e '[.features[] | select(.status == "in_progress" or .status == "active")] | length' "$META_JSON" 2>/dev/null); then
    echo "ERROR: $META_JSON no es un JSON válido o no se pudo leer."
    exit 1
fi

if ! conect4_count=$(jq -e '[.features[] | select(.status == "in_progress" or .status == "active")] | length' "$CONECT4_JSON" 2>/dev/null); then
    echo "ERROR: $CONECT4_JSON no es un JSON válido o no se pudo leer."
    exit 1
fi

total_active=$((meta_count + conect4_count))

if [[ "$total_active" -gt 1 ]]; then
    echo "FAIL: Se detectó una violación de la regla WIP=1."
    echo "Hay $total_active tareas activas en total ($meta_count en meta-harness, $conect4_count en conect4-harness)."
    echo "Debes tener como máximo 1 tarea activa ('in_progress' o 'active')."
    exit 1
elif [[ "$total_active" -eq 0 ]]; then
    echo "PASS: Cero tareas activas. El entorno está en estado de reposo (WIP=0)."
    exit 0
else
    echo "PASS: Validación exitosa. Exactamente 1 tarea activa."
    exit 0
fi
