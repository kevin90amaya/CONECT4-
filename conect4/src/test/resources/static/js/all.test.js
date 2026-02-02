// Test principal que importa todos los tests del sistema
import './__tests__/example.test.js';
import './views/all.test.js';
import './controllers/all.test.js';
import './models/all.test.js';
import './memus/all.test.js';

describe('@suite Todos los Tests del Sistema MVC', () => {
  test('estructura de tests cargada correctamente', () => {
    expect(true).toBe(true);
  });
  
  test('Jest configurado correctamente', () => {
    expect(typeof describe).toBe('function');
    expect(typeof test).toBe('function');
    expect(typeof expect).toBe('function');
  });
});
