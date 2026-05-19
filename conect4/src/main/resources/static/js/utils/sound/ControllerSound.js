// ZzFX - Zuper Zmall Zound Zynth - Micro Edition
// MIT License - Copyright 2019 Frank Force

let zzfxX;
const zzfxV = 1.0; // Volumen maestro

const zzfx = (p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0)=>{
    // Protección para que Jest (entorno de pruebas) no falle al carecer de AudioContext
    if (typeof window === 'undefined' || (!window.AudioContext && !window.webkitAudioContext)) return;
    
    if(!zzfxX) zzfxX = new (window.AudioContext || window.webkitAudioContext)();
    if(zzfxX.state === 'suspended') { const r = zzfxX.resume(); if (r) r.catch(() => {}); }
    let M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g=0,H=0,a=0,n=1,I=0,J=0,f=0,x,h;e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1),-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:-1)*M.abs(f)**D*p*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/2+(c>a?0:(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin(a)+1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n=n||1);p=zzfxX.createBuffer(1,h,R);p.getChannelData(0).set(k);b=zzfxX.createBufferSource();b.buffer=p;b.connect(zzfxX.destination);b.start();return b
};

class ControllerSound {
    #soundEngine;
    #soundView;

    constructor() {
        this.#soundEngine = new SoundEngine();
        this.#soundView = new SoundView();
    }

    initialize() {
    }

    setupGlobalInteractions() {
    }

    handleGlobalInteraction(event) {
    }

    setupGameEvents() {
    }

    handleGameEvent(event) {
    }

}

class SoundManager {
    static audioUnlocked = false;
    static isMuted = false;

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
