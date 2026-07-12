#!/usr/bin/env bash
# cleanup-scanner.sh
# Detecta deuda técnica de IA y vuelca el resultado en un archivo físico.
# Utiliza rutas de búsqueda EXPLÍCITAS para evitar falsos positivos.
set -euo pipefail

# Aseguramos que estamos en el root del meta-harness
cd "$(dirname "$0")/.."

REPORT_FILE="state/cleanup-report.md"
mkdir -p state

echo "# Reporte de Escáner de Limpieza (Cleanup Scanner)" > "$REPORT_FILE"
echo "**Fecha:** $(date)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

ISSUE_COUNT=0

echo "## 1. TODOs y Marcadores Residuales" >> "$REPORT_FILE"
# Carpetas y archivos de código EXPLÍCITOS a auditar (ignora skills y plantillas)
TARGET_CODE=( "scripts/" "init_meta.sh" )
todos=$(grep -rnE "(TODO|FIXME)" "${TARGET_CODE[@]}" 2>/dev/null | grep -v "cleanup-scanner.sh" || true)
if [ -n "$todos" ]; then
    echo "Se encontraron marcadores residuales (TODO/FIXME) que deben resolverse:" >> "$REPORT_FILE"
    echo "\`\`\`text" >> "$REPORT_FILE"
    echo "$todos" >> "$REPORT_FILE"
    echo "\`\`\`" >> "$REPORT_FILE"
    ISSUE_COUNT=$((ISSUE_COUNT + 1))
else
    echo "✅ No se encontraron marcadores residuales en el código activo." >> "$REPORT_FILE"
fi
echo "" >> "$REPORT_FILE"

echo "## 2. Archivos Vacíos en Directorios Activos" >> "$REPORT_FILE"
# Carpetas de trabajo activo EXPLÍCITAS (donde operan los agentes)
TARGET_DOCS=( "state/" "specs/" "features/" "diagrams/" "tareas/" )
empty_files=$(find "${TARGET_DOCS[@]}" -type f -empty 2>/dev/null || true)
if [ -n "$empty_files" ]; then
    echo "Se encontraron archivos huérfanos o vacíos en directorios críticos:" >> "$REPORT_FILE"
    echo "\`\`\`text" >> "$REPORT_FILE"
    echo "$empty_files" >> "$REPORT_FILE"
    echo "\`\`\`" >> "$REPORT_FILE"
    ISSUE_COUNT=$((ISSUE_COUNT + 1))
else
    echo "✅ No hay archivos vacíos en los directorios de trabajo." >> "$REPORT_FILE"
fi
echo "" >> "$REPORT_FILE"

echo "## Resumen" >> "$REPORT_FILE"
if [ "$ISSUE_COUNT" -eq 0 ]; then
    echo "**Estado: LIMPIO (0 issues)**" >> "$REPORT_FILE"
    echo "[INFO] El escáner terminó exitosamente."
    exit 0
else
    echo "**Estado: SUCIO ($ISSUE_COUNT categorías con issues)**" >> "$REPORT_FILE"
    >&2 echo "🚨 ERROR: Se encontró basura de IA. Revisa el archivo $REPORT_FILE y límpialo antes de continuar."
    exit 1
fi
