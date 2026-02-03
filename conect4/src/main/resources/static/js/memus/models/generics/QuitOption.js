import Option from "./Option.js";
import Message from "../../../Messages/Message.js";
class QuitOption extends Option {

    title;
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("Common").exit;
    }
    
    execute() {
        console.log("Adios");
    }
    
}

export default QuitOption;