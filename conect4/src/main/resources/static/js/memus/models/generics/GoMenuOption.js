
import Option from "./Option.js";
import ListMenus from "./ListMenus.js";

class GoMenuOption extends Option {

    constructor(title) {
        super();
        this.title = title;
        this.listMenus = ListMenus.getInstance();
    }
    
    updateTitle() {
        this.title = this.title;
    }
    
    execute() {
        return this.listMenus.getMenu(this.title);
    }
    
}

export default GoMenuOption;