
import Option from "./Option.js";
import Message from "../../../Messages/Message.js";
import MenuOfMenus from "./MenuOfMenus.js";

class NavigatorOption extends Option {

    title;
    
    constructor() {
        super();
    }

    updateTitle() {
        this.title = Message.getInstance().getMessages("Common").navigation;
    }

    execute() {
        return new MenuOfMenus();
    }
    
}

export default NavigatorOption;