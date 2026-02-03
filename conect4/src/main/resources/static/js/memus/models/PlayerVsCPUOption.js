import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
class PlayerVsCPUOption extends Option{
    
    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("gameModeMenu").playerVsCPU;
    }
    
    execute() {
        
    }
}
export default PlayerVsCPUOption;