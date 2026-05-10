import ControllerMenu from "../../../../../../main/resources/static/js/memus/controllers/ControllerMenu.js";
import SettingsMenu from "../../../../../../main/resources/static/js/memus/models/SettingsMenu.js";
import BoardMenu from "../../../../../../main/resources/static/js/memus/models/BoardMenu.js";

jest.mock("../../../../../../main/resources/static/js/game/controllers/ControllerGame.js", () => {
    return jest.fn().mockImplementation(() => {
        return { initialize: jest.fn(),
                 playGames: jest.fn(() => Promise.resolve()),
                 getboard: jest.fn(() => Promise.resolve({
                     numberToWin: 4,
                     numberRows: 6,
                     numberColumns: 7,
                 }))
         };
    });
});

describe('ControllerMenu', () => {    
    let controllerMenu;

    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
        

        document.body.innerHTML = '<div id="menu"></div>';
        controllerMenu = new ControllerMenu();
    });
    
    afterEach(() => {
        document.body.innerHTML = '';
    });
    
    afterAll(() => {
        document.body.innerHTML = '';
    });

    describe('loadMenu', () => {
        test('load main menu', () => {
            controllerMenu.loadMenu();
            expect(document.getElementById('titlemenu').innerHTML).toContain('Menu Principal');
            expect(document.getElementById('options').innerHTML).toContain('Navegar');
            expect(document.getElementById('options').innerHTML).toContain('Jugar');
            expect(document.getElementById('options').innerHTML).toContain('Editar Configuracion');
            expect(document.getElementById('options').innerHTML).toContain('Salir');

        });

        test('load settings menu', () => {

            const settingsMenu = new SettingsMenu();
            controllerMenu.setMenu(settingsMenu);
            controllerMenu.viewMenu.setMenu(settingsMenu);

            controllerMenu.loadMenu();

            expect(document.getElementById('titlemenu').innerHTML).toContain('Configuracion');
            expect(document.getElementById('options').innerHTML).toContain('Idioma');
            expect(document.getElementById('options').innerHTML).toContain('Modo de Juego');
            expect(document.getElementById('options').innerHTML).toContain('Numero de Jugadores');
            expect(document.getElementById('options').innerHTML).toContain('Volver');
        });
    });

    describe('setupMenuEventHandlers', () => {
        test('should call handleMenuOption when menuOptionSelected event is dispatched', async () => {

            controllerMenu.setupMenuEventHandlers();

            const spy = jest.spyOn(controllerMenu, 'handleMenuOption')
                .mockImplementation(() => Promise.resolve());

            const mockOption = { execute: jest.fn() };

            document.dispatchEvent(new CustomEvent('menuOptionSelected', {
                detail: { option: mockOption }
            }));

            expect(spy).toHaveBeenCalledWith(mockOption);
            
            spy.mockRestore();
        });
    });

    describe('handleNavigation', () => {

        test('should navigate to board menu', () => {
            const boardMenu = new BoardMenu();
            controllerMenu.handleNavigation(boardMenu);
            
            expect(document.getElementById('titlemenu').innerHTML).toContain('Editar Tablero');
            expect(document.getElementById('options').innerHTML).toContain('Navegar');
            expect(document.getElementById('options').innerHTML).toContain('Editar Conecta para Ganar');
            expect(document.getElementById('options').innerHTML).toContain('Editar Filas');
            expect(document.getElementById('options').innerHTML).toContain('Editar Columnas');
            expect(document.getElementById('options').innerHTML).toContain('Volver');
        });
    });

    describe('handleCommand', () => {

        test('change-lenguage-english',() =>{

            const spy = jest.spyOn(controllerMenu, 'changeEnglish')

            controllerMenu.handleCommand('change-lenguage-english');

            expect(spy).toHaveBeenCalled();
        });
        
        test('change-lenguage-spanish',() =>{
            const spy = jest.spyOn(controllerMenu, 'changeSpanish')

            controllerMenu.handleCommand('change-lenguage-spanish');

            expect(spy).toHaveBeenCalled();
        });

        test('start-game',() =>{
            const spy = jest.spyOn(controllerMenu, 'startGame')

            controllerMenu.handleCommand('start-game');

            expect(spy).toHaveBeenCalled();
        });

        test('edit-conect-to-win',() =>{
            const spy = jest.spyOn(controllerMenu, 'editConectToWin')

            controllerMenu.handleCommand('edit-conect-to-win');

            expect(spy).toHaveBeenCalled();
        });
        
        test('edit-rows',() =>{
            const spy = jest.spyOn(controllerMenu, 'editRows')

            controllerMenu.handleCommand('edit-rows');

            expect(spy).toHaveBeenCalled();
        });

        test('edit-columns',() =>{
            const spy = jest.spyOn(controllerMenu, 'editColumns')

            controllerMenu.handleCommand('edit-columns');

            expect(spy).toHaveBeenCalled();
        });


    })

});