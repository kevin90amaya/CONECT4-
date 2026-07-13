import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function main() {
  const args = process.argv.slice(2);
  // Find project path argument (excluding flags)
  const nonFlagArgs = args.filter(arg => !arg.startsWith('-'));
  const targetPath = nonFlagArgs[0];

  if (!targetPath) {
    console.error('Error: Se requiere especificar la ruta del proyecto objetivo.');
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(process.cwd(), targetPath);

  // Check if project path exists and is accessible
  try {
    const stat = await fs.stat(resolvedProjectPath);
    if (!stat.isDirectory()) {
      console.error(`Error: La ruta del proyecto objetivo no es un directorio válido: ${resolvedProjectPath}`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`Error: La ruta del proyecto objetivo no existe o no es accesible: ${resolvedProjectPath}`);
    process.exit(1);
  }

  // Define target output locations
  const targetDir = '/workspaces/CONECT4-/harness_universal/direcciones';
  const parentDir = '/workspaces/CONECT4-/harness_universal';

  // Check write permissions in target locations BEFORE making changes (Scenario 6)
  try {
    if (existsSync(targetDir)) {
      await fs.access(targetDir, fs.constants.W_OK);
    } else {
      await fs.access(parentDir, fs.constants.W_OK);
    }
  } catch (err) {
    console.error(`Error: Falta de permisos de escritura en el directorio de destino: ${parentDir}. Detalle: ${err.message}`);
    process.exit(1);
  }

  // Hybrid Detection (Scenario 1 & 2)
  const hasPackageJson = existsSync(path.join(resolvedProjectPath, 'package.json'));
  const hasViteConfig = existsSync(path.join(resolvedProjectPath, 'vite.config.js'));
  const hasPomXml = existsSync(path.join(resolvedProjectPath, 'pom.xml'));

  let detectedStack = null;
  let commands = { build: '', test: '', lint: '', clean: '' };

  if (hasPackageJson && hasViteConfig) {
    detectedStack = 'Node.js y Vite';
    commands = {
      build: 'npm run build',
      test: 'npm test',
      lint: 'npm run lint',
      clean: 'npm run clean'
    };
  } else if (hasPomXml) {
    detectedStack = 'Java Maven';
    commands = {
      build: 'mvn compile',
      test: 'mvn test',
      lint: 'mvn checkstyle:check',
      clean: 'mvn clean'
    };
  }

  const autoConfirm = process.argv.includes('--yes') || process.argv.includes('-y') || process.env.AUTO_CONFIRM === 'true';

  let confirmed = false;
  let finalStack = detectedStack;
  let finalCommands = { ...commands };

  const rl = readline.createInterface({ input, output });

  try {
    if (detectedStack && !autoConfirm) {
      console.log(`Se ha detectado el stack tecnológico: ${detectedStack}`);
      console.log(`Ruta del proyecto: ${resolvedProjectPath}`);
      console.log('Comandos propuestos:');
      console.log(`  - build: ${commands.build}`);
      console.log(`  - test: ${commands.test}`);
      console.log(`  - lint: ${commands.lint}`);
      console.log(`  - clean: ${commands.clean}`);

      const answer = await rl.question('¿Desea confirmar esta configuración? (S/n): ');
      if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'si' || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes' || answer === '') {
        confirmed = true;
      }
    }

    if (autoConfirm) {
      if (detectedStack) {
        confirmed = true;
      } else {
        // In auto-confirm mode without a detected stack, use generic fallback values rather than hanging
        finalStack = 'Generic';
        finalCommands = {
          build: 'make build',
          test: 'make test',
          lint: 'make lint',
          clean: 'make clean'
        };
        confirmed = true;
      }
    }

    if (!confirmed) {
      // Enter interactive manual mode (Scenario 2)
      console.log('\n--- Modo interactivo asistido ---');
      finalStack = await rl.question('Ingrese el nombre del stack tecnológico (ej: Node.js y Vite): ');
      if (!finalStack) finalStack = 'Generic';

      finalCommands.build = await rl.question(`Ingrese el comando para 'build' [${finalCommands.build || 'make build'}]: `);
      if (!finalCommands.build) finalCommands.build = 'make build';

      finalCommands.test = await rl.question(`Ingrese el comando para 'test' [${finalCommands.test || 'make test'}]: `);
      if (!finalCommands.test) finalCommands.test = 'make test';

      finalCommands.lint = await rl.question(`Ingrese el comando para 'lint' [${finalCommands.lint || 'make lint'}]: `);
      if (!finalCommands.lint) finalCommands.lint = 'make lint';

      finalCommands.clean = await rl.question(`Ingrese el comando para 'clean' [${finalCommands.clean || 'make clean'}]: `);
      if (!finalCommands.clean) finalCommands.clean = 'make clean';
    }

    // Create directory and write paths.json (Scenario 3)
    if (!existsSync(targetDir)) {
      await fs.mkdir(targetDir, { recursive: true });
    }

    const pathsJsonPath = path.join(targetDir, 'paths.json');
    const outputData = {
      project_path: resolvedProjectPath,
      stack: finalStack,
      commands: finalCommands
    };

    await fs.writeFile(pathsJsonPath, JSON.stringify(outputData, null, 2), 'utf8');
    console.log(`\n¡Instalación completada exitosamente!`);
    console.log(`Archivo de configuración generado en: ${pathsJsonPath}`);
  } catch (err) {
    console.error(`Error durante la instalación: ${err.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
