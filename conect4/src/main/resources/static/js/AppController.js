import controllerMenu from './memus/controllers/ControllerMenu.js';

class AppController {

    constructor() {
        this.controllerMenu = new controllerMenu();
    }
    initialize() {
        this.controllerMenu.initialize();
    }

}

export default AppController;