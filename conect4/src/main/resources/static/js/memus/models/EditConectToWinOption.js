import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";

class EditConectToWinOption extends Option{
    
    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("BoardMenu").conectToWin;
    }
    
    execute() {
        return "edit-conect-to-win";
    }
}
export default EditConectToWinOption;