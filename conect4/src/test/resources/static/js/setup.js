// Importar testing-library para matchers adicionales
import '@testing-library/jest-dom';

// Mock del DOM para tests
// Mock del DOM para tests
/*
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:8080',
    origin: 'http://localhost:8080',
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn()
  },
  writable: true,
  configurable: true
});
*/

// Mock de console.log para tests (opcional)
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

// Funciones helper globales para tests
global.createMockElement = (id, content = '') => {
  const element = document.createElement('div');
  element.id = id;
  element.innerHTML = content;
  document.body.appendChild(element);
  return element;
};

global.createMockMenu = () => {
  const menuElement = createMockElement('menu', `
    <div id="titlemenu"><h1></h1></div>
    <div id="options"></div>
  `);
  return menuElement;
};

global.clearDOM = () => {
  document.body.innerHTML = '';
};

// Mock de CustomEvent para tests de eventos
global.createCustomEvent = (eventType, detail = {}) => {
  return new CustomEvent(eventType, { detail });
};

// Mock de setTimeout para tests asíncronos
global.useFakeTimers = () => {
  jest.useFakeTimers();
};

// Limpiar después de cada test
afterEach(() => {
  clearDOM();
  jest.clearAllMocks();
});