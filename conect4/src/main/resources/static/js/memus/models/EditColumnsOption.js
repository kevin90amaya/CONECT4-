import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
class EditColumnsOption extends Option{

    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("BoardMenu").columns;
    }
    
    execute() {
        return "edit-columns";
    }
}
export default EditColumnsOption;