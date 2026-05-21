import ToggleButtonView from "../../../../../../main/resources/static/js/board/views/ToggleButtonView.js";

describe('ToggleButtonView (TDD)', () => {
    let view;

    beforeEach(() => {
        view = new ToggleButtonView();
    });

    test('debe renderizar la estructura HTML del toggle switch correctamente (checkbox oculto y slider)', () => {
        const element = view.getElement();
        
        // 1. Verificamos que se cree el contenedor principal
        expect(element).toBeTruthy();
        expect(element.className).toBe('toggle-container');

        // 2. Verificamos el texto del label
        const labelText = element.querySelector('.toggle-label');
        expect(labelText).toBeTruthy();
        expect(labelText.textContent).toBe('AUTO-ESCALA');

        // 3. Verificamos el input checkbox oculto y su estado inicial
        const checkbox = element.querySelector('input[type="checkbox"]');
        expect(checkbox).toBeTruthy();
        expect(checkbox.checked).toBe(false); // Inicia apagado

        // 4. Verificamos el slider (la bolita visual)
        const slider = element.querySelector('.slider');
        expect(slider).toBeTruthy();
    });
});