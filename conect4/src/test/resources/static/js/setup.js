// Importar testing-library para matchers adicionales
import '@testing-library/jest-dom';

// Mock de console.log para tests (genérico)
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

// Funciones helper globales para CUALQUIER test
global.createMockElement = (id, content = '') => {
  const element = document.createElement('div');
  element.id = id;
  element.innerHTML = content;
  document.body.appendChild(element);
  return element;
};

global.clearDOM = () => {
  document.body.innerHTML = '';
};

// Mock de setTimeout para tests asíncronos (genérico)
global.useFakeTimers = () => {
  jest.useFakeTimers();
};

// Limpiar después de cada test (genérico)
afterEach(() => {
  clearDOM();
  jest.clearAllMocks();
});