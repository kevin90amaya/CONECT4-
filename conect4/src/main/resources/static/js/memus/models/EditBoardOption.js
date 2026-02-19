import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
import BoardMenu from "./BoardMenu.js";

class EditBoardOption extends Option {
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("SettingsMenu").editBoard;
    }
 
    execute() {
        return new BoardMenu();
    }
}

export default EditBoardOption;