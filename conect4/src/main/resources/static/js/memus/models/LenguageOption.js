import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
import LenguageMenu from "./LenguageMenu.js";

class LenguageOption extends Option {
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("SettingsMenu").language;
    }
 
    execute() {
        return new LenguageMenu();
    }
}

export default LenguageOption;