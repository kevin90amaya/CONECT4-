import PlayersMenu from "../../../../../../../main/resources/static/js/memus/models/PlayersMenu.js";
import ListMenus from "../../../../../../../main/resources/static/js/memus/models/generics/ListMenus.js";



describe('BackMenu', () => {
    
        let listMenus;

    beforeEach(() => {
        listMenus = ListMenus.getInstance();
    });

    afterEach(() => {
        listMenus.listMenus = new Map();
    });

    
    test('la clase que hereda de backmenu deve enviar su previusmenu al constructor de backmenu', () => {
        
        const playersMenu = new PlayersMenu();

        expect(playersMenu).toHaveProperty('previousMenu');
        expect(playersMenu.previousMenu).toBe('SettingsMenu');


    });


})