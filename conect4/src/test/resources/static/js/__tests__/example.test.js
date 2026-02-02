// Test de ejemplo para verificar que Jest funciona correctamente
describe('@unit @config Configuración de Jest - Tests Unitarios', () => {
  test('debe crear elementos DOM correctamente', () => {
    // Usar helper global del setup.js
    const element = createMockElement('test-element', '<p>Contenido de prueba</p>');
    
    expect(element).toBeInTheDocument();
    expect(element.id).toBe('test-element');
    expect(element.querySelector('p')).toBeInTheDocument();
    expect(element.querySelector('p').textContent).toBe('Contenido de prueba');
  });

  test('debe limpiar el DOM correctamente', () => {
    // Crear elementos
    createMockElement('test1', 'contenido1');
    createMockElement('test2', 'contenido2');
    
    // Verificar que existen
    expect(document.getElementById('test1')).toBeInTheDocument();
    expect(document.getElementById('test2')).toBeInTheDocument();
    
    // Limpiar
    clearDOM();
    
    // Verificar que se limpió
    expect(document.getElementById('test1')).not.toBeInTheDocument();
    expect(document.getElementById('test2')).not.toBeInTheDocument();
  });

  test('debe crear mock de menú correctamente', () => {
    // Importar helper específico de menús
    const { createMockMenu } = require('../memus/testHelpers.js');
    const menuElement = createMockMenu();
    
    expect(menuElement).toBeInTheDocument();
    expect(menuElement.id).toBe('menu');
    expect(menuElement.querySelector('#titlemenu')).toBeInTheDocument();
    expect(menuElement.querySelector('#options')).toBeInTheDocument();
  });

  test('debe crear CustomEvents correctamente', () => {
    // Importar helper específico de menús
    const { createCustomEvent } = require('../memus/testHelpers.js');
    const mockData = { option: 'test-option' };
    const event = createCustomEvent('menuOptionSelected', mockData);
    
    expect(event).toBeInstanceOf(CustomEvent);
    expect(event.type).toBe('menuOptionSelected');
    expect(event.detail).toEqual(mockData);
  });
  /*
  test('❌ TEST QUE FALLA A PROPÓSITO - demostrando que all.test.js lo ejecuta', () => {
    // Este test va a fallar intencionalmente
    expect(true).toBe(false); // ← Esto siempre falla
  });
  */

});
