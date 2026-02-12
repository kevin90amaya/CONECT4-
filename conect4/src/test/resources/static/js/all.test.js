
import './Messages/all.test.js';
import './memus/views/all.test.js';
import './memus/models/generics/all.test.js';
import './memus/controllers/all.test.js';






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
    