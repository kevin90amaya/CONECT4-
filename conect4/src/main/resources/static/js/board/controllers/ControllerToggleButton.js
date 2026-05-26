import ToggleButtonView from "../views/ToggleButtonView.js";
import ToggleButton from "../ToggleButton.js";
import { ENDPOINTS } from "../../api/endpoints.js";

class ControllerToggleButton {
    constructor() {
        // Instanciamos el Modelo y la Vista reales de nuestro componente
        this.view = new ToggleButtonView();
        this.model = new ToggleButton();
    }

    initialize() {
        this.view.setModel(this.model);

        document.addEventListener('juego-comenzo', this.handleJuegoComenzo);
        document.addEventListener('resolvemode', this.handleResolveMode);
        
        document.addEventListener('board-autoscale', this.handleBoardAutoscale);
        document.addEventListener('board-reset-default', this.handleBoardReset);
        
    }
    
    render(){
        // El componente fabrica su vista (Lazy) y se auto-inyecta en el DOM
        const gameFrame = document.querySelector('.game-frame');
        if (gameFrame) {
            gameFrame.insertBefore(this.view.getElement(), gameFrame.firstChild);
        }
        
    }

    destroy() {
        // Desconectamos los eventos del DOM cuando el componente ya no se necesite
        document.removeEventListener('juego-comenzo', this.handleJuegoComenzo);
        document.removeEventListener('resolvemode', this.handleResolveMode);
        document.removeEventListener('board-autoscale', this.handleBoardAutoscale);
        document.removeEventListener('board-reset-default', this.handleBoardReset);
    }

    handleJuegoComenzo = (event) => {
        try {
            this.view.enableAutoScaleToggle();
        } catch(e) { } // Silenciamos si ya estaba habilitado
    }

    handleResolveMode = (event) => {
        try {
            this.view.disableAutoScaleToggle();
        } catch(e) { } // Silenciamos si ya estaba deshabilitado
    }

    handleBoardAutoscale = async (event) => {
        const { rows, cols } = event.detail;

        const [colResponse, rowResponse] = await Promise.all([
            fetch(ENDPOINTS.TOGGLE_COLUMN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: cols })
            }),
            fetch(ENDPOINTS.TOGGLE_ROW, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: rows })
            })
        ]);

        if (!colResponse.ok) throw new Error("Fallo en la petición: No se pudieron actualizar las columnas");
        if (!rowResponse.ok) throw new Error("Fallo en la petición: No se pudieron actualizar las filas");
    }

    handleBoardReset = async (event) => {
        // Petición HTTP POST para resetear al tablero de 6x7 por defecto
        const response = await fetch(ENDPOINTS.TOGGLE_RESET, {
            method: 'POST'
        });

        if (!response.ok) throw new Error("Fallo en la petición: No se pudo resetear el tablero");
    }
}

export default ControllerToggleButton;