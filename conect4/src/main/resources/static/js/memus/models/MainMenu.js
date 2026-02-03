import QuitMenu from "./generics/QuitMenu.js";
import Message from "../../Messages/Message.js";
import PlayOption from "./PlayOption.js";
import EditSettingsOption from "./EditSettingsOption.js";

class MainMenu extends QuitMenu {
    
    constructor() {
        super();
    }

    updateTitle() {
        this.title = Message.getInstance().getMessages("mainMenu").title;
    }

    addOptions() {
        super.addOptions();
        this.add(new PlayOption());
        this.add(new EditSettingsOption());
    }
}

export default MainMenu;
