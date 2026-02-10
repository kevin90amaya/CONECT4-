import ViewMenu from "../../../../../../../main/resources/static/js/memus/views/ViewMenu.js";
import SettingsMenu from "../../../../../../../main/resources/static/js/memus/models/SettingsMenu.js";



describe('ViewMenu', () => {

    beforeEach(() => {
        // Mock the DOM element
        document.body.innerHTML = '<div id="menu"></div>';
    });

    afterEach(() => {
        // Clean up
        document.body.innerHTML = '';
    });


    test('ViewMenu should be defined', () => {
        expect(ViewMenu).toBeDefined();
    });
});