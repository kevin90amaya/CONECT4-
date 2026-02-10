import BoardMenu from "../../../../../../../main/resources/static/js/memus/models/BoardMenu.js";
import MenuOfMenus from "../../../../../../../main/resources/static/js/memus/models/generics/MenuOfMenus.js";
import GoMenuOption from "../../../../../../../main/resources/static/js/memus/models/generics/GoMenuOption.js";
import ListMenus from "../../../../../../../main/resources/static/js/memus/models/generics/ListMenus.js";


describe('MenuOfMenus', () => {

    let listMenus;

    beforeEach(() => {
        listMenus = ListMenus.getInstance();
    });

    afterEach(() => {
        listMenus.listMenus = new Map();
    });
   
    test('el menu de menus debe tener las opcion de board', () => {
        const boardMenu = new BoardMenu();
        
        const menuOfMenus = new MenuOfMenus();
        menuOfMenus.addOptions();
        
        const options = menuOfMenus.getOptions();
        expect(options[0]).toBeInstanceOf(GoMenuOption);
        expect(options[0]).toHaveProperty('title');
        options[0].updateTitle();
        expect(options[0].title).toBe('Tablero'); 
        expect(options[1]).toBe(undefined);
        
    });

});