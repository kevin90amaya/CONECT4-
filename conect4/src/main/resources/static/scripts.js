// Punto de entrada principal de la aplicación
import AppController from './js/AppController.js';
import SoundManager from './js/utils/SoundManager.js';


// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    SoundManager.initDOMListeners();
    const app = new AppController();
    app.initialize();    
});