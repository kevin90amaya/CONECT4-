// Punto de entrada principal de la aplicación
import AppController from './js/AppController.js';
import ControllerSound from './js/utils/sound/ControllerSound.js';


// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const soundController = new ControllerSound();
    soundController.initialize();
    const app = new AppController();
    app.initialize();    
});