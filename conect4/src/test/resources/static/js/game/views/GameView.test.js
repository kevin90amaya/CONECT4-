import GameView from "../../../../../../main/resources/static/js/game/views/GameView.js";


describe('GameView', () => {
    
    let gameView;
    
    beforeEach(() => {
        document.body.innerHTML = '<div class="game-container"></div>';
        gameView = new GameView();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        gameView = null;
    });


    describe('showTitle()', () => {

    test('deve mostrar el titulo con el numberToWin 4', () => {
        gameView.showTitle();
        expect(document.querySelector('.game-container .game-title h1').textContent).toBe('Conecta 4');
    });
    
    test('deve mostrar el titulo con el numberToWin 3', () => {
        gameView.showTitle();
        expect(document.querySelector('.game-container .game-title h1').textContent).toBe('Conecta 3');
    });
    
    test('deve mostrar el titulo con el numberToWin 30', () => {
        gameView.showTitle();
        expect(document.querySelector('.game-container .game-title h1').textContent).toBe('Conecta 30');
    });
    
    test('deve mostrar el titulo con el numberToWin 4 en ingles', () => {
        gameView.showTitle();
        expect(document.querySelector('.game-container .game-title h1').textContent).toBe('Connect 4');
    });

    });
});

