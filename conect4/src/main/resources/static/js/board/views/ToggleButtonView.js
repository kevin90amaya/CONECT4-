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

            const label = document.createElement('span');
            label.className = 'toggle-label';
            label.textContent = 'AUTO-ESCALA';

            this.#checkbox = document.createElement('input');
            this.#checkbox.type = 'checkbox';
            this.#checkbox.checked = false;
            this.#checkbox.disabled = false;
            
            // Al hacer clic, detenemos al navegador y delegamos todo a nuestro método
            this.#checkbox.addEventListener('click', (e) => {
                e.preventDefault(); 
                this.toggleVisualState();
            });

            const slider = document.createElement('div');
            slider.className = 'slider';

            // Ensamblamos los elementos
            this.#element.appendChild(label);
            this.#element.appendChild(this.#checkbox);
            this.#element.appendChild(slider);
        }
        return this.#element;
    }

    enableAutoScaleToggle() {
        if (!this.#checkbox) {
            throw new Error("Precondición fallida: El checkbox no ha sido renderizado.");
        }
        if (!this.#checkbox.disabled) {
            throw new Error("Precondición fallida: El checkbox ya está habilitado.");
        }
        this.#checkbox.disabled = false;
    }

    disableAutoScaleToggle() {
        if (!this.#checkbox) {
            throw new Error("Precondición fallida: El checkbox no ha sido renderizado.");
        }
        if (this.#checkbox.disabled) {
            throw new Error("Precondición fallida: El checkbox ya está deshabilitado.");
        }
        this.#checkbox.disabled = true;
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