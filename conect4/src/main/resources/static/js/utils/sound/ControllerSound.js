import SoundEngine from './SoundEngine.js';


class SoundManager {
    static engine = new SoundEngine();

    static get isMuted() { return SoundManager.engine.isMuted; }
    static set isMuted(val) { SoundManager.engine.isMuted = val; }

    // Blip corto y agudo para navegar en el menú o mover sliders
    static playHover() { SoundManager.engine.playHover(); }
    
    // Tono más alto para seleccionar o confirmar
    static playSelect() { SoundManager.engine.playSelect(); }
    
    // Sonido de caída de la ficha (frecuencia que baja rápidamente)
    static playDrop() { SoundManager.engine.playDrop(); }
    
    // Error (frecuencia baja y rugosa) cuando tratas de poner ficha en columna llena
    static playError() { SoundManager.engine.playError(); }
    
    // Victoria (Dos tonos ascendentes alegres como un "Ta-da!")
    static playWin() { SoundManager.engine.playWin(); }
    
    // Empate (Tono triste descendente tipo Pac-man muriendo)
    static playDraw() { SoundManager.engine.playDraw(); }

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
                SoundManager.engine.unlockAudio();
                SoundManager.playSelect(); // Suena un "blip" para confirmar que ya hay audio
            }
        });

        // Desbloquear audio formalmente en la primera interacción real del usuario
        const unlockAudio = () => {
            SoundManager.engine.unlockAudio();
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
