import Español from "./Español.js";
import Ingles from "./Ingles.js";
import assert from "assert";


class Message {

    idioma = "Español";
    static instance;

    constructor() {
        this.actualizarIdioma();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new Message();
        }
        return this.instance;
    }

    actualizarIdioma() {
        this.idioma = this.getIdioma() === "Ingles" ? new Ingles() : new Español();
    }
    
    setIdioma(idioma) {
        assert(idioma !== undefined);
        assert(idioma !== "Español" || idioma !== "Ingles");

        this.idioma = idioma;
    }

    getIdioma() {
        return this.idioma;
    }

    getMessages(menuType) {
        switch(menuType) {
            case "MainMenu":
                return this.idioma.getMainMenuMessages();
            case "SettingsMenu":
                return this.idioma.getSettingsMenuMessages();
            case "GameModeMenu":
                return this.idioma.getGameModeMenuMessages();
            case "LenguageMenu":
                return this.idioma.getLanguageMenuMessages();
            case "PlayersMenu":
                return this.idioma.getPlayersMenuMessages();
            case "Common":
                return this.idioma.getCommonMessages();
            case "BoardMenu":
                return this.idioma.getBoardMenuMessages();
            default:
                return {};
        }
    }
}

export default Message;