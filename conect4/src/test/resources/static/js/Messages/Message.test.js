import Message from "../../../../../main/resources/static/js/Messages/Message.js";
import Español from "../../../../../main/resources/static/js/Messages/Español.js";
import Ingles from "../../../../../main/resources/static/js/Messages/Ingles.js";



describe('Message', () => {

    describe('getInstance', () => {

    let message;

    beforeEach(() => {
        message = Message.getInstance();
    });

    test('debe retornar una instancia de Message', () => {
        // Act
        const result = Message.getInstance();
        
        // Assert
        expect(result).toBeInstanceOf(Message);
    });

    });
    
    describe('constructor', () => {
        let message;
        
        beforeEach(() => {
            message = Message.getInstance();
        });
        
        test('debe inicializar con idioma Español por defecto', () => {
            // Assert
            expect(message.getIdioma()).toBeInstanceOf(Español);
        });
    });

    describe('setIdioma', () => {
        let message;
        
        beforeEach(() => {
            message = Message.getInstance();
        });

        afterEach(() => {
            message.setIdioma(new Español());
        });
        
        test('debe establecer el idioma a Ingles', () => {
            // Act
            message.setIdioma(new Ingles());
            
            // Assert
            expect(message.getIdioma()).toBeInstanceOf(Ingles);
        });
    });

    describe('getMessages', () => {
        let message;
        
        beforeEach(() => {
            message = Message.getInstance();
        });
        
        test('debe retornar los mensajes del menu principal', () => {
            // Act
            const result = message.getMessages("MainMenu");
            
            // Assert
            expect(result).toEqual({
                title: "Menu Principal",
                play: "Jugar",
                editSettings: "Editar Configuracion"
            });
        });

        test('debe retornar los mensajes del menu de configuracion', () => {
            // Act
            const result = message.getMessages("SettingsMenu");
            
            // Assert
            expect(result).toEqual({
                title: "Configuracion",
                language: "Idioma",
                gameMode: "Modo de Juego",
                numberOfPlayers: "Numero de Jugadores",
                editBoard: "Editar Tablero"
            });
        });
    });

});