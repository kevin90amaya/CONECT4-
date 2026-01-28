import controllerMenu from './memus/app.js';

class AppController {

    constructor() {
        this.controllerMenu = new controllerMenu();
    }
    initialize() {
        this.controllerMenu.initialize();
    }

}

export default AppController;