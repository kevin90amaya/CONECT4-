import SoundEngine from "../../../../../../main/resources/static/js/utils/sound/SoundEngine.js";

describe('SoundEngine (Modelo)', () => {
    
    let engine;

    beforeEach(() => {
        engine = new SoundEngine();
    });

    test('Debe inicializarse con los valores por defecto correctos', () => {
        expect(engine.isMuted).toBe(false);
        expect(engine.audioUnlocked).toBe(false);
        expect(engine.masterVolume).toBe(1.0);
    });

    test('toggleMute() debe alternar la propiedad isMuted y retornar el nuevo estado', () => {
        // Primer llamado: debe mutear
        let newState = engine.toggleMute();
        expect(engine.isMuted).toBe(true);
        expect(newState).toBe(true);

        // Segundo llamado: debe desmutear
        newState = engine.toggleMute();
        expect(engine.isMuted).toBe(false);
        expect(newState).toBe(false);
    });

    test('unlockAudio() debe cambiar el estado audioUnlocked a true', () => {
        expect(engine.audioUnlocked).toBe(false); // Estado inicial
        
        engine.unlockAudio();
        
        expect(engine.audioUnlocked).toBe(true); // Debe haber cambiado
    });

});
