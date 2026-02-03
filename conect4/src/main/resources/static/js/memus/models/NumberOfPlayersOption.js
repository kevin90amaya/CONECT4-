import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
import PlayersMenu from "./PlayersMenu.js";

class NumberOfPlayersOption extends Option {
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("settingsMenu").numberOfPlayers;
    }
 
    execute() {
        return new PlayersMenu();
    }
}

export default NumberOfPlayersOption;  