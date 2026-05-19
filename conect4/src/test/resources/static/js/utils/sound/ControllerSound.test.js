import controllerSound from "../../../../../../main/resources/static/js/utils/sound/ControllerSound.js";

describe('ControllerSound', () => {

    beforeEach(() => {
        // Limpiar el DOM antes de cada test para evitar contaminación
        document.body.innerHTML = '';
        
        // Restaurar los estados iniciales de la clase estática
        controllerSound.isMuted = false;
        
        // Restaurar todos los mocks
        jest.restoreAllMocks();
    });

    describe('initialization', () => {
        
        test('debe crear el botón de mute y agregarlo al body', () => {
            controllerSound.initDOMListeners();
            
            const muteBtn = document.getElementById('mute-toggle');
            expect(muteBtn).toBeTruthy();
            expect(muteBtn.tagName).toBe('BUTTON');
            expect(muteBtn.innerHTML).toBe('🔊 ON');
            expect(muteBtn.style.position).toBe('fixed');
        });

        test('debe alternar el estado de mute y el texto al hacer clic en el botón', () => {
            controllerSound.initDOMListeners();
            const muteBtn = document.getElementById('mute-toggle');
            
            // Comprobar estado inicial
            expect(controllerSound.isMuted).toBe(false);
            
            // Primer clic: Poner en Mute
            muteBtn.click();
            expect(controllerSound.isMuted).toBe(true);
            expect(muteBtn.innerHTML).toBe('🔇 OFF');
            
            // Segundo clic: Quitar Mute
            // Aquí mockeamos playSelect para que no intente ejecutar el sonido en el test
            const playSelectSpy = jest.spyOn(controllerSound, 'playSelect').mockImplementation(() => {});
            
            muteBtn.click();
            expect(controllerSound.isMuted).toBe(false);
            expect(muteBtn.innerHTML).toBe('🔊 ON');
            expect(playSelectSpy).toHaveBeenCalled(); // Se debe llamar al sonido de confirmación
        });

        test('debe escuchar y reaccionar a los eventos globales del juego', () => {
            // Mockeamos los métodos de sonido para rastrear si se llaman, 
            // sin ejecutar el código interno del generador zzfx.
            const playDropSpy = jest.spyOn(controllerSound, 'playDrop').mockImplementation(() => {});
            const playWinSpy = jest.spyOn(controllerSound, 'playWin').mockImplementation(() => {});
            const playDrawSpy = jest.spyOn(controllerSound, 'playDraw').mockImplementation(() => {});
            const playErrorSpy = jest.spyOn(controllerSound, 'playError').mockImplementation(() => {});

            // Inicializamos los escuchadores
            controllerSound.initDOMListeners();

            // Disparamos los eventos tal y como lo hace ControllerGame
            document.dispatchEvent(new CustomEvent('game-drop'));
            expect(playDropSpy).toHaveBeenCalled();

            document.dispatchEvent(new CustomEvent('game-win'));
            expect(playWinSpy).toHaveBeenCalled();

            document.dispatchEvent(new CustomEvent('game-draw'));
            expect(playDrawSpy).toHaveBeenCalled();

            document.dispatchEvent(new CustomEvent('game-error'));
            expect(playErrorSpy).toHaveBeenCalled();
        });
    });

});