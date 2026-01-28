// Punto de entrada principal de la aplicación
import AppController from './js/AppController.js';


// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const app = new AppController();
    app.initialize();    
});