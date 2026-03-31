import ListMenus from "../../../../../../../main/resources/static/js/memus/models/generics/ListMenus.js";
import MainMenu from "../../../../../../../main/resources/static/js/memus/models/MainMenu.js";
import SettingsMenu from "../../../../../../../main/resources/static/js/memus/models/SettingsMenu.js";
import BoardMenu from "../../../../../../../main/resources/static/js/memus/models/BoardMenu.js";



describe('ListMenus', () => {

    let listMenus;

    beforeEach(() => {
        listMenus = ListMenus.getInstance();
    });

    afterEach(() => {
        listMenus.listMenus = new Map();
    });


    test('addMenu(name, menu)', () => {

        const mainmenu = new MainMenu();
        const settingsmenu = new SettingsMenu();

        listMenus.addMenu("MainMenu", mainmenu);
        listMenus.addMenu("SettingsMenu", settingsmenu);

        expect(listMenus.getMenu("MainMenu")).toBe(mainmenu);
        expect(listMenus.getMenu("SettingsMenu")).toBe(settingsmenu);
    })
    
    test('getMenuNames()', () => {
        
        const boardmenu = new BoardMenu();

        listMenus.addMenu("BoardMenu", boardmenu);

        expect(listMenus.getMenuNames()).not.toContain("MainMenu");
        expect(listMenus.getMenuNames()).not.toContain("SettingsMenu");
        expect(listMenus.getMenuNames()).toContain("BoardMenu");
    })


})
