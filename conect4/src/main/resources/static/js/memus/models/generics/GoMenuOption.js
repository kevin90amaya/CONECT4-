
import Option from "./Option.js";
import ListMenus from "./ListMenus.js";
import Message from "../../../Messages/Message.js";

class GoMenuOption extends Option {

    constructor(title) {
        super();
       this.menuname = title;
        this.listMenus = ListMenus.getInstance();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages(this.menuname).title;
    }
    
    execute() {
        return this.listMenus.getMenu(this.menuname);
    }
    
}

export default GoMenuOption;