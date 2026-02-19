import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
import GameModeMenu from "./GameModeMenu.js";

class GameModeOption extends Option {
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("SettingsMenu").gameMode;
    }
 
    execute() {
        return new GameModeMenu();
    }
}

export default GameModeOption;