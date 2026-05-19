import SoundView from "../../../../../../main/resources/static/js/utils/sound/SoundView.js";
import SoundEngine from "../../../../../../main/resources/static/js/utils/sound/SoundEngine.js";
import { zzfx } from "../../../../../../main/resources/static/js/utils/sound/ZzFX.js";

// Mockeamos únicamente la librería externa de sonido
jest.mock("../../../../../../main/resources/static/js/utils/sound/ZzFX.js", () => ({
    zzfx: jest.fn()
}));

describe('SoundView (Vista)', () => {
    let view;
    let engine;

    beforeEach(() => {
        document.body.innerHTML = ''; // Limpiar el DOM
        jest.clearAllMocks(); // Limpiar llamadas previas a zzfx

        view = new SoundView();
        
        // Usamos el Modelo REAL, aprovechando que ya está testeado y es seguro
        engine = new SoundEngine();
        view.setModel(engine);
    });

    test('renderMuteButton() debe crear el botón en el DOM con estado inicial ON', () => {
        view.renderMuteButton();
        const btn = document.getElementById('mute-toggle');
        
        expect(btn).toBeTruthy(); // El botón debe existir en el DOM
        expect(btn.innerHTML).toBe('🔊 ON');
        expect(btn.tagName).toBe('BUTTON');
    });

    test('updateButtonState() debe lanzar error si el botón de mute no ha sido renderizado', () => {
        // Intentamos actualizar el botón SIN haber llamado a renderMuteButton() primero
        expect(() => view.updateButtonState(true))
            .toThrow("Precondición fallida: El botón de mute no ha sido renderizado en el DOM");
    });

    test('updateButtonState() debe cambiar el texto e ícono correctamente', () => {
        view.renderMuteButton();
        
        view.updateButtonState(true); // Le decimos a la vista que ahora está muteado
        const btn = document.getElementById('mute-toggle');
        expect(btn.innerHTML).toBe('🔇 OFF');

        view.updateButtonState(false); // Le decimos a la vista que se quitó el mute
        expect(btn.innerHTML).toBe('🔊 ON');
    });

    test('handleMuteClick() debe mutar el estado real del Engine y reproducir sonido solo si se desmutea', () => {
        view.renderMuteButton();
        const btn = document.getElementById('mute-toggle');

        // Simulamos el primer clic (Para Mutear)
        btn.click();
        
        expect(engine.getIsMuted()).toBe(true); // Verificamos el estado real del motor
        expect(zzfx).not.toHaveBeenCalled(); // La librería externa no debe ser llamada

        // Simulamos el segundo clic (Para Desmutear)
        btn.click();
        
        expect(engine.getIsMuted()).toBe(false); // Verificamos que volvió a su estado inicial
        expect(zzfx).toHaveBeenCalledTimes(1); // Sí debe intentar sonar llamando a zzfx directamente
    });
});