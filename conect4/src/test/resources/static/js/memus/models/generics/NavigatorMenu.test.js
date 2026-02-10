
import ListMenus from "../../../../../../../main/resources/static/js/memus/models/generics/ListMenus.js";
import SettingsMenu from "../../../../../../../main/resources/static/js/memus/models/SettingsMenu.js";


describe('navigator constructor', () => {

        let listMenus;

    beforeEach(() => {
        listMenus = ListMenus.getInstance();
    });

    afterEach(() => {
        listMenus.listMenus = new Map();
    });



    test('el menu que herede de NavigatorMenu debe guardarse en ListaMenus', () => {
        const settingsMenu = new SettingsMenu();
        const listMenus = ListMenus.getInstance();

        expect(listMenus.getMenu('SettingsMenu')).toBe(settingsMenu);
        expect(listMenus.getMenuNames()).toContain('SettingsMenu');
        expect(listMenus.listMenus.size).toBe(1);
    
    });

})