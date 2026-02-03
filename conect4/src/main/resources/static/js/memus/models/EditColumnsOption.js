import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
class EditColumnsOption extends Option{

    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("gameModeMenu").editColumns;
    }
    
    execute() {
        
    }
}
export default EditColumnsOption;