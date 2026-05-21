import ToggleButton from '../models/ToggleButton.js';
import ToggleButtonView from '../views/ToggleButtonView.js';

class ControllerToggleButton {
    constructor() {
        this.model = new ToggleButton();
        this.view = new ToggleButtonView();
    }
}
export default ControllerToggleButton;