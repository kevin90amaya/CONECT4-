#!/usr/bin/env bash
set -e

# Asegurar que estamos en el directorio de meta_harness
cd "$(dirname "$0")"

echo "🔍 Iniciando validación mecánica de meta_harness..."

# 1. Validar que el JSON esté bien formado
if ! command -v jq &> /dev/null; then
    echo "⚠️  Advertencia: 'jq' no está instalado. Se omite validación profunda de JSON."
else
    echo "Verificando integridad de archivos JSON..."
    for json_file in tareas/meta_feature_list.json tareas/target_feature_list.json; do
        if jq empty "$json_file" 2>/dev/null; then
            echo "✅ $json_file es válido."
        else
            echo "❌ ERROR: $json_file tiene errores de sintaxis."
            exit 1
        fi
    done
fi

# 2. Verificar existencia de archivos obligatorios del Arnés
REQUIRED_FILES=("README.md" "state/progress.md" "state/session_handoff.md" "tareas/meta_feature_list.json" "tareas/target_feature_list.json" "agents/ORCHESTRATOR.md" "estructura/META_ARCHITECTURE.md" "estructura/META_PRODUCT.md" "docs/harness-engineering-manifesto.md")
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ ERROR: Falta el archivo estructural obligatorio: '$file'"
        exit 1
    fi
done

# 3. Validar Regla WIP=1
if [ -f "scripts/check-wip.sh" ]; then
    bash scripts/check-wip.sh
fi

echo "✅ Todos los chequeos pasaron. El meta_harness está en estado limpio."
exit 0
