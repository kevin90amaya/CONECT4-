import ControllerMenu from "../../../../../../main/resources/static/js/memus/controllers/ControllerMenu.js";
import LenguageMenu from "../../../../../../main/resources/static/js/memus/models/LenguageMenu.js";
import SettingsMenu from "../../../../../../main/resources/static/js/memus/models/SettingsMenu.js";
import Message from "../../../../../../main/resources/static/js/Messages/Message.js";
import ViewMenu from "../../../../../../main/resources/static/js/memus/views/ViewMenu.js";

describe('ControllerMenu - Flujo completo con clases reales', () => {
    let controllerMenu;
    let originalIdioma;
    
    beforeAll(() => {
        // Guardar idioma original
        originalIdioma = Message.getInstance().getIdioma();
    });
    
    beforeEach(() => {
        // ✅ SOLO MOCK DEL DOM (clases reales)
        document.body.innerHTML = '<div id="menu"></div>';
        
        // ✅ RESTAURAR ESPAÑOL por defecto
        Message.getInstance().setIdiomaEspañol();
        
        // ✅ CLASES REALES
        controllerMenu = new ControllerMenu();
    });
    
    afterEach(() => {
        // ✅ LIMPIAR DOM y restaurar
        document.body.innerHTML = '';
        Message.getInstance().setIdiomaEspañol();
    });
    
    
    describe('Verificación de DOM mockeado', () => {
    test('ViewMenu usa DOM mockeado', () => {
        // ✅ Verificar que ViewMenu usa jsdom
        const viewMenu = new ViewMenu();
        
        // Verificar que el DOM es de JSDOM
        expect(window.navigator.userAgent).toContain('jsdom');
        expect(document.constructor.name).toBe('Document');
        
        // Verificar que ViewMenu encuentra el elemento mockeado
        expect(viewMenu.getMenuElement()).toBe(document.getElementById('menu'));
    });

    test('ControllerMenu usa DOM mockeado', () => {
        // ✅ Verificar que ControllerMenu usa jsdom
        const controllerMenu = new ControllerMenu();
        
        // Verificar que el DOM es de JSDOM
        expect(window.navigator.userAgent).toContain('jsdom');
        
        // Verificar que ViewMenu de Controller usa el mismo DOM
        expect(controllerMenu.viewMenu.getMenuElement()).toBe(document.getElementById('menu'));
    });

    test('Test usa DOM mockeado y todos comparten el mismo', () => {
        // ✅ Verificar que el test usa jsdom
        expect(window.navigator.userAgent).toContain('jsdom');
        expect(document.constructor.name).toBe('Document');
        
        // ✅ Crear elementos y verificar que todos los ven
        document.body.innerHTML = '<div id="menu"></div>';
        
        const viewMenu = new ViewMenu();
        const controllerMenu = new ControllerMenu();
        
        // Verificar que todos apuntan al mismo elemento
        const menuElement = document.getElementById('menu');
        expect(viewMenu.getMenuElement()).toBe(menuElement);
        expect(controllerMenu.viewMenu.getMenuElement()).toBe(menuElement);
        
        // Verificar que modificaciones en uno afectan a todos
        menuElement.innerHTML = '<p>Test</p>';
        expect(viewMenu.getMenuElement().innerHTML).toBe('<p>Test</p>');
        expect(controllerMenu.viewMenu.getMenuElement().innerHTML).toBe('<p>Test</p>');
    });
    });


    describe('Flujo: LenguageMenu → Cambiar a inglés', () => {


        test('opción English cambia idioma y recarga menú', async () => {
            // ✅ Crear LenguageMenu REAL
            const lenguageMenu = new LenguageMenu();
            lenguageMenu.addOptions();
            lenguageMenu.addLast();
            
            // ✅ Cargar menú en controller REAL
            controllerMenu.setMenu(lenguageMenu);
            controllerMenu.viewMenu.setMenu(lenguageMenu);
            controllerMenu.loadMenu();
            
            // ✅ Verificar menú en ESPAÑOL (por defecto)
            expect(document.querySelector('#titlemenu h1').textContent).toBe('Idiomas');
            
            // ✅ Encontrar botón "Ingles" REAL
            const englishButton = Array.from(document.querySelectorAll('button.option'))
                .find(button => button.textContent === 'Ingles');
            expect(englishButton).toBeTruthy();
            
            // ✅ ESPÍAR handleCommand para verificar
            const spyHandleCommand = jest.spyOn(controllerMenu, 'handleCommand');
            
            // ✅ SIMULAR CLIC REAL en botón "English"
            englishButton.click();
            
            // ✅ ESPERAR procesamiento asíncrono
            await new Promise(resolve => setTimeout(resolve, 10));
            
            // ✅ VERIFICAR flujo completo
            expect(spyHandleCommand).toHaveBeenCalledWith('change-lenguage-english');
            
            // ✅ Verificar que cambió a INGLÉS
            expect(document.querySelector('#titlemenu h1').textContent).toBe('Language');
            
            // ✅ Verificar opciones en INGLÉS
            const buttonsInEnglish = Array.from(document.querySelectorAll('button.option'))
                .map(button => button.textContent);
            expect(buttonsInEnglish).toContain('English');
            expect(buttonsInEnglish).toContain('Spanish');
            expect(buttonsInEnglish).toContain('Back');
            
            spyHandleCommand.mockRestore();
        });
    });

    describe('Flujo: LenguageMenu → Volver → SettingsMenu', () => {
        test('opción Back navega a SettingsMenu', async () => {
            // ✅ Crear LenguageMenu REAL
            const lenguageMenu = new LenguageMenu();
            lenguageMenu.addOptions();
            lenguageMenu.addLast();
            
            // ✅ Cargar menú en controller REAL
            controllerMenu.setMenu(lenguageMenu);
            controllerMenu.viewMenu.setMenu(lenguageMenu);
            controllerMenu.loadMenu();
            
            // ✅ Encontrar botón "Back" REAL
            const backButton = Array.from(document.querySelectorAll('button.option'))
                .find(button => button.textContent === 'Volver');
            expect(backButton).toBeTruthy();
            
            // ✅ ESPÍAR handleNavigation para verificar
            const spyHandleNavigation = jest.spyOn(controllerMenu, 'handleNavigation');
            
            // ✅ SIMULAR CLIC REAL en botón "Volver"
            backButton.click();
            
            // ✅ ESPERAR procesamiento asíncrono
            await new Promise(resolve => setTimeout(resolve, 10));
            
            // ✅ VERIFICAR flujo completo
            expect(spyHandleNavigation).toHaveBeenCalled();
            
            // ✅ Verificar que estamos en SettingsMenu
            expect(document.querySelector('#titlemenu h1').textContent).toBe('Settings');
            
            // ✅ Verificar opciones de SettingsMenu en ESPAÑOL
            const settingsButtons = Array.from(document.querySelectorAll('button.option'))
                .map(button => button.textContent);
            expect(settingsButtons).toContain('Idioma');
            expect(settingsButtons).toContain('Modo de Juego');
            expect(settingsButtons).toContain('Numero de Jugadores');
            expect(settingsButtons).toContain('Editar Tablero');
            
            spyHandleNavigation.mockRestore();
        });
    });

});