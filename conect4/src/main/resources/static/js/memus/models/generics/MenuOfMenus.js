
import Menu from "./Menu.js";
import ListMenus from "./ListMenus.js";
import Message from "../../../Messages/Message.js";
import GoMenuOption from "./GoMenuOption.js";

class MenuOfMenus extends Menu {

    listMenus;
    
    constructor() {
        super();
        this.listMenus = ListMenus.getInstance();
    }
    updateTitle() {
        this.title = Message.getInstance().getMessages("Common").menuOfMenus;
    }
    addOptions() {
        for (let name of this.listMenus.getMenuNames()) {
            this.add(new GoMenuOption(name));
        }
    }
}

export default MenuOfMenus;