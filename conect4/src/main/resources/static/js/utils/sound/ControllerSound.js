import SoundEngine from './SoundEngine.js';
import SoundView from './SoundView.js';


class ControllerSound {
    #soundEngine;
    #soundView;

    constructor() {
        this.#soundEngine = new SoundEngine();
        this.#soundView = new SoundView();
    }

    playHover() { this.#soundEngine.playHover(); }
    
    playSelect() { this.#soundEngine.playSelect(); }
    
    playDrop() { this.#soundEngine.playDrop(); }
    
    playError() { this.#soundEngine.playError(); }
    
    playWin() { this.#soundEngine.playWin(); }
    
    playDraw() { this.#soundEngine.playDraw(); }

    initialize() {
        
        this.#soundView.setModel(this.#soundEngine);
        this.#soundView.renderMuteButton();

        const unlockAudio = () => {
            this.#soundEngine.unlockAudio();
            ['click', 'touchstart', 'keydown'].forEach(e => document.removeEventListener(e, unlockAudio, true));
        };
        ['click', 'touchstart', 'keydown'].forEach(e => document.addEventListener(e, unlockAudio, true));

        this.#setupGlobalInteractions();
        this.#setupGameEvents();
    }

    #setupGlobalInteractions() {
        let lastHovered = null;

        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .option, select, input[type="text"]')) {
                this.playSelect();
            }
        });

        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('button, .option')) {
                if (lastHovered !== e.target) {
                    this.playHover();
                    lastHovered = e.target;
                }
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.matches('input[type="range"]')) {
                this.playHover();
            }
        });
    }

    #setupGameEvents() {
        document.addEventListener('game-drop', (e) => this.#handleGameEvent(e));
        document.addEventListener('game-win', (e) => this.#handleGameEvent(e));
        document.addEventListener('game-draw', (e) => this.#handleGameEvent(e));
        document.addEventListener('game-error', (e) => this.#handleGameEvent(e));
    }

    #handleGameEvent(event) {
        switch (event.type) {
            case 'game-drop': this.playDrop(); break;
            case 'game-win': this.playWin(); break;
            case 'game-draw': this.playDraw(); break;
            case 'game-error': this.playError(); break;
        }
    }
}

export default new ControllerSound();
