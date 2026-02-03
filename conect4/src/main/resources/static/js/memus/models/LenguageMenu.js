import BackMenu from "./generics/BackMenu";
import Message from "../../Messages/Message.js";
import InglesOption from "./InglesOption.js";
import EspañolOption from "./EspañolOption.js";

class LenguageMenu extends BackMenu {
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = Message.getInstance().getMessages("lenguageMenu").title;
    }
    
    addOptions() {
        super.addOptions();
        this.add(new InglesOption());
        this.add(new EspañolOption());
    }
}
export default LenguageMenu;