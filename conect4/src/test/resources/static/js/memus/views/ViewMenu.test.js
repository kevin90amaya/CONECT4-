import ViewMenu from "../../../../../../main/resources/static/js/memus/views/ViewMenu.js";
import SettingsMenu from "../../../../../../main/resources/static/js/memus/models/SettingsMenu.js";
import ListMenus from "../../../../../../main/resources/static/js/memus/models/generics/ListMenus.js";



describe('ViewMenu', () => {

    let viewMenu;
    
    beforeEach(() => {
        document.body.innerHTML = '<div id="menu"></div>';
        viewMenu = new ViewMenu();
        const settingsMenu = new SettingsMenu();
        settingsMenu.addOptions(); 
        viewMenu.setMenu(settingsMenu);
    });

    afterEach(() => {
        document.body.innerHTML = '';
        const listMenus = ListMenus.getInstance();
        listMenus.listMenus = new Map();
    });


    test('showTitleMenu()', () => {
        viewMenu.showTitleMenu();

        const titleContainer = document.getElementById('titlemenu');
        expect(titleContainer).toBeTruthy();
        expect(titleContainer.tagName).toBe('DIV');
        expect(titleContainer.id).toBe('titlemenu');
    
        const titleElement = titleContainer.querySelector('h1');
        expect(titleElement).toBeTruthy();
    
        expect(titleElement.textContent).toBeTruthy();
        expect(titleElement.textContent).toBe('Configuracion');
    });

    test('showTitleOptions()', () => {
        viewMenu.showTitleOptions();
    
        const optionsContainer = document.getElementById('options');
        expect(optionsContainer).toBeTruthy();
        expect(optionsContainer.tagName).toBe('UL');
    
        const listItems = optionsContainer.querySelectorAll('li');
        expect(listItems.length).toBe(5);

        const buttons = optionsContainer.querySelectorAll('button.option');
        const titles = Array.from(buttons).map(button => button.textContent);
    
        expect(titles).toContain('Idioma');         
        expect(titles).toContain('Modo de Juego');    
        expect(titles).toContain('Numero de Jugadores'); 
        expect(titles).toContain('Editar Tablero');    
    });

    describe('ViewMenu - Verificación de DOM mockeado', () => {
        test('el DOM está mockeado correctamente', () => {
        // Verificar entorno jsdom
        expect(window.navigator.userAgent).toContain('jsdom');
        
        // Verificar que document es de JSDOM
        expect(document.constructor.name).toBe('Document');
        });

    });
    
});
