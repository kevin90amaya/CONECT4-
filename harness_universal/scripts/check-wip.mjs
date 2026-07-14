import fs from 'fs';
import path from 'path';

const targetFeatureListPath = '/workspaces/CONECT4-/meta_harness/tareas/target_feature_list.json';

try {
  if (!fs.existsSync(targetFeatureListPath)) {
    console.error(`Error: El archivo ${targetFeatureListPath} no existe.`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(targetFeatureListPath, 'utf-8'));
  const features = data.features || [];

  const activeFeatures = features.filter(
    (f) => f.status === 'in_progress' || f.status === 'active'
  );

  if (activeFeatures.length > 1) {
    console.error('Error: Hay más de una tarea activa (WIP > 1):');
    activeFeatures.forEach((f) => {
      console.error(` - ID: ${f.id}, Status: ${f.status}`);
    });
    process.exit(1);
  }

  console.log(`Éxito: Validación WIP aprobada. Tareas activas en progreso: ${activeFeatures.length}`);
  if (activeFeatures.length === 1) {
    console.log(` - Tarea activa: ${activeFeatures[0].id}`);
  }
  process.exit(0);
} catch (error) {
  console.error('Error inesperado ejecutando check-wip.mjs:', error);
  process.exit(1);
}
