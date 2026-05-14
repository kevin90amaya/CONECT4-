import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
class EditPlayerOption extends Option{
    
    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("PlayersMenu").editPlayers;
    }
    
    execute() {
        return "edit-players";
    }
}
export default EditPlayerOption;