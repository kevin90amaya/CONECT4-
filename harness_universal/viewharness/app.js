import { ProgressModel } from './models/ProgressModel.js';
import { DiagramModel } from './models/DiagramModel.js';
import { TasksModel } from './models/TasksModel.js';
import { HarnessView } from './views/HarnessView.js';
import { HarnessController } from './controllers/HarnessController.js';

document.addEventListener('DOMContentLoaded', () => {
    // Instanciar componentes del MVC
    const progressModel = new ProgressModel();
    const diagramModel = new DiagramModel();
    const tasksModel = new TasksModel();
    const view = new HarnessView();
    
    const controller = new HarnessController(progressModel, diagramModel, tasksModel, view);
    
    // Inicializar el controlador
    controller.init();
});
