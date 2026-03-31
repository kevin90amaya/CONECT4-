import GameView from "../../../../../../main/resources/static/js/game/views/GameView.js";
import Message from "../../../../../../main/resources/static/js/Messages/Message.js";
import GameState from "../../../../../../main/resources/static/js/models/GameState.js";


jest.mock("../../../../../../main/resources/static/js/models/GameState.js", () => ({
    getNumberToWin: jest.fn()
}));

describe('GameView', () => {
    let gameView;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="game-container">
                <div class="game-title"><h1></h1></div>
            </div>
        `;
        
        Message.getInstance().setIdiomaEspañol();
        
        gameView = new GameView();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    describe('showTitle()', () => {
        test('debe mostrar el titulo con numberToWin 4 en español', () => {
            GameState.getNumberToWin.mockReturnValue(4);
            gameView.showTitle();
            expect(document.querySelector('.game-title h1').textContent).toBe('CONECTA 4');
        });

        test('debe mostrar el titulo con numberToWin 3 en español', () => {
            GameState.getNumberToWin.mockReturnValue(3);
            gameView.showTitle();
            expect(document.querySelector('.game-title h1').textContent).toBe('CONECTA 3');
        });

        test('debe mostrar el titulo con numberToWin 30 en español', () => {
            GameState.getNumberToWin.mockReturnValue(30);
            gameView.showTitle();
            expect(document.querySelector('.game-title h1').textContent).toBe('CONECTA 30');
        });

        test('debe mostrar el titulo con numberToWin 4 en inglés', () => {
            Message.getInstance().setIdiomaIngles();
            GameState.getNumberToWin.mockReturnValue(4);
            gameView.showTitle();
            expect(document.querySelector('.game-title h1').textContent).toBe('CONECT 4');
        });
    });
});
