import BackMenu from "./generics/BackMenu.js";
import Message from "../../Messages/Message.js";
import EditConectToWinOption from "./EditConectToWinOption.js";
import EditRowsOption from "./EditRowsOption.js";
import EditColumnsOption from "./EditColumnsOption.js";
class BoardMenu extends BackMenu {
    
    constructor() {
        super("SettingsMenu");
    }

    updateTitle() {
        this.title = Message.getInstance().getMessages("SettingsMenu").editBoard;
    }
    
    addOptions() {
        super.addOptions();
        this.add(new EditConectToWinOption());
        this.add(new EditRowsOption());
        this.add(new EditColumnsOption());
    }
}
export default BoardMenu;