import SoundEngine from './SoundEngine.js';
import SoundView from './SoundView.js';


class SoundManager {
    static engine = new SoundEngine();
    static view = new SoundView();

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
        // Conectar Modelo y Vista
        SoundManager.view.setModel(SoundManager.engine);
        SoundManager.view.renderMuteButton();

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
