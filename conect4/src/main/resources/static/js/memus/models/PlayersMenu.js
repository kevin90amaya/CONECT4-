import BackMenu from "./generics/BackMenu.js";
import Message from "../../Messages/Message.js";
import EditNumberPlayersOption from "./EditNumberPlayersOption.js";
import EditPlayersOption from "./EditPlayersOption.js";
class PlayersMenu extends BackMenu {
    constructor() {
        super("SettingsMenu");
    }

    updateTitle() {
        this.title = Message.getInstance().getMessages("PlayersMenu").title;
    }

    addOptions() {
        super.addOptions();
        this.add(new EditNumberPlayersOption());
        this.add(new EditPlayersOption());
    }
}
export default PlayersMenu;