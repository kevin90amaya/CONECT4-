import MainMenu from "../models/MainMenu.js";
import ViewMenu from "../views/ViewMenu.js";
import Menu from "../models/generics/Menu.js";


class ControllerMenu {

    #menu;
    #viewMenu;

    constructor() {
     this.#menu = new MainMenu();
     this.#viewMenu = new ViewMenu();
     this.#viewMenu.setMenu(this.#menu);
    }

     initialize() {
        this.loadMenu();
        this.setupMenuEventHandlers();
    }



    loadMenu() {
        this.#menu.removeOption();
        this.#menu.addOptions();
        this.#menu.addLast();
        this.#viewMenu.showMenu();
    }
    setupMenuEventHandlers() {
        document.addEventListener('menuOptionSelected', async (event) => {
            const { option } = event.detail;
            await this.handleMenuOption(option);
        });
    }


    
     async handleMenuOption(option) {
        try {
            const result = await option.execute();
            
            if (result instanceof Menu) {
                await this.handleNavigation(result);
            } else if (typeof result === 'string') {
                await this.handleCommand(result);
            }
            // Puedes añadir más condiciones según los tipos de resultado
        } catch (error) {
            console.error('Error al procesar la opción:', error);
        }
    }
    async handleNavigation(menu) {
        this.setMenu(menu);
        this.#viewMenu.setMenu(menu);
        this.loadMenu();
    }
    async handleCommand(command) {
        // Aquí manejas comandos específicos
        console.log('Ejecutando comando:', command);
        // Ejemplo: this[command]?.();
    }

    setMenu(menu) {
        this.#menu = menu;
    }
    

}

export default ControllerMenu;