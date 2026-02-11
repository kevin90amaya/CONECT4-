import ControllerMenu from "../../../../../../main/resources/static/js/memus/controllers/ControllerMenu.js";

describe('ControllerMenu', () => {

    let controllerMenu;
    
    beforeEach(() => {
        controllerMenu = new ControllerMenu();
    });
    
    afterEach(() => {
        controllerMenu = null;
    });


    test('ControllerMenu existe', () => {
        expect(ControllerMenu).toBeDefined();
    });


});
