import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";

class EditRowOption extends Option {
    
    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("BoardMenu").editRows;
    }
    
    execute() {
        
    }
}
export default EditRowOption;