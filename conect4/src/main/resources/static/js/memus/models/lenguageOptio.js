import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
import LanguageMenu from "./LanguageMenu.js";

class LanguageOption extends Option {
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("settingsMenu").language;
    }
 
    execute() {
        return new LanguageMenu();
    }
}

export default LanguageOption;