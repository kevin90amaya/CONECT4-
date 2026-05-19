import ControllerSound from "../../../../../../main/resources/static/js/utils/sound/ControllerSound.js";

describe('ControllerSound', () => {

    let controllerSound;

    beforeEach(() => {
        document.body.innerHTML = '';
    
        jest.restoreAllMocks();
        controllerSound = new ControllerSound();
    });

    describe('initialization', () => {
        
        test('debe crear el botón de mute y agregarlo al body', () => {
            controllerSound.initialize();
            
            const muteBtn = document.getElementById('mute-toggle');
            expect(muteBtn).toBeTruthy();
            expect(muteBtn.tagName).toBe('BUTTON');
            expect(muteBtn.innerHTML).toBe('🔊 ON');
        });

        test('debe escuchar y reaccionar a los eventos específicos del tablero de juego', () => {

            const playDropSpy = jest.spyOn(controllerSound, 'playDrop').mockImplementation(() => {});
            const playWinSpy = jest.spyOn(controllerSound, 'playWin').mockImplementation(() => {});
            const playDrawSpy = jest.spyOn(controllerSound, 'playDraw').mockImplementation(() => {});
            const playErrorSpy = jest.spyOn(controllerSound, 'playError').mockImplementation(() => {});

            controllerSound.initialize();

            document.dispatchEvent(new CustomEvent('game-drop'));
            expect(playDropSpy).toHaveBeenCalled();

            document.dispatchEvent(new CustomEvent('game-win'));
            expect(playWinSpy).toHaveBeenCalled();

            document.dispatchEvent(new CustomEvent('game-draw'));
            expect(playDrawSpy).toHaveBeenCalled();

            document.dispatchEvent(new CustomEvent('game-error'));
            expect(playErrorSpy).toHaveBeenCalled();
        });

        test('debe escuchar y reaccionar a las interacciones globales de la UI (click, hover, input)', () => {
            const playSelectSpy = jest.spyOn(controllerSound, 'playSelect').mockImplementation(() => {});
            const playHoverSpy = jest.spyOn(controllerSound, 'playHover').mockImplementation(() => {});

            controllerSound.initialize();

            const button1 = document.createElement('button');
            const button2 = document.createElement('button');
            const rangeInput = document.createElement('input');
            rangeInput.type = 'range';
            
            document.body.appendChild(button1);
            document.body.appendChild(button2);
            document.body.appendChild(rangeInput);

            button1.click();
            expect(playSelectSpy).toHaveBeenCalledTimes(1);

            button1.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            expect(playHoverSpy).toHaveBeenCalledTimes(1);

            button1.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            expect(playHoverSpy).toHaveBeenCalledTimes(1);

            button2.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            expect(playHoverSpy).toHaveBeenCalledTimes(2);

            rangeInput.dispatchEvent(new Event('input', { bubbles: true }));
            expect(playHoverSpy).toHaveBeenCalledTimes(3);
        });
    });

});