
import Menu from "./Menu.js";
import ListMenus from "./ListMenus.js";
import NavigatorOption from "./NavigatorOption.js";

class NavigatorMenu extends Menu {
    
    nameActualMenu;
    actualMenu;
    listMenus;
    navigatorOption;
    
    constructor() {
        super();
        this.updateTitle();
        this.nameActualMenu = this.getTitle();
        this.actualMenu = this.getMenu();
        this.listMenus = ListMenus.getInstance();
        this.listMenus.addMenu(this.nameActualMenu, this.actualMenu);
        this.navigatorOption = new NavigatorOption();
    }

    addOptions() {
        this.add(this.navigatorOption);
    }
    
}

export default NavigatorMenu;