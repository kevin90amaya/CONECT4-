import SoundEngine from "../../../../../../main/resources/static/js/utils/sound/SoundEngine.js";
import { zzfx } from "../../../../../../main/resources/static/js/utils/sound/ZzFX.js";

// Interceptamos la librería externa para que no ejecute audio real, solo nos avise si fue llamada
jest.mock("../../../../../../main/resources/static/js/utils/sound/ZzFX.js", () => ({
    zzfx: jest.fn()
}));

describe('SoundEngine (Modelo)', () => {
    
    let engine;

    beforeEach(() => {
        engine = new SoundEngine();
        jest.clearAllMocks(); // Limpiamos el contador del espía antes de cada test
    });

    test('Debe inicializarse con los valores por defecto correctos', () => {
        expect(engine.isMuted).toBe(false);
        expect(engine.audioUnlocked).toBe(false);
        expect(engine.masterVolume).toBe(1.0);
    });

    test('toggleMute() debe alternar la propiedad isMuted', () => {
        // Primer llamado: debe mutear
        engine.toggleMute();
        expect(engine.isMuted).toBe(true);

        // Segundo llamado: debe desmutear
        engine.toggleMute();
        expect(engine.isMuted).toBe(false);
    });

    test('unlockAudio() debe cambiar el estado audioUnlocked a true', () => {
        expect(engine.audioUnlocked).toBe(false); // Estado inicial
        
        engine.unlockAudio();
        
        expect(engine.audioUnlocked).toBe(true); // Debe haber cambiado
    });

    test('unlockAudio() debe intentar despertar el contexto de audio llamando a zzfx', () => {
        // Esta prueba asegura que el método tiene la responsabilidad de activar el AudioContext.
        // La forma más simple y desacoplada de probarlo es verificar que invoca a la función zzfx.
        engine.unlockAudio();
        expect(zzfx).toHaveBeenCalled();
    });

    describe('Métodos de reproducción (play...)', () => {
        
        test('playDrop() debe llamar a zzfx si NO está muteado', () => {
            engine.isMuted = false;
            engine.playDrop();
            expect(zzfx).toHaveBeenCalled();
        });

        test('playDrop() NO debe llamar a zzfx si ESTÁ muteado', () => {
            engine.isMuted = true;
            engine.playDrop();
            expect(zzfx).not.toHaveBeenCalled(); // Aseguramos que la lógica de bloqueo funcione
        });

        test('playHover() debe llamar a zzfx solo si el audio está desbloqueado', () => {
            engine.isMuted = false;
            engine.audioUnlocked = false; // Estado inicial bloqueado
            
            engine.playHover();
            expect(zzfx).not.toHaveBeenCalled(); // No debe sonar hasta interactuar por primera vez
        });
    });

});
