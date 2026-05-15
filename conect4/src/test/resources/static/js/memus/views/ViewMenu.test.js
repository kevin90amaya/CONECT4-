import ViewMenu from "../../../../../../main/resources/static/js/memus/views/ViewMenu.js";
import SettingsMenu from "../../../../../../main/resources/static/js/memus/models/SettingsMenu.js";
import ListMenus from "../../../../../../main/resources/static/js/memus/models/generics/ListMenus.js";



describe('ViewMenu', () => {

    let viewMenu;
    
    beforeEach(() => {
        document.body.innerHTML = '<div id="menu"></div>';
        viewMenu = new ViewMenu();
        const settingsMenu = new SettingsMenu();
        settingsMenu.addOptions(); 
        viewMenu.setMenu(settingsMenu);
    });

    afterEach(() => {
        document.body.innerHTML = '';
        const listMenus = ListMenus.getInstance();
        listMenus.listMenus = new Map();
    });


    test('showTitleMenu()', () => {
        viewMenu.showTitleMenu();

        const titleContainer = document.getElementById('titlemenu');
        expect(titleContainer).toBeTruthy();
        expect(titleContainer.tagName).toBe('DIV');
        expect(titleContainer.id).toBe('titlemenu');
    
        const titleElement = titleContainer.querySelector('h1');
        expect(titleElement).toBeTruthy();
    
        expect(titleElement.textContent).toBeTruthy();
        expect(titleElement.textContent).toBe('Configuracion');
    });

    test('showTitleOptions()', () => {
        viewMenu.showTitleOptions();
    
        const optionsContainer = document.getElementById('options');
        expect(optionsContainer).toBeTruthy();
        expect(optionsContainer.tagName).toBe('UL');
    
        const listItems = optionsContainer.querySelectorAll('li');
        expect(listItems.length).toBe(4);

        const buttons = optionsContainer.querySelectorAll('button.option');
        const titles = Array.from(buttons).map(button => button.textContent);
    
        expect(titles).toContain('Idioma');           
        expect(titles).toContain('Editar Jugadores'); 
        expect(titles).toContain('Editar Tablero');    
    });

    describe('showEditPlayers()', () => {
        let validPlayers;

        beforeEach(() => {
            validPlayers = [
                { name: "Player1", tipe: "HUMAN", color: "RED" },
                { name: "Player2", tipe: "COMPUTER", color: "YELLOW" }
            ];
            // Mockear alert para interceptarlo en nuestros tests
            jest.spyOn(window, 'alert').mockImplementation(() => {});
        });

        afterEach(() => {
            jest.restoreAllMocks();
            // Limpiar el DOM si algún test deja el modal abierto
            const modal = document.querySelector('.modal-overlay');
            if (modal) modal.remove();
        });

        test('debe lanzar error si los argumentos son null o undefined', () => {
            expect(() => viewMenu.showEditPlayers(null, 2)).toThrow("Precondición fallida: los argumentos no pueden ser null o undefined");
            expect(() => viewMenu.showEditPlayers([], null)).toThrow("Precondición fallida: los argumentos no pueden ser null o undefined");
        });

        test('debe lanzar error si los tipos no son array y entero', () => {
            expect(() => viewMenu.showEditPlayers({}, 2)).toThrow("Precondición fallida: listPlayers debe ser un array y numberPlayers un entero");
            expect(() => viewMenu.showEditPlayers([], "2")).toThrow("Precondición fallida: listPlayers debe ser un array y numberPlayers un entero");
        });

        test('debe lanzar error si la longitud del array no coincide con numberPlayers', () => {
            expect(() => viewMenu.showEditPlayers(validPlayers, 3)).toThrow("Precondición fallida: la longitud del array debe ser igual a numberPlayers");
        });

        test('debe lanzar error si los jugadores no tienen todos los campos requeridos', () => {
            const invalidPlayers = [{ name: "P1" }, { name: "P2" }];
            expect(() => viewMenu.showEditPlayers(invalidPlayers, 2)).toThrow("Precondición fallida: todos los campos del array (name, tipe, color) deben tener todos los valores");
        });

        test('debe renderizar el modal con los jugadores iniciales', () => {
            viewMenu.showEditPlayers(validPlayers, 2);
            const modal = document.querySelector('.modal-overlay');
            expect(modal).toBeTruthy();
            const playerItems = modal.querySelectorAll('.player-item');
            expect(playerItems.length).toBe(2);
            expect(playerItems[0].querySelector('.player-name').value).toBe("Player1");
            expect(playerItems[1].querySelector('.player-name').value).toBe("Player2");
        });

        test('debe añadir un nuevo jugador al pulsar "Añadir Jugador"', () => {
            viewMenu.showEditPlayers(validPlayers, 2);
            const addBtn = document.getElementById('addPlayer');
            addBtn.click();
            const playerItems = document.querySelectorAll('.player-item');
            expect(playerItems.length).toBe(3);
        });

        test('no debe permitir añadir más de 10 jugadores', () => {
            const tenPlayers = Array.from({length: 10}, (_, i) => ({
                name: `Player${i}`, tipe: "HUMAN", color: "RED" 
            }));
            
            viewMenu.showEditPlayers(tenPlayers, 10);
            const addBtn = document.getElementById('addPlayer');
            addBtn.click(); // Intento de añadir el jugador 11
            
            expect(window.alert).toHaveBeenCalledWith("Invariante fallida: La cantidad de jugadores no puede ser mayor que 10.");
            const playerItems = document.querySelectorAll('.player-item');
            expect(playerItems.length).toBe(10); // Asegura que no se añadió
        });

        test('no debe permitir eliminar si hay 2 o menos jugadores', () => {
            viewMenu.showEditPlayers(validPlayers, 2);
            const removeBtns = document.querySelectorAll('.remove-player');
            removeBtns[0].click();
            
            expect(window.alert).toHaveBeenCalledWith("Invariante fallida: La cantidad de jugadores nunca puede ser menor que 2.");
            const playerItems = document.querySelectorAll('.player-item');
            expect(playerItems.length).toBe(2); // Asegura que no se eliminó
        });

        test('debe permitir eliminar si hay mas de 2 jugadores', () => {
            const threePlayers = [
                ...validPlayers,
                { name: "Player3", tipe: "HUMAN", color: "BLUE" }
            ];
            viewMenu.showEditPlayers(threePlayers, 3);
            
            const removeBtns = document.querySelectorAll('.remove-player');
            removeBtns[0].click();
            
            const playerItems = document.querySelectorAll('.player-item');
            expect(playerItems.length).toBe(2); // Asegura que sí se eliminó
        });

        test('debe despachar save-players con los mismos datos al cancelar', () => {
            const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
            viewMenu.showEditPlayers(validPlayers, 2);
            
            const cancelBtn = document.getElementById('cancelEdit');
            cancelBtn.click();
            
            expect(dispatchEventSpy).toHaveBeenCalled();
            const eventArg = dispatchEventSpy.mock.calls[0][0];
            expect(eventArg.type).toBe('save-players');
            expect(eventArg.detail.value).toEqual({
                numberOfPlayers: 2,
                playersList: validPlayers
            });
            expect(document.querySelector('.modal-overlay')).toBeNull(); // Se debió cerrar
        });

        test('debe despachar save-players con datos actualizados y orden de turno al guardar correctamente', () => {
            const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
            viewMenu.showEditPlayers(validPlayers, 2);
            
            const firstPlayerName = document.querySelector('.player-item .player-name');
            firstPlayerName.value = "NewPlayer1";
            
            const saveBtn = document.getElementById('savePlayers');
            saveBtn.click();
            
            expect(dispatchEventSpy).toHaveBeenCalled();
            const eventArg = dispatchEventSpy.mock.calls[0][0];
            expect(eventArg.type).toBe('save-players');
            expect(eventArg.detail.value.numberOfPlayers).toBe(2);
            expect(eventArg.detail.value.playersList[0].name).toBe("NewPlayer1");
            expect(eventArg.detail.value.playersList[0].turn).toBe(0); // Validar autogeneración de turno
        });

        test('no debe permitir guardar con campos vacios', () => {
            viewMenu.showEditPlayers(validPlayers, 2);
            const firstPlayerName = document.querySelector('.player-item .player-name');
            firstPlayerName.value = ""; // Simulamos dejar el nombre vacío
            
            const saveBtn = document.getElementById('savePlayers');
            saveBtn.click();
            
            expect(window.alert).toHaveBeenCalledWith("Requisito fallido: Ningún jugador se puede guardar sin nombre, tipo o color.");
            expect(document.querySelector('.modal-overlay')).toBeTruthy(); // El modal sigue abierto
        });

        test('no debe permitir guardar con nombres duplicados', () => {
            viewMenu.showEditPlayers(validPlayers, 2);
            const names = document.querySelectorAll('.player-name');
            names[1].value = "Player1"; // Simulamos duplicar el nombre
            
            const saveBtn = document.getElementById('savePlayers');
            saveBtn.click();
            
            expect(window.alert).toHaveBeenCalledWith('Requisito fallido: El nombre "Player1" ya está en uso.');
            expect(document.querySelector('.modal-overlay')).toBeTruthy();
        });

        test('no debe permitir guardar con colores duplicados', () => {
            viewMenu.showEditPlayers(validPlayers, 2);
            const colors = document.querySelectorAll('.player-color');
            colors[1].value = "RED"; // Simulamos duplicar el color (RED)
            
            const saveBtn = document.getElementById('savePlayers');
            saveBtn.click();
            
            expect(window.alert).toHaveBeenCalledWith('Requisito fallido: El color "RED" ya está en uso.');
            expect(document.querySelector('.modal-overlay')).toBeTruthy();
        });
    });

    describe('showEditConectToWin()', () => {
        let board;

        beforeEach(() => {
            // Simulamos el objeto board devuelto por el backend
            board = {
                numberRows: 6,
                numberColumns: 7,
                numberToWin: 4
            };
        });

        afterEach(() => {
            jest.restoreAllMocks();
            const modal = document.querySelector('.modal-overlay');
            if (modal) modal.remove();
        });

        test('debe renderizar el modal con los valores correctos iniciales del tablero', () => {
            viewMenu.showEditConectToWin(board);
            
            const modal = document.querySelector('.modal-overlay');
            expect(modal).toBeTruthy();
            
            const range = modal.querySelector('#conectToWinRange');
            expect(range).toBeTruthy();
            expect(range.value).toBe('4');
            
            const display = modal.querySelector('#rangeValue');
            expect(display.textContent).toBe('4');
        });

        test('el maximo del range debe ser el maximo entre las filas y columnas del tablero', () => {
            viewMenu.showEditConectToWin(board);
            
            const range = document.querySelector('#conectToWinRange');
            expect(range.max).toBe('7'); // Math.max(6, 7) = 7
            expect(range.min).toBe('3');
        });

        test('debe actualizar el valor mostrado al mover el range', () => {
            viewMenu.showEditConectToWin(board);
            
            const range = document.querySelector('#conectToWinRange');
            const display = document.querySelector('#rangeValue');
            
            // Simulamos cambiar el valor del slider
            range.value = '5';
            range.dispatchEvent(new Event('input'));
            
            expect(display.textContent).toBe('5');
        });

        test('debe despachar save-conect-to-win con el nuevo valor al guardar y cerrar el modal', () => {
            const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
            viewMenu.showEditConectToWin(board);
            
            const range = document.querySelector('#conectToWinRange');
            range.value = '6'; // El usuario cambia a conectar 6
            
            const saveBtn = document.getElementById('saveConectToWin');
            saveBtn.click();
            
            expect(dispatchEventSpy).toHaveBeenCalled();
            const eventArg = dispatchEventSpy.mock.calls[0][0];
            expect(eventArg.type).toBe('save-conect-to-win');
            expect(eventArg.detail.value).toBe(6);
            expect(document.querySelector('.modal-overlay')).toBeNull(); // Se debió cerrar
        });

        test('debe despachar save-conect-to-win con el valor original al cancelar y cerrar el modal', () => {
            const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
            viewMenu.showEditConectToWin(board);
            
            const range = document.querySelector('#conectToWinRange');
            range.value = '6'; // Simulamos mover el range pero luego se arrepiente y cancela
            
            const cancelBtn = document.getElementById('cancelEdit');
            cancelBtn.click();
            
            expect(dispatchEventSpy).toHaveBeenCalled();
            const eventArg = dispatchEventSpy.mock.calls[0][0];
            expect(eventArg.type).toBe('save-conect-to-win');
            expect(eventArg.detail.value).toBe(4); // Debe enviar el valor original intacto
            expect(document.querySelector('.modal-overlay')).toBeNull();
        });
    });

    describe('showEditRows()', () => {
        let board;

        beforeEach(() => {
            board = {
                numberRows: 6,
                numberColumns: 7,
                numberToWin: 4
            };
        });

        afterEach(() => {
            jest.restoreAllMocks();
            const modal = document.querySelector('.modal-overlay');
            if (modal) modal.remove();
        });

        test('debe renderizar el modal con los valores correctos iniciales del tablero', () => {
            viewMenu.showEditRows(board);
            
            const modal = document.querySelector('.modal-overlay');
            expect(modal).toBeTruthy();
            
            const range = modal.querySelector('#rows');
            expect(range).toBeTruthy();
            expect(range.value).toBe('6');
            expect(range.min).toBe('3');
            expect(range.max).toBe('30');
            
            const display = modal.querySelector('#rangeValue');
            expect(display.textContent).toBe('6');
        });

        test('debe actualizar el valor mostrado al mover el range', () => {
            viewMenu.showEditRows(board);
            
            const range = document.querySelector('#rows');
            const display = document.querySelector('#rangeValue');
            
            range.value = '10';
            range.dispatchEvent(new Event('input'));
            
            expect(display.textContent).toBe('10');
        });

        test('debe despachar save-rows con el nuevo valor al guardar y cerrar el modal', () => {
            const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
            viewMenu.showEditRows(board);
            
            const range = document.querySelector('#rows');
            range.value = '15'; 
            
            const saveBtn = document.getElementById('saveRows');
            saveBtn.click();
            
            expect(dispatchEventSpy).toHaveBeenCalled();
            const eventArg = dispatchEventSpy.mock.calls[0][0];
            expect(eventArg.type).toBe('save-rows');
            expect(eventArg.detail.value).toBe(15);
            expect(document.querySelector('.modal-overlay')).toBeNull(); 
        });

        test('debe despachar save-rows con el valor original al cancelar y cerrar el modal', () => {
            const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
            viewMenu.showEditRows(board);
            
            const range = document.querySelector('#rows');
            range.value = '15'; 
            
            const cancelBtn = document.getElementById('cancelEdit');
            cancelBtn.click();
            
            expect(dispatchEventSpy).toHaveBeenCalled();
            const eventArg = dispatchEventSpy.mock.calls[0][0];
            expect(eventArg.type).toBe('save-rows');
            expect(eventArg.detail.value).toBe(6); 
            expect(document.querySelector('.modal-overlay')).toBeNull();
        });
    });

    describe('showEditColumns()', () => {
        let board;

        beforeEach(() => {
            board = {
                numberRows: 6,
                numberColumns: 7,
                numberToWin: 4
            };
        });

        afterEach(() => {
            jest.restoreAllMocks();
            const modal = document.querySelector('.modal-overlay');
            if (modal) modal.remove();
        });

        test('debe renderizar el modal con los valores correctos iniciales del tablero', () => {
            viewMenu.showEditColumns(board);
            
            const modal = document.querySelector('.modal-overlay');
            expect(modal).toBeTruthy();
            
            const range = modal.querySelector('#columns');
            expect(range).toBeTruthy();
            expect(range.value).toBe('7');
            expect(range.min).toBe('3');
            expect(range.max).toBe('30');
            
            const display = modal.querySelector('#rangeValue');
            expect(display.textContent).toBe('7');
        });

        test('debe actualizar el valor mostrado al mover el range', () => {
            viewMenu.showEditColumns(board);
            
            const range = document.querySelector('#columns');
            const display = document.querySelector('#rangeValue');
            
            range.value = '10';
            range.dispatchEvent(new Event('input'));
            
            expect(display.textContent).toBe('10');
        });

        test('debe despachar save-columns con el nuevo valor al guardar y cerrar el modal', () => {
            const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
            viewMenu.showEditColumns(board);
            
            const range = document.querySelector('#columns');
            range.value = '12'; 
            
            const saveBtn = document.getElementById('saveColumns');
            saveBtn.click();
            
            expect(dispatchEventSpy).toHaveBeenCalled();
            const eventArg = dispatchEventSpy.mock.calls[0][0];
            expect(eventArg.type).toBe('save-columns');
            expect(eventArg.detail.value).toBe(12);
            expect(document.querySelector('.modal-overlay')).toBeNull(); 
        });

        test('debe despachar save-columns con el valor original al cancelar y cerrar el modal', () => {
            const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
            viewMenu.showEditColumns(board);
            
            const range = document.querySelector('#columns');
            range.value = '12'; 
            
            const cancelBtn = document.getElementById('cancelEdit');
            cancelBtn.click();
            
            expect(dispatchEventSpy).toHaveBeenCalled();
            const eventArg = dispatchEventSpy.mock.calls[0][0];
            expect(eventArg.type).toBe('save-columns');
            expect(eventArg.detail.value).toBe(7); 
            expect(document.querySelector('.modal-overlay')).toBeNull();
        });
    });

    describe('ViewMenu - Verificación de DOM mockeado', () => {
        test('el DOM está mockeado correctamente', () => {
        // Verificar entorno jsdom
        expect(window.navigator.userAgent).toContain('jsdom');
        
        // Verificar que document es de JSDOM
        expect(document.constructor.name).toBe('Document');
        });

    });


    
});
