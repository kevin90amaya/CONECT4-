import ControllerMenu from "../../../../../../main/resources/static/js/memus/controllers/ControllerMenu.js";
import LenguageMenu from "../../../../../../main/resources/static/js/memus/models/LenguageMenu.js";
import SettingsMenu from "../../../../../../main/resources/static/js/memus/models/SettingsMenu.js";
import Message from "../../../../../../main/resources/static/js/Messages/Message.js";

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
            await new Promise(resolve => setTimeout(resolve, 500));
            
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