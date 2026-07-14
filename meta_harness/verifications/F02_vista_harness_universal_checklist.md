# Checklist de Verificación - F02 Vista de Harness Universal (ViewHarness)

Este documento contiene la verificación de cumplimiento de la característica F02 de la meta-harness.

## Escenarios de Verificación

### 1. Renderizado de la interfaz premium con tema oscuro y navegación por pestañas
- [ ] La interfaz muestra una paleta de colores de tema oscuro (fondo oscuro y contrastes optimizados).
- [ ] La interfaz usa tipografías profesionales (como Outfit, Inter o Roboto).
- [ ] La navegación por pestañas está visible para alternar entre "Progreso" y "Diagramas".
- [ ] Al hacer clic en una pestaña se oculta el contenido de la otra pestaña y se muestra el de la seleccionada.
- [ ] El diseño se adapta correctamente a diferentes resoluciones de pantalla (responsivo).

### 2. Carga y parseo dinámico del progreso de ejecución
- [ ] Se parsea y renderiza dinámicamente el contenido de "progress.md" en el panel de Progreso.
- [ ] Se muestra de forma visual y gráfica la fase activa, el turno actual y el estado de WIP.

### 3. Carga e interacción del diagrama SVG de arquitectura
- [ ] El dashboard carga e incrusta de forma interactiva el archivo SVG.
- [ ] El usuario puede interactuar con el diagrama (zoom, desplazamiento o tooltips de los componentes si están definidos).

### 4. Modo de ejecución autónomo local
- [ ] La vista usa rutas relativas para cargar "progress.md" y "harnes_poo.svg".
- [ ] Funciona sin requerir un servidor web HTTP pesado (como Apache, Nginx o node-modules de desarrollo complejos).

### 5. Cumplimiento de Precondiciones del DbC
- [ ] El archivo `/workspaces/CONECT4-/harness_universal/state/progress.md` existe y es legible.
- [ ] El archivo de diseño `/workspaces/CONECT4-/harness_universal/diagrams/harnes_poo.plantuml` existe.

### 6. Cumplimiento de Poscondiciones del DbC
- [ ] Están creados los archivos `index.html`, `style.css` y `app.js` en `/workspaces/CONECT4-/harness_universal/viewharness/`.
- [ ] El archivo SVG `/workspaces/CONECT4-/harness_universal/diagrams/harnes_poo.svg` está generado a partir del PlantUML.
- [ ] El progreso y el diagrama son interactivos en el navegador.

### 7. Cumplimiento de Invariantes del DbC
- [ ] Ningún archivo del código fuente de producción del proyecto objetivo "conect4" ha sido modificado, eliminado o alterado.

## Evaluator Rubric

| Criterio | Puntuación (1-5) | Notas / Evidencia |
| :--- | :---: | :--- |
| **Funcionalidad** | - | - |
| **Respeto de Alcance de la característica** | - | - |
| **Calidad de Código** | - | - |

**Puntuación Total Estimada:** - / 15
