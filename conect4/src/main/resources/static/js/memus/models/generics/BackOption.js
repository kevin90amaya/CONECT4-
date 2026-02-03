import Option from "./Option.js";
import ListMenus from "./ListMenus.js";
import Message from "../../../Messages/Message.js";

class BackOption extends Option {
    
    title;
    previousMenu;

    constructor(namePreviousMenu) {
        super();
        this.namePreviousMenu = namePreviousMenu;
        this.previousMenu = ListMenus.getInstance().getMenu(namePreviousMenu);
    }

    updateTitle() {
        this.title = Message.getInstance().getMessages("Common").back;
    }


    execute(){
        return this.previousMenu;
    }

}

export default BackOption;