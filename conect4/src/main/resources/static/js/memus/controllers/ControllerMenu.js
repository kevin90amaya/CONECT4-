import MainMenu from "../models/MainMenu.js";
import ViewMenu from "../views/ViewMenu.js";
import Menu from "../models/generics/Menu.js";
import Message from "../../Messages/Message.js";
import ControllerGame from "../../game/controllers/ControllerGame.js";
import { ENDPOINTS } from "../../api/endpoints.js";




class ControllerMenu {

    #menu;
    viewMenu;

    constructor() {
     this.#menu = new MainMenu();
     this.viewMenu = new ViewMenu();
     this.viewMenu.setMenu(this.#menu);
     this.gameController = new ControllerGame();
     this.gameController.initialize();
    }

     initialize() {
        this.loadMenu();
        this.setupMenuEventHandlers();
    }



    loadMenu() {
        this.#menu.removeOption();
        this.#menu.addOptions();
        this.#menu.addLast();
        this.viewMenu.showMenu();
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
            
        } catch (error) {
            console.error('Error al procesar la opción:', error);
        }
    }

    async handleNavigation(menu) {
        this.setMenu(menu);
        this.viewMenu.setMenu(menu);
        this.loadMenu();
    }

    async handleCommand(command) {
            switch(command) {
        case "change-lenguage-english":
            Message.getInstance().setIdiomaIngles();
            this.loadMenu();
            break;
        case "change-lenguage-spanish":
            Message.getInstance().setIdiomaEspañol();
            this.loadMenu();
            break;
        case "start-game":
            this.viewMenu.cleanMenu();
           await this.gameController.playGames();
            break;
        case "edit-conect-to-win":
            await this.editConectToWin();
            break;
        case "edit-rows":
            await this.editRows();
            break;
        case "edit-columns":
            await this.editColumns();
            break;
        }
    }

    setMenu(menu) {
        this.#menu = menu;
    }

    getMenu() {
        return this.#menu;
    }

    async getboard() {
        return await this.gameController.getboard();
    }
    

    async editConectToWin() {
        const board = await this.getboard();
        this.viewMenu.showEditConectToWin(board);
        await this.handleEditConectToWin();
        this.loadMenu();
    }

    async handleEditConectToWin() {
       return new Promise((resolve) => {
        const onSave = async (event) => {
            await fetch(`${ENDPOINTS.CONECT_TO_WIN}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: event.detail.value })
            });
 
            document.removeEventListener('save-conect-to-win', onSave);
            resolve();
        };
        document.addEventListener('save-conect-to-win', onSave);
    });
}

    async editRows() {
        const board = await this.getboard();
        this.viewMenu.showEditRows(board);
        await this.handleEditRows();
        this.loadMenu();
    }
    
    async handleEditRows() {
    }

    async editColumns() {
        const board = await this.getboard();
        this.viewMenu.showEditColumns(board);
        await this.handleEditColumns();
        this.loadMenu();
    }
    
    async handleEditColumns() {
    }

}

export default ControllerMenu;