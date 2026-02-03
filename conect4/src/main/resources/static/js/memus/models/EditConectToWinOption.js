import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";

class EditConectToWinOption extends Option{
    
    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("gameModeMenu").editConectToWin;
    }
    
    execute() {
        
    }
}
export default EditConectToWinOption;