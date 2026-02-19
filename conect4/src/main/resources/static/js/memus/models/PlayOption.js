import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";

class PlayOption extends Option {
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("MainMenu").play;
    }
 
    execute() {
        // Lógica para jugar
    }
}

export default PlayOption;