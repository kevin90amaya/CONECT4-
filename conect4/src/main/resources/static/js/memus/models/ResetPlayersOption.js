import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";


class ResetPlayersOption extends Option {
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("SettingsMenu").resetPlayers;
    }
    
    execute() {
        return "reset-players";
    }
}

export default ResetPlayersOption;
