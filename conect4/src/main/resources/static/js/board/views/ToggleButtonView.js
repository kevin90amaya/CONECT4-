class ToggleButtonView {
    #model;
    #element;
    #checkbox;

    constructor() {
        this.#model = null;
        this.#element = null;
        this.#checkbox = null;
    }

    setModel(model) {
        this.#model = model;
    }

    getElement() {
        if (!this.#element) {
            this.#element = document.createElement('div');
            this.#element.className = 'toggle-container';
            
            this.#element.style.opacity = '0.5';
            this.#element.style.cursor = 'not-allowed';

            const label = document.createElement('span');
            label.className = 'toggle-label';
            label.textContent = 'RESPONSIVE';
            label.style.cursor = 'inherit';

            this.#checkbox = document.createElement('input');
            this.#checkbox.type = 'checkbox';
            this.#checkbox.checked = false;
            this.#checkbox.disabled = true; // Inicia bloqueado hasta que empiece la partida
            
            const toggleSwitch = document.createElement('div');
            toggleSwitch.className = 'toggle-switch';
            toggleSwitch.style.cursor = 'inherit';

            const slider = document.createElement('div');
            slider.className = 'slider';

            toggleSwitch.appendChild(this.#checkbox);
            toggleSwitch.appendChild(slider);

            // Ensamblamos los elementos
            this.#element.appendChild(label);
            this.#element.appendChild(toggleSwitch);

            // Escuchamos el clic en todo el contenedor (mejor experiencia de usuario)
            this.#element.addEventListener('click', (e) => {
                e.preventDefault(); // Evitamos que el navegador haga el toggle nativo
                if (this.#checkbox.disabled) return; // Ignoramos el clic si está bloqueado
                this.toggleVisualState();
            });
        }
        return this.#element;
    }

    enableAutoScaleToggle() {
        this.#checkbox.disabled = false;
        this.#element.style.opacity = '1';
        this.#element.style.cursor = 'pointer';
    }

    disableAutoScaleToggle() {
        this.#checkbox.disabled = true;
        this.#element.style.opacity = '0.5';
        this.#element.style.cursor = 'not-allowed';
    }

    toggleVisualState() {
        // 1. Cambiamos el estado de la UI
        this.#checkbox.checked = !this.#checkbox.checked;

        // 2. Evaluamos el nuevo estado y reaccionamos según el diagrama UML
        if (this.#checkbox.checked) {
            this.#model.on();
            
            const config = {
                width: window.innerWidth,
                height: window.innerHeight,
                cellSize: 56,
                horizontalMargin: 100,
                verticalMargin: 250
            };
            
            const dims = this.#model.getBoardDimensions(config);
            
            document.dispatchEvent(new CustomEvent('board-autoscale', {
                detail: { rows: dims.rows, cols: dims.columns }
            }));
        } else {
            this.#model.off();
            document.dispatchEvent(new CustomEvent('board-reset-default'));
        }
    }
}
export default ToggleButtonView;