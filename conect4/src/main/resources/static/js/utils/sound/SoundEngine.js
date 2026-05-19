// ZzFX - Zuper Zmall Zound Zynth - Micro Edition
// MIT License - Copyright 2019 Frank Force
import { zzfx } from './ZzFX.js';

class SoundEngine {
    constructor() {
        this.isMuted = false;
        this.audioUnlocked = false;
        this.masterVolume = 1.0;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
    }

    getIsMuted(){
        return this.isMuted
    }

    unlockAudio() {
        this.audioUnlocked = true;
    }

    playHover() { 
        if (this.isMuted || this.audioUnlocked === false) return;
        zzfx(1, 0.05, 150, 0, 0, 0.05, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0); 
    }

    playSelect() { 
        if (this.isMuted) return;
        zzfx(1, 0.05, 400, 0.01, 0.01, 0.1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0); 
    }

    playDrop() { 
        if (this.isMuted) return;
        zzfx(1, 0.05, 300, 0.01, 0.05, 0.1, 0, 1, 0, 0, -200, 0, 0, 0, 0, 0, 0, 0.5, 0, 0); 
    }

    playError() { 
        if (this.isMuted) return;
        zzfx(1, 0.1, 100, 0.05, 0.1, 0.2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 0, 0); 
    }

    playWin() { 
        if(this.isMuted) return;
        zzfx(1, 0.1, 400, 0.05, 0.2, 0.5, 0, 1, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0.5, 0, 0); 
        setTimeout(() => zzfx(1, 0.1, 600, 0.05, 0.2, 0.8, 0, 1, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0.6, 0, 0), 150); 
    }

    playDraw() { 
        if (this.isMuted) return;
        zzfx(1, 0.1, 200, 0.1, 0.4, 0.5, 0, 1, 0, 0, -100, 0, 0, 0, 0, 0, 0, 0.5, 0, 0); 
    }
}

export default SoundEngine;