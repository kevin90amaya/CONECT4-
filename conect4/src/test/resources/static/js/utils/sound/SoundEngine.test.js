import SoundEngine from "../../../../../../main/resources/static/js/utils/sound/SoundEngine.js";
import { zzfx } from "../../../../../../main/resources/static/js/utils/sound/ZzFX.js";

jest.mock("../../../../../../main/resources/static/js/utils/sound/ZzFX.js", () => ({
    zzfx: jest.fn()
}));

describe('SoundEngine (Modelo)', () => {
    
    let engine;

    beforeEach(() => {
        engine = new SoundEngine();
        jest.clearAllMocks(); 
    });

    test('Debe inicializarse con los valores por defecto correctos', () => {
        expect(engine.isMuted).toBe(false);
        expect(engine.audioUnlocked).toBe(false);
        expect(engine.masterVolume).toBe(1.0);
    });

    test('toggleMute() debe alternar la propiedad isMuted', () => {

        engine.toggleMute();
        expect(engine.isMuted).toBe(true);

        engine.toggleMute();
        expect(engine.isMuted).toBe(false);
    });

    test('unlockAudio() debe cambiar el estado audioUnlocked a true', () => {
        expect(engine.audioUnlocked).toBe(false);
        
        engine.unlockAudio();
        
        expect(engine.audioUnlocked).toBe(true);
    });

    test('unlockAudio() debe intentar despertar el contexto de audio llamando a zzfx', () => {
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
            expect(zzfx).not.toHaveBeenCalled();
        });

        test('playHover() debe llamar a zzfx solo si el audio está desbloqueado', () => {
            engine.isMuted = false;
            engine.audioUnlocked = false;
            
            engine.playHover();
            expect(zzfx).not.toHaveBeenCalled();
        });
    });

});
