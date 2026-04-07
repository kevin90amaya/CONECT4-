import PlayerView from "../../../../../../main/resources/static/js/players/views/PlayerView.js";

describe('PlayerView', () => {

    let playerView;
    
    beforeEach(() => {
        playerView = new PlayerView();
        const modes = [ "COMPUTER_VS_COMPUTER", "HUMAN_VS_COMPUTER", "HUMAN_VS_HUMAN" ];
        playerView.setGameMode(modes);
    });
    
    afterEach(() => {
        playerView = null;
    });

    test('showSelectMode()', () => {
        

    });
    
});