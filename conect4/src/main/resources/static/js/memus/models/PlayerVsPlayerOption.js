import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
class PlayerVsPlayerOption extends Option{
    
    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("GameModeMenu").playerVsPlayer;
    }
    
    execute() {
        
    }
}
export default PlayerVsPlayerOption;