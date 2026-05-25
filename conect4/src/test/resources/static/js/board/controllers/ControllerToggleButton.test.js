import ControllerToggleButton from "../../../../../../main/resources/static/js/board/controllers/ControllerToggleButton.js";
import { ENDPOINTS } from "../../../../../../main/resources/static/js/api/endpoints.js";

describe('ControllerToggleButton (TDD)', () => {
    let controller;

    beforeEach(() => {
        // Instanciamos el controlador que, por diseño, crea un Modelo y una Vista reales
        controller = new ControllerToggleButton();
        
        // Limpiamos los espías entre cada test para evitar cruces de datos
        jest.clearAllMocks();
    });

    afterEach(() => {
        // Limpiamos los eventos del DOM para que los controladores "viejos" no se acumulen y reaccionen en otros tests
        controller.destroy();
    });

    describe('initialize()', () => {
        test('debe inyectarle el modelo ToggleButton a la vista', () => {
            const setModelSpy = jest.spyOn(controller.view, 'setModel');
            controller.initialize();
            expect(setModelSpy).toHaveBeenCalledWith(controller.model);
        });

        test('debe registrar el evento "juego-comenzo" en el DOM', () => {
            const addEventSpy = jest.spyOn(document, 'addEventListener');
            controller.initialize();
            expect(addEventSpy).toHaveBeenCalledWith('juego-comenzo', expect.any(Function));
        });

        test('debe registrar el evento "resolvemode" en el DOM', () => {
            const addEventSpy = jest.spyOn(document, 'addEventListener');
            controller.initialize();
            expect(addEventSpy).toHaveBeenCalledWith('resolvemode', expect.any(Function));
        });

        test('debe registrar el evento "board-autoscale" en el DOM', () => {
            const addEventSpy = jest.spyOn(document, 'addEventListener');
            controller.initialize();
            expect(addEventSpy).toHaveBeenCalledWith('board-autoscale', expect.any(Function));
        });

        test('debe registrar el evento "board-reset-default" en el DOM', () => {
            const addEventSpy = jest.spyOn(document, 'addEventListener');
            controller.initialize();
            expect(addEventSpy).toHaveBeenCalledWith('board-reset-default', expect.any(Function));
        });
    });

    describe('Interacción con la Vista (Ciclo de Vida)', () => {
        test('cuando el DOM emite "juego-comenzo", debe llamar a view.enableAutoScaleToggle()', () => {
            const enableSpy = jest.spyOn(controller.view, 'enableAutoScaleToggle').mockImplementation(() => {});
            controller.initialize();
            
            document.dispatchEvent(new Event('juego-comenzo'));
            
            expect(enableSpy).toHaveBeenCalled();
        });

        test('cuando el DOM emite "resolvemode", debe llamar a view.disableAutoScaleToggle()', () => {
            const disableSpy = jest.spyOn(controller.view, 'disableAutoScaleToggle').mockImplementation(() => {});
            controller.initialize();
            
            document.dispatchEvent(new Event('resolvemode'));
            
            expect(disableSpy).toHaveBeenCalled();
        });
    });

    describe('Interacción con la API de Spring (Actualización de Tablero)', () => {
        beforeEach(() => {
            // Mockeamos el fetch global para interceptar las peticiones HTTP
            global.fetch = jest.fn().mockResolvedValue({ ok: true });
        });

        afterEach(() => {
            // Restauramos el fetch original para no afectar a otros archivos
            global.fetch.mockClear();
        });

        test('cuando el DOM emite "board-autoscale", debe hacer peticiones POST a /api/ToggleButton/column y /row', () => {
            controller.initialize();
            
            // Disparamos el evento enviándole dimensiones calculadas (ej: 10 filas, 12 columnas)
            document.dispatchEvent(new CustomEvent('board-autoscale', { detail: { rows: 10, cols: 12 } }));
            
            // Verificamos que se hayan hecho 2 llamadas HTTP POST a los endpoints correctos
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch).toHaveBeenCalledWith(ENDPOINTS.TOGGLE_COLUMN, expect.objectContaining({ method: 'POST' }));
            expect(global.fetch).toHaveBeenCalledWith(ENDPOINTS.TOGGLE_ROW, expect.objectContaining({ method: 'POST' }));
        });

        test('cuando el DOM emite "board-reset-default", debe hacer una petición POST a /api/ToggleButton/reset', () => {
            controller.initialize();
            
            document.dispatchEvent(new Event('board-reset-default'));
            
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(ENDPOINTS.TOGGLE_RESET, expect.objectContaining({ method: 'POST' }));
        });
    });
});