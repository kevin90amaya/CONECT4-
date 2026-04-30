import Español from "./Español.js";
import Ingles from "./Ingles.js";



class Message {

    idioma = new Español();

    static instance;

    constructor() {
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new Message();
        }
        return this.instance;
    }
    
    setIdiomaIngles() {
        this.idioma = new Ingles();
    }

    setIdiomaEspañol() {
        this.idioma = new Español();
    }

    getIdioma() {
        return this.idioma;
    }

    getMessages(tipemenu) {
        switch(tipemenu) {
            case "MainMenu":
                return this.getMainMenuMessages();
            case "SettingsMenu":
                return this.getSettingsMenuMessages();
            case "GameModeMenu":
                return this.getGameModeMenuMessages();
            case "BoardMenu":
                return this.getBoardMenuMessages();
            case "LenguageMenu":
                return this.getLanguageMenuMessages();
            case "PlayersMenu":
                return this.getPlayersMenuMessages();
            case "Common":
                return this.getCommonMessages();
            case "GameView":
                return this.getGameViewMessages();
            case "GAME_MODES":
                return this.getGameModesMessages();
            case "GAME_STATUS":
                return this.getGameStatusMessages();
            case "CONTINUE_DIALOG":
                return this.getContinueDialogMessages();
        }
    }
    
    getMessagesResumed() {
        return this.idioma.getMessagesResumed();
    }
    
    getMainMenuMessages() {
        return this.idioma.getMainMenuMessages();
    }
    
    getSettingsMenuMessages() {
        return this.idioma.getSettingsMenuMessages();
    }
    
    getGameModeMenuMessages() {
        return this.idioma.getGameModeMenuMessages();
    }

    getBoardMenuMessages() {
        return this.idioma.getBoardMenuMessages();
    }

    getLanguageMenuMessages() {
        return this.idioma.getLanguageMenuMessages();
    }

    getPlayersMenuMessages() {
        return this.idioma.getPlayersMenuMessages();
    }

    getCommonMessages() {
        return this.idioma.getCommonMessages();
    }
    
    getGameViewMessages() {
        return this.idioma.getGameViewMessages();
    }
    
    getGameModesMessages() {
        return this.idioma.getGameModesMessages();
    }
    
    getGameStatusMessages() {
        return this.idioma.getGameStatusMessages();
    }
    
    getGameModeName(mode) {
        return this.idioma.getGameModeName(mode);
    }
    
    getContinueDialogMessages() {
        return this.idioma.getContinueDialogMessages();
    }
}

export default Message;