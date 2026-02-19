import Option from "./generics/Option.js";
import Message from "../../Messages/Message.js";
class EspañolOption extends Option{
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("LenguageMenu").spanish;
    }
    
    execute() {
        return "change-lenguage-spanish";
    }

}
export default EspañolOption;