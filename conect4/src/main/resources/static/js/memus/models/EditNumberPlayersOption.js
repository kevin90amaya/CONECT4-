import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
class EditNumberPlayersOption extends Option{
    
    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("gameModeMenu").editNumberPlayers;
    }
    
    execute() {
        
    }
}
export default EditNumberPlayersOption; 