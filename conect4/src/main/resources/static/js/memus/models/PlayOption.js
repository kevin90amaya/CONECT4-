import Option from "./generics/Option.js";
import Message from "../../Messages/Messages.js";

class PlayOption extends Option {
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("mainMenu").play;
    }
 
    execute() {
        // Lógica para jugar
    }
}

export default PlayOption;