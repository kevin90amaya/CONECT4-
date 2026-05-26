import BackMenu from "./generics/BackMenu.js";
import Message from "../../Messages/Message.js";
import LenguageOption from "./LenguageOption.js";
import EditPlayersOption from "./EditPlayersOption.js";
import EditBoardOption from "./EditBoardOption.js";
import ResetPlayersOption from "./ResetPlayersOption.js";

class SettingsMenu extends BackMenu {

    constructor() {
        super("MainMenu");
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("SettingsMenu").title;
    }
    
    addOptions() {
        super.addOptions();
        this.add(new LenguageOption());
        this.add(new EditPlayersOption());
        this.add(new ResetPlayersOption());
        this.add(new EditBoardOption());
    }
}

export default SettingsMenu;