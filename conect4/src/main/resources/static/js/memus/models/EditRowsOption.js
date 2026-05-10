import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";

class EditRowOption extends Option {
    
    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("BoardMenu").rows;
    }
    
    execute() {
        return "edit-rows";
    }
}
export default EditRowOption;