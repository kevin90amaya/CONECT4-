class ToggleButton {

    #state;

    constructor() {
        this.#state = false;
    }

    getState() {
        return this.#state;
    }

    toggle() {
        this.#state = !this.#state;
    }

    on() {
        this.#state = true;
    }

    off() {
        this.#state = false;
    }

    reset() {
        this.#state = false;
    }

    getBoardDimensions(config) {
        const { width, height, cellSize, horizontalMargin, verticalMargin } = config;
        
        let columns = Math.floor((width - horizontalMargin) / cellSize);
        let rows = Math.floor((height - verticalMargin) / cellSize);

        // Aplicamos límites estrictos: mínimo 3x3, máximo 30x30
        columns = Math.max(3, Math.min(columns, 30));
        rows = Math.max(3, Math.min(rows, 30));

        return { columns, rows };
    }
}

export default ToggleButton;