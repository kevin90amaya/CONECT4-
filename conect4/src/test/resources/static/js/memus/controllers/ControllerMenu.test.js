import ControllerMenu from "../../../../../../main/resources/static/js/memus/controllers/ControllerMenu.js";

describe('ControllerMenu - Flujo completo con clases reales', () => {    

    beforeAll(() => {
        document.body.innerHTML = '<div id="menu"></div>';
        const controllerMenu = new ControllerMenu();
        controllerMenu.initialize();
    });
    

    describe('navegacion completa ', () => {
        test('MainMenu', () => {
            expect(document.getElementById('menu').innerHTML).toContain('Menu Principal');
            expect(document.getElementById('options').innerHTML).toContain('Navegar');
            expect(document.getElementById('options').innerHTML).toContain('Jugar');
            expect(document.getElementById('options').innerHTML).toContain('Editar Configuracion');
            expect(document.getElementById('options').innerHTML).toContain('Salir');

        });
        test('SettingsMenu', () => {
  
        });
        test('LanguageMenu', () => {

        });
        test('GameModeMenu', () => {

        });
        test('PlayersMenu', () => {

        })
        test('CreditsMenu', () => {

        })
        test('BoardMenu', () => {

        })

    });

    describe('handleCommand', () => {

        test('change-lenguage-english',() =>{

        });
        
        test('change-lenguage-spanish',() =>{

        });

        test('start-game',() =>{
            
        });
    })

});