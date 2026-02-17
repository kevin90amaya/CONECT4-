import NavigatorMenu from "./NavigatorMenu.js";
import BackOption from "./BackOption.js";

class BackMenu extends NavigatorMenu {

    previousMenu;
    backOption;
    
    constructor(previousMenu) {
        super();
        this.previousMenu = previousMenu;
        this.backOption = new BackOption(this.previousMenu);
    }

    addOptions() {
        super.addOptions();
    }
    
    addLast() {
        this.options.push(this.backOption);
    }
}

export default BackMenu;
