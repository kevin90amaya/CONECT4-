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
            expect(document.getElementById('options').innerHTML).toContain('Editar Jugadores');
            expect(document.getElementById('options').innerHTML).toContain('Editar Tablero');
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

    describe('handleMenuOption', () => {

        test('handle menu', async () => {
            const spy = jest.spyOn(controllerMenu, 'handleNavigation').mockImplementation(() => {});
            const mockOption = { execute: () => new BoardMenu() };

            await controllerMenu.handleMenuOption(mockOption);

            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        test('change-lenguage-english',async () =>{

            const spy = jest.spyOn(controllerMenu, 'changeEnglish').mockImplementation(() => {});
    
             const mockOption = { execute: () => 'change-lenguage-english' };
    
            await controllerMenu.handleMenuOption(mockOption);
 
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });
        
        test('change-lenguage-spanish',async () =>{
            const spy = jest.spyOn(controllerMenu, 'changeSpanish').mockImplementation(() => {});
    
             const mockOption = { execute: () => 'change-lenguage-spanish' };
    
            await controllerMenu.handleMenuOption(mockOption);
 
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        test('start-game',async () =>{
            const spy = jest.spyOn(controllerMenu, 'startGame').mockImplementation(() => {});
    
             const mockOption = { execute: () => 'start-game' };
    
            await controllerMenu.handleMenuOption(mockOption);
 
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        test('edit-conect-to-win',async () =>{
            const spy = jest.spyOn(controllerMenu, 'editConectToWin').mockImplementation(() => {});
    
             const mockOption = { execute: () => 'edit-conect-to-win' };
    
            await controllerMenu.handleMenuOption(mockOption);
 
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });
        
        test('edit-rows',async() =>{
            const spy = jest.spyOn(controllerMenu, 'editRows').mockImplementation(() => {});
    
             const mockOption = { execute: () => 'edit-rows' };
    
            await controllerMenu.handleMenuOption(mockOption);
 
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        test('edit-columns',async() =>{
            const spy = jest.spyOn(controllerMenu, 'editColumns').mockImplementation(() => {});
    
             const mockOption = { execute: () => 'edit-columns' };
    
            await controllerMenu.handleMenuOption(mockOption);
 
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });


    });

    describe('handleEditConectToWin', () => {
        test('should send POST request and resolve when save event is dispatched', async () => {
        const newValue = 5;
            
        const handlePromise = controllerMenu.handleEditConectToWin();
 
        document.dispatchEvent(new CustomEvent('save-conect-to-win', { 
            detail: { value: newValue } 
        }));
 
        await handlePromise;
 
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/api/setting-menu/conect-to-win'),
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ value: newValue })
            })
        );

    });

    });

    describe('handleEditRows', () => {
        test('should send POST request and resolve when save event is dispatched', async () => {
            const newValue = 6;
            
            const handlePromise = controllerMenu.handleEditRows();
 
            document.dispatchEvent(new CustomEvent('save-rows', { 
                detail: { value: newValue } 
            }));
 
            await handlePromise;
 
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/setting-menu/rows'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({ value: newValue })
                })
            );
        });
    });

    describe('handleEditColumns', () => {
        test('should send POST request and resolve when save event is dispatched', async () => {
            const newValue = 7;
            
            const handlePromise = controllerMenu.handleEditColumns();
 
            document.dispatchEvent(new CustomEvent('save-columns', { 
                detail: { value: newValue } 
            }));
 
            await handlePromise;
 
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/setting-menu/columns'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({ value: newValue })
                })
            );
        });
    });

});