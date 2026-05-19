import SoundView from "../../../../../../main/resources/static/js/utils/sound/SoundView.js";
import SoundEngine from "../../../../../../main/resources/static/js/utils/sound/SoundEngine.js";
import { zzfx } from "../../../../../../main/resources/static/js/utils/sound/ZzFX.js";


jest.mock("../../../../../../main/resources/static/js/utils/sound/ZzFX.js", () => ({
    zzfx: jest.fn()
}));

describe('SoundView (Vista)', () => {
    let view;
    let engine;

    beforeEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();

        view = new SoundView();
        
        engine = new SoundEngine();
        view.setModel(engine);
    });

    test('renderMuteButton() debe crear el botón en el DOM con estado inicial ON', () => {
        view.renderMuteButton();
        const btn = document.getElementById('mute-toggle');
        
        expect(btn).toBeTruthy();
        expect(btn.innerHTML).toBe('🔊 ON');
        expect(btn.tagName).toBe('BUTTON');
    });

    test('updateButtonState() debe lanzar error si el botón de mute no ha sido renderizado', () => {
        expect(() => view.updateButtonState(true))
            .toThrow("Precondición fallida: El botón de mute no ha sido renderizado en el DOM");
    });

    test('updateButtonState() debe cambiar el texto e ícono correctamente', () => {
        view.renderMuteButton();
        
        view.updateButtonState(true);
        const btn = document.getElementById('mute-toggle');
        expect(btn.innerHTML).toBe('🔇 OFF');

        view.updateButtonState(false);
        expect(btn.innerHTML).toBe('🔊 ON');
    });

    test('handleMuteClick() debe mutar el estado real del Engine y reproducir sonido solo si se desmutea', () => {
        view.renderMuteButton();
        const btn = document.getElementById('mute-toggle');

        expect(engine.getIsMuted()).toBe(false);
        btn.click();
        
        expect(engine.getIsMuted()).toBe(true);
        expect(zzfx).not.toHaveBeenCalled();

        btn.click();
        
        expect(engine.getIsMuted()).toBe(false);
        expect(zzfx).toHaveBeenCalledTimes(1);
    });
});