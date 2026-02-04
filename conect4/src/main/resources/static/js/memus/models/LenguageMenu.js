import BackMenu from "./generics/BackMenu.js";
import Message from "../../Messages/Message.js";
import InglesOption from "./InglesOption.js";
import EspañolOption from "./EspañolOption.js";

class LenguageMenu extends BackMenu {
    
    constructor() {
        super("MainMenu");
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("LenguageMenu").title;
    }
    
    addOptions() {
        super.addOptions();
        this.add(new InglesOption());
        this.add(new EspañolOption());
    }
}
export default LenguageMenu;