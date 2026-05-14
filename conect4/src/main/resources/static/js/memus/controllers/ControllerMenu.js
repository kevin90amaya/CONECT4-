import MainMenu from "../models/MainMenu.js";
import ViewMenu from "../views/ViewMenu.js";
import Menu from "../models/generics/Menu.js";
import Message from "../../Messages/Message.js";
import ControllerGame from "../../game/controllers/ControllerGame.js";
import { ENDPOINTS } from "../../api/endpoints.js";




class ControllerMenu {

    #menu;
    viewMenu;
    #comands;

    constructor() {
     this.#menu = new MainMenu();
     this.viewMenu = new ViewMenu();
     this.viewMenu.setMenu(this.#menu);
     this.gameController = new ControllerGame();
     this.gameController.initialize();
     this.#comands = {
            "change-lenguage-english": () => this.changeEnglish(),
            "change-lenguage-spanish": () => this.changeSpanish(),
            "start-game": () => this.startGame(),
            "edit-conect-to-win": () => this.editConectToWin(),
            "edit-rows": () => this.editRows(),
            "edit-columns": () => this.editColumns(),
            "edit-players": () => this.editPlayers()
        };
     
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
                await this.#comands[result]();
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
    
    changeEnglish() {
        Message.getInstance().setIdiomaIngles();
        this.loadMenu();
    }
    
    changeSpanish() {
        Message.getInstance().setIdiomaEspañol();
        this.loadMenu();
    }
    
    async startGame() {
        this.viewMenu.cleanMenu();
        await this.gameController.playGames();
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
        return new Promise((resolve) => {
            const onSave = async (event) => {
                await fetch(`${ENDPOINTS.ROWS}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ value: event.detail.value })
                });
     
                document.removeEventListener('save-rows', onSave);
                resolve();
            };
            document.addEventListener('save-rows', onSave);
        });
    }

    async editColumns() {
        const board = await this.getboard();
        this.viewMenu.showEditColumns(board);
        await this.handleEditColumns();
        this.loadMenu();
    }
    
    async handleEditColumns() {
        return new Promise((resolve) => {
            const onSave = async (event) => {
                await fetch(`${ENDPOINTS.COLUMNS}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ value: event.detail.value })
                });
     
                document.removeEventListener('save-columns', onSave);
                resolve();
            };
            document.addEventListener('save-columns', onSave);
        });
    }

    async getListPlayers() {
        return await this.gameController.getListPlayers();
    }
    
    async getNumberOfPlayers() {
        return await this.gameController.getNumberOfPlayers();
    }
    
    async editPlayers() {
        const numberPlayers = await this.getNumberOfPlayers();
        const listPlayers = await this.getListPlayers();
        this.viewMenu.showEditPlayers(listPlayers, numberPlayers);
        await this.handleEditPlayers();
        this.loadMenu();
    }
    
    async handleEditPlayers() {
        return new Promise((resolve) => {
            const onSave = async (event) => {
                const { numberOfPlayers, playersList } = event.detail.value;

                try {
                    const resNumber = await fetch(`${ENDPOINTS.SET_NUMBER_OF_PLAYERS}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ value: numberOfPlayers })
                    });
                    if (!resNumber.ok) throw new Error("Fallo al actualizar el número de jugadores en el servidor.");

                    const resList = await fetch(`${ENDPOINTS.SET_LIST_PLAYERS}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(playersList)
                    });
                    if (!resList.ok) throw new Error("Fallo al actualizar la lista de jugadores en el servidor.");
                } catch (error) {
                    console.error("Error de sincronización con el servidor:", error);
                } finally {
                    document.removeEventListener('save-players', onSave);
                    resolve();
                }
            };
            document.addEventListener('save-players', onSave);
        });
    }

}

export default ControllerMenu;