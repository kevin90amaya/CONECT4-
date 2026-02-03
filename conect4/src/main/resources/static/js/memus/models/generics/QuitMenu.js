import NavigatorMenu from "./NavigatorMenu.js";
import QuitOption from "./QuitOption.js";
class QuitMenu extends NavigatorMenu {
    
    #quitOption;

    constructor() {
        super();
        this.quitOption = new QuitOption();
    }

    addOptions() {
        super.addOptions();
       // this.addLast(this.quitOption);
    }

    addLast() {
        this.options.push(this.quitOption);
    }

    
}

export default QuitMenu;