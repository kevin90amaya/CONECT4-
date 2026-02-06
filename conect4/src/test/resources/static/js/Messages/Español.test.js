
import Español from "../../../../../main/resources/static/js/Messages/Español";


describe('Español', () => {

    describe('getMainMenuMessages', () => {

    let español;

    beforeEach(() => {
        español = new Español();
    });

    test('no debe lanzar error', () => {
        
        // Act
        const result = () => español.getMainMenuMessages();
        
        // Assert
        expect(result).not.toThrow();
    });

    test('debe tener las propiedades necesarias', () => {
        // Act
        const result = español.getMainMenuMessages();
        
        // Assert
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('play');
        expect(result).toHaveProperty('editSettings');
    });

    test('debe retornar un objeto con los mensajes del menú principal', () => {
        // Act
        const result = español.getMainMenuMessages();
        
        // Assert
        expect(typeof result).toBe('object');
        expect(result.title).toBe('Menu Principal');
        expect(result.play).toBe('Jugar');
        expect(result.editSettings).toBe('Editar Configuracion');
    });

    });

});