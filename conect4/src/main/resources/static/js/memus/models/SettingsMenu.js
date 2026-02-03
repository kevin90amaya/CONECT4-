import BackMenu from "./generics/BackMenu.js";
import Message from "../../Messages/Message.js";
import LanguageOption from "./LanguageOption.js";
import GameModeOption from "./GameModeOption.js";
import NumberOfPlayersOption from "./NumberOfPlayersOption.js";
import EditBoardOption from "./EditBoardOption.js";

class SettingsMenu extends BackMenu {
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("settingsMenu").title;
    }
    
    addOptions() {
        super.addOptions();
        this.add(new LanguageOption());
        this.add(new GameModeOption());
        this.add(new NumberOfPlayersOption());
        this.add(new EditBoardOption());
    }
}

export default SettingsMenu;