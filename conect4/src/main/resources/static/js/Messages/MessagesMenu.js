import Message from "./Message.js";
class MessagesMenu extends Message {
    getMessages(menuType) {
        switch (menuType) {
            case "MainMenu":
                return this.idioma.getMainMenuMessages();
            case "SettingsMenu":
                return this.idioma.getSettingsMenuMessages();
            case "GameModeMenu":
                return this.idioma.getGameModeMenuMessages();
            case "LanguageMenu":
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

    getMessagesForIngles(menuType) {
        return this.getMessages(menuType);
    }

    getMessagesForEspañol(menuType) {
        return this.getMessages(menuType);
    }
}

export default MessagesMenu;