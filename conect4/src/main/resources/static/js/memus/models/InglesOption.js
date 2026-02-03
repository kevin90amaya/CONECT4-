import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
class InglesOption extends Option{
    
    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("lenguageMenu").english;
    }
    
    execute() {
        
    }
}
export default InglesOption;