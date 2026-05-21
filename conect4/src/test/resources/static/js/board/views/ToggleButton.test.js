import ToggleButton from "../../../../../../main/resources/static/js/board/ToggleButton.js";

describe('ToggleButton (Modelo)', () => {
    let toggle;

    beforeEach(() => {
        toggle = new ToggleButton();
    });

    test('debe inicializarse apagado (false) por defecto', () => {
        expect(toggle.getState()).toBe(false);
    });

    test('toggle() debe alternar el estado correctamente', () => {
        toggle.toggle();
        expect(toggle.getState()).toBe(true);

        toggle.toggle();
        expect(toggle.getState()).toBe(false);
    });

    test('on() y off() deben forzar el estado sin importar el estado previo', () => {
        toggle.on();
        expect(toggle.getState()).toBe(true);

        toggle.off();
        expect(toggle.getState()).toBe(false);
    });

    test('debe poder ser reiniciado a su estado inicial (apagado)', () => {
        toggle.on();
        expect(toggle.getState()).toBe(true);
        
        toggle.reset();
        expect(toggle.getState()).toBe(false);
    });

    describe('getBoardDimensions(width, height)', () => {
        
        test('Límite inferior: Pantalla muy pequeña debe devolver el mínimo permitido (3x3)', () => {
            // Pantalla de 100x100px (ej. reloj inteligente o ventana hiper minimizada)
            const dimensions = toggle.getBoardDimensions(100, 100);
            expect(dimensions.columns).toBe(3);
            expect(dimensions.rows).toBe(3);
        });

        test('Móvil vertical (360x800): Debe calcular valores proporcionales intermedios', () => {
            const dimensions = toggle.getBoardDimensions(360, 800);
            expect(dimensions.columns).toBeGreaterThanOrEqual(3);
            expect(dimensions.columns).toBeLessThanOrEqual(6); // Por el ancho estrecho
            expect(dimensions.rows).toBeGreaterThanOrEqual(8); // Por la altura alargada
        });

        test('Pantalla de Escritorio (1024x768): Debe calcular un tablero grande', () => {
            const dimensions = toggle.getBoardDimensions(1024, 768);
            expect(dimensions.columns).toBeGreaterThanOrEqual(10);
            expect(dimensions.rows).toBeGreaterThanOrEqual(8);
        });

        test('Límite superior: Pantalla gigante 4K debe devolver el máximo permitido (30x30)', () => {
            const dimensions = toggle.getBoardDimensions(4000, 4000);
            expect(dimensions.columns).toBe(30);
            expect(dimensions.rows).toBe(30);
        });

        test('Debe devolver un objeto con la estructura correcta y números enteros', () => {
            const dimensions = toggle.getBoardDimensions(800, 600);
            expect(dimensions).toHaveProperty('columns');
            expect(dimensions).toHaveProperty('rows');
            expect(Number.isInteger(dimensions.columns)).toBe(true);
            expect(Number.isInteger(dimensions.rows)).toBe(true);
        });
    });
});