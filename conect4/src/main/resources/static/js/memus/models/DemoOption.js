import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
class DemoOption extends Option{
    
    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("GameModeMenu").demo;
    }

    execute() {
        
    }
}
export default DemoOption;