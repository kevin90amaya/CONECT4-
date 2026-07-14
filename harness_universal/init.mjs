import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const pathsJsonPath = '/workspaces/CONECT4-/harness_universal/direcciones/paths.json';
const stateDirPath = '/workspaces/CONECT4-/harness_universal/state';
const progressMdPath = '/workspaces/CONECT4-/harness_universal/state/progress.md';
const agentInitMdPath = '/workspaces/CONECT4-/harness_universal/AGENTINIT.md';
const agentInitJsonPath = '/workspaces/CONECT4-/harness_universal/AGENTINIT.json';
const checkWipScriptPath = '/workspaces/CONECT4-/harness_universal/scripts/check-wip.mjs';

// 1. Validar que paths.json existe y es legible
if (!fs.existsSync(pathsJsonPath)) {
  console.error(`Error: El archivo ${pathsJsonPath} no existe.`);
  process.exit(1);
}

try {
  JSON.parse(fs.readFileSync(pathsJsonPath, 'utf-8'));
} catch (error) {
  console.error(`Error: El archivo ${pathsJsonPath} no contiene un JSON válido.`, error);
  process.exit(1);
}

// 2. Crear el directorio state/ si no existe
if (!fs.existsSync(stateDirPath)) {
  fs.mkdirSync(stateDirPath, { recursive: true });
  console.log(`Directorio creado: ${stateDirPath}`);
}

// 3. Inicializar progress.md si no existe
if (!fs.existsSync(progressMdPath)) {
  const defaultProgressContent = `# Registro de Progreso - Sesión Activa del Arnés Universal\n\nEste archivo sirve como puntero de contexto para la sesión de pair programming del arnés objetivo.\n\n## Estado\n* **Turno actual:** AGENTINIT\n* **WIP:** 1\n`;
  fs.writeFileSync(progressMdPath, defaultProgressContent, 'utf-8');
  console.log(`Archivo inicializado: ${progressMdPath}`);
}

// 4. Verificar que AGENTINIT.md y AGENTINIT.json existen
if (!fs.existsSync(agentInitMdPath)) {
  console.error(`Error: El archivo duo ${agentInitMdPath} no existe.`);
  process.exit(1);
}
if (!fs.existsSync(agentInitJsonPath)) {
  console.error(`Error: El archivo duo ${agentInitJsonPath} no existe.`);
  process.exit(1);
}

// 5. Ejecutar la validación de WIP llamando a check-wip.mjs
console.log(`Ejecutando validación de WIP con: node ${checkWipScriptPath}`);
const result = spawnSync('node', [checkWipScriptPath], { stdio: 'inherit' });

if (result.status !== 0) {
  console.error('Error: La validación de WIP falló.');
  process.exit(1);
}

console.log('Inicialización completada con éxito. Todos los criterios de poscondición se cumplen.');
process.exit(0);
