import Option from "./generics/Option.js";
import Message from "../../Messages/Messages.js";
import SettingsMenu from "./SettingsMenu.js";

class EditSettingsOption extends Option {
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("mainMenu").editSettings;
    }
 
    execute() {
        return new SettingsMenu();
    }
}

export default EditSettingsOption;