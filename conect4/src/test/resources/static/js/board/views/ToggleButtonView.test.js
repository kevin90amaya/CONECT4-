import ToggleButtonView from "../../../../../../main/resources/static/js/board/views/ToggleButtonView.js";
import ToggleButton from "../../../../../../main/resources/static/js/board/ToggleButton.js";

describe('ToggleButtonView (TDD)', () => {
    let view;
    let model;

    beforeEach(() => {
        // Instanciamos el modelo real (no mockeado) ya que es código puro de lógica
        model = new ToggleButton(); 
        view = new ToggleButtonView();
        
        // Inyectamos el modelo real en la vista
        view.setModel(model); 
    });

    describe('getElement()', () => {
        test('debe devolver la estructura HTML del toggle switch correctamente ensamblada', () => {
            const element = view.getElement();
            
            expect(element).toBeTruthy();
            expect(element.className).toBe('toggle-container');
    
            const labelText = element.querySelector('.toggle-label');
            expect(labelText).toBeTruthy();
            expect(labelText.textContent).toBe('AUTO-ESCALA');
    
            const checkbox = element.querySelector('input[type="checkbox"]');
            expect(checkbox).toBeTruthy();
            expect(checkbox.checked).toBe(false); // Inicia apagado
            expect(checkbox.disabled).toBe(false); // Inicia habilitado
    
            const slider = element.querySelector('.slider');
            expect(slider).toBeTruthy();
        });
    });

    describe('enableAutoScaleToggle()', () => {
        test('debe quitar el atributo disabled del checkbox para permitir interacción', () => {
            const element = view.getElement();
            expect(element).not.toBeNull(); // Verificamos que el DOM ya esté construido
            
            const checkbox = element.querySelector('input[type="checkbox"]');
            
            // Simulamos que el botón estaba bloqueado previamente
            checkbox.disabled = true; 
            
            view.enableAutoScaleToggle();
            expect(checkbox.disabled).toBe(false);
        });
    });

    describe('disableAutoScaleToggle()', () => {
        test('debe aplicar el atributo disabled al checkbox para bloquear interacción', () => {
            const element = view.getElement();
            expect(element).not.toBeNull(); // Verificamos que el DOM ya esté construido
            
            const checkbox = element.querySelector('input[type="checkbox"]');
            expect(checkbox.disabled).toBe(false); // Inicia habilitado
            
            view.disableAutoScaleToggle();
            expect(checkbox.disabled).toBe(true);
        });
    });

    describe('toggleVisualState()', () => {
        describe('Cuando el switch pasa a estado ON', () => {
            test('debe actualizar el modelo a on() manteniendo la UI en checked', () => {
                const element = view.getElement();
                const checkbox = element.querySelector('input[type="checkbox"]');
                const onSpy = jest.spyOn(model, 'on');
                
                // Precondición: Verificamos que inicie apagado (false)
                expect(checkbox.checked).toBe(false);
                
                view.toggleVisualState();
    
                // El método es quien debe encargarse de pasarlo a true
                expect(checkbox.checked).toBe(true);
                expect(onSpy).toHaveBeenCalled();
                expect(model.getState()).toBe(true);
            });
    
            test('debe enviar la configuración de pantalla al modelo y obtener dimensiones reales', () => {
                const element = view.getElement();
                const checkbox = element.querySelector('input[type="checkbox"]');
                const getDimSpy = jest.spyOn(model, 'getBoardDimensions'); // Sin mockReturnValue, usa el método real
                
                // Simulamos una pantalla de escritorio
                window.innerWidth = 1024;
                window.innerHeight = 768;

                // Precondición: apagado
                checkbox.checked = false;
                
                view.toggleVisualState();
    
                // Verificamos que la vista le envió el config real de la pantalla
                expect(getDimSpy).toHaveBeenCalledWith(expect.objectContaining({
                    width: 1024,
                    height: 768,
                    cellSize: 56,
                    horizontalMargin: 100,
                    verticalMargin: 250
                }));
                expect(getDimSpy).toHaveReturnedWith(expect.objectContaining({
                    columns: expect.any(Integer),
                    rows: expect.any(Integer)
                }));
            });
    
            test('debe despachar el evento "board-autoscale" con las filas y columnas calculadas', () => {
                const element = view.getElement();
                const checkbox = element.querySelector('input[type="checkbox"]');
                const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
                
                // Simulamos la misma pantalla
                window.innerWidth = 1024;
                window.innerHeight = 768;

                // Precondición: apagado
                checkbox.checked = false;

                view.toggleVisualState();
    
                expect(dispatchEventSpy).toHaveBeenCalled();
                const eventArg = dispatchEventSpy.mock.calls[0][0];
                expect(eventArg.type).toBe('board-autoscale');
                
                // Matemáticas del modelo real: width(1024-100)/56 = 16 columnas | height(768-250)/56 = 9 filas
                expect(eventArg.detail).toEqual({ rows: 9, cols: 16 });
            });
        });

        describe('Cuando el switch pasa a estado OFF', () => {
            test('debe actualizar el modelo a off() manteniendo la UI unchecked', () => {
                const element = view.getElement();
                const checkbox = element.querySelector('input[type="checkbox"]');
                const offSpy = jest.spyOn(model, 'off');
                
                // Precondición: Simulamos que ya estaba encendido previamente
                checkbox.checked = true;
                model.on();
                
                view.toggleVisualState();
    
                // El método es quien debe encargarse de pasarlo a false
                expect(checkbox.checked).toBe(false);
                expect(offSpy).toHaveBeenCalled();
                expect(model.getState()).toBe(false);
            });
    
            test('debe despachar el evento "board-reset-default"', () => {
                const element = view.getElement();
                const checkbox = element.querySelector('input[type="checkbox"]');
                const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
                
                // Precondición: Simulamos que ya estaba encendido
                checkbox.checked = true;
                model.on();

                view.toggleVisualState();
    
                expect(dispatchEventSpy).toHaveBeenCalled();
                const eventArg = dispatchEventSpy.mock.calls[0][0];
                expect(eventArg.type).toBe('board-reset-default');
            });
        });
    });
    
});