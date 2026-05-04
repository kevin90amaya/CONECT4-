

export class YesNoDialog {
    static #AFFIRMATIVE = `y`;
    static #NEGATIVE = `n`;
    static #SUFFIX = `? (` +
        YesNoDialog.#AFFIRMATIVE + `/` +
        YesNoDialog.#NEGATIVE + `): `;
    static #MESSAGE = `The value must be ${YesNoDialog.#AFFIRMATIVE} or ${YesNoDialog.#NEGATIVE}`;
    #answer;
    #statusParagraph;
    #form;

    constructor() {
        this.#statusParagraph = null;
        this.#form = document.createElement('form');
        this.#form.className = 'yes-no-form';
        
        // Crear el input y el botón
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'yes-no-input';
        input.maxLength = 1;
        
        const button = document.createElement('button');
        button.type = 'submit';
        button.textContent = 'OK';
        
        this.#form.appendChild(input);
        this.#form.appendChild(button);
        
        // Agregar el listener al formulario
        this.#form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.#answer = input.value.toLowerCase();
            this.#form.remove();
            this.#statusParagraph.textContent = '';
        });
    }

    read(message) {
        // Reiniciar la respuesta antes de cada lectura
        this.#answer = null;
        this.#statusParagraph = document.querySelector(".status p");
        this.#statusParagraph.textContent = message + YesNoDialog.#SUFFIX;
        this.#statusParagraph.appendChild(this.#form);

        // Esperar a que el usuario responda de forma asíncrona
        return new Promise((resolve) => {
            const checkAnswer = () => {
                if (this.#answer) {
                    const error = !this.isAffirmative() && !this.isNegative();
                    if (error) {
                        this.#statusParagraph.textContent = YesNoDialog.#MESSAGE;
                        // limpiar y volver a mostrar el formulario
                        this.#answer = null;
                        this.#statusParagraph.appendChild(this.#form);
                        setTimeout(checkAnswer, 100);
                    } else {
                        resolve();
                    }
                } else {
                    setTimeout(checkAnswer, 100);
                }
            };
            checkAnswer();
        });
    }

    isAffirmative() {
        return this.#answer === YesNoDialog.#AFFIRMATIVE;
    }

    isNegative() {
        return this.#answer === YesNoDialog.#NEGATIVE;
    }

    getAnswer() {
        return this.#answer;
    }
}
export default YesNoDialog;