import BackMenu from "./generics/BackMenu.js";
import Message from "../../Messages/Message.js";
import DemoOption from "./DemoOption.js";
import PlayerVsCPUOption from "./PlayerVsCPUOption.js";
import PlayerVsPlayerOption from "./PlayerVsPlayerOption.js";

class GameModeMenu extends BackMenu {
    constructor(){
        super("SettingsMenu");
    }

    updateTitle(){
        this.title = Message.getInstance().getMessages("GameModeMenu").title;
    }
    
    addOptions(){
        super.addOptions();
        this.add(new DemoOption());
        this.add(new PlayerVsCPUOption());
        this.add(new PlayerVsPlayerOption());
    }

}
export default GameModeMenu;