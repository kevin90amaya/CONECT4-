import ToggleButtonView from "../views/ToggleButtonView.js";
import ToggleButton from "../ToggleButton.js";

class ControllerToggleButton {
    constructor() {
        // Instanciamos el Modelo y la Vista reales de nuestro componente
        this.view = new ToggleButtonView();
        this.model = new ToggleButton();
    }

    initialize() {
        // Inyectamos el modelo en la vista
        this.view.setModel(this.model);

        // Registramos los eventos del ciclo de vida del juego
        document.addEventListener('juego-comenzo', this.handleJuegoComenzo.bind(this));
        document.addEventListener('resolvemode', this.handleResolveMode.bind(this));
        
        // Registramos los eventos despachados por la Vista
        document.addEventListener('board-autoscale', this.handleBoardAutoscale.bind(this));
        document.addEventListener('board-reset-default', this.handleBoardReset.bind(this));
    }

    handleJuegoComenzo(event) {
        this.view.enableAutoScaleToggle();
    }

    handleResolveMode(event) {
        this.view.disableAutoScaleToggle();
    }

    async handleBoardAutoscale(event) {
        const { rows, cols } = event.detail;

        // Hacemos las peticiones HTTP POST a nuestra API de Spring en paralelo
        const [colResponse, rowResponse] = await Promise.all([
            fetch('/api/ToggleButton/column', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: cols }) // El backend de Spring recibirá este valor
            }),
            fetch('/api/ToggleButton/row', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: rows })
            })
        ]);

        if (!colResponse.ok) throw new Error("Fallo en la petición: No se pudieron actualizar las columnas");
        if (!rowResponse.ok) throw new Error("Fallo en la petición: No se pudieron actualizar las filas");
    }

    async handleBoardReset(event) {
        // Petición HTTP POST para resetear al tablero de 6x7 por defecto
        const response = await fetch('/api/ToggleButton/reset', {
            method: 'POST'
        });

        if (!response.ok) throw new Error("Fallo en la petición: No se pudo resetear el tablero");
    }
}

export default ControllerToggleButton;