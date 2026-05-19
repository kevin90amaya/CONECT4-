import SoundEngine from './SoundEngine.js';
import { zzfx, zzfxX } from './ZzFX.js';


class SoundManager {
    static engine = new SoundEngine();

    static get audioUnlocked() { return SoundManager.engine.audioUnlocked; }
    static set audioUnlocked(val) { SoundManager.engine.audioUnlocked = val; }

    static get isMuted() { return SoundManager.engine.isMuted; }
    static set isMuted(val) { SoundManager.engine.isMuted = val; }

    // Blip corto y agudo para navegar en el menú o mover sliders
    static playHover() { if(SoundManager.audioUnlocked && !SoundManager.isMuted) zzfx(1, 0.05, 150, 0, 0, 0.05, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0); }
    
    // Tono más alto para seleccionar o confirmar
    static playSelect() { if(!SoundManager.isMuted) zzfx(1, 0.05, 400, 0.01, 0.01, 0.1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0); }
    
    // Sonido de caída de la ficha (frecuencia que baja rápidamente)
    static playDrop() { if(!SoundManager.isMuted) zzfx(1, 0.05, 300, 0.01, 0.05, 0.1, 0, 1, 0, 0, -200, 0, 0, 0, 0, 0, 0, 0.5, 0, 0); }
    
    // Error (frecuencia baja y rugosa) cuando tratas de poner ficha en columna llena
    static playError() { if(!SoundManager.isMuted) zzfx(1, 0.1, 100, 0.05, 0.1, 0.2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 0, 0); }
    
    // Victoria (Dos tonos ascendentes alegres como un "Ta-da!")
    static playWin() { 
        if(SoundManager.isMuted) return;
        zzfx(1, 0.1, 400, 0.05, 0.2, 0.5, 0, 1, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0.5, 0, 0); 
        setTimeout(() => zzfx(1, 0.1, 600, 0.05, 0.2, 0.8, 0, 1, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0.6, 0, 0), 150); 
    }
    
    // Empate (Tono triste descendente tipo Pac-man muriendo)
    static playDraw() { if(!SoundManager.isMuted) zzfx(1, 0.1, 200, 0.1, 0.4, 0.5, 0, 1, 0, 0, -100, 0, 0, 0, 0, 0, 0, 0.5, 0, 0); }

    // Inicializar escuchas globales del DOM
    static initDOMListeners() {
        // === CREAR BOTÓN DE MUTE GLOBAL ===
        const muteBtn = document.createElement('button');
        muteBtn.id = 'mute-toggle';
        muteBtn.innerHTML = '🔊 ON';
        muteBtn.style.position = 'fixed';
        muteBtn.style.top = '15px';
        muteBtn.style.right = '15px';
        muteBtn.style.zIndex = '9999';
        muteBtn.style.backgroundColor = '#111'; // Fondo oscuro retro
        document.body.appendChild(muteBtn);

        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitamos que otros eventos de clic interfieran
            SoundManager.isMuted = !SoundManager.isMuted;
            muteBtn.innerHTML = SoundManager.isMuted ? '🔇 OFF' : '🔊 ON';
            
            if (!SoundManager.isMuted) {
                SoundManager.audioUnlocked = true;
                // Forzamos explícitamente la creación y desbloqueo del AudioContext 
                // desde una interacción directa de botón (100% garantizado en todo navegador).
                if (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
                    if(!zzfxX) zzfxX = new (window.AudioContext || window.webkitAudioContext)();
                    if(zzfxX.state === 'suspended') zzfxX.resume();
                }
                SoundManager.playSelect(); // Suena un "blip" para confirmar que ya hay audio
            }
        });

        // Desbloquear audio formalmente en la primera interacción real del usuario
        const unlockAudio = () => {
            SoundManager.audioUnlocked = true;
            if (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
                if(!zzfxX) zzfxX = new (window.AudioContext || window.webkitAudioContext)();
                if(zzfxX.state === 'suspended') { const r = zzfxX.resume(); if (r) r.catch(() => {}); }
                
                // Truco para forzar el desbloqueo en navegadores estrictos (Edge/Safari)
                const buffer = zzfxX.createBuffer(1, 1, 22050);
                const source = zzfxX.createBufferSource();
                source.buffer = buffer;
                source.connect(zzfxX.destination);
                if (source.start) source.start(0);
            }
            ['click', 'touchstart', 'keydown'].forEach(e => document.removeEventListener(e, unlockAudio, true));
        };
        ['click', 'touchstart', 'keydown'].forEach(e => document.addEventListener(e, unlockAudio, true));

        let lastHovered = null;

        // Escuchar todos los clics en la aplicación
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .option, select, input[type="text"]')) {
                this.playSelect();
            }
        });

        // Escuchar cuando el ratón pasa por encima de elementos interactivos
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('button, .option')) {
                if (lastHovered !== e.target) {
                    this.playHover();
                    lastHovered = e.target;
                }
            }
        });

        // Escuchar cuando se mueven las barras de rango (sliders)
        document.addEventListener('input', (e) => {
            if (e.target.matches('input[type="range"]')) {
                this.playHover();
            }
        });

        // Escuchar eventos globales del juego
        document.addEventListener('game-drop', () => this.playDrop());
        document.addEventListener('game-win', () => this.playWin());
        document.addEventListener('game-draw', () => this.playDraw());
        document.addEventListener('game-error', () => this.playError());
    }
}

export default SoundManager;
