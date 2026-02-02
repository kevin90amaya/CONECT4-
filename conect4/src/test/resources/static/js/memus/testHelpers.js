// Helpers específicos para tests del sistema de menús
// @beforeEach y @afterEach equivalentes para tests de menús

export const createMockMenu = () => {
  const menuElement = createMockElement('menu', `
    <div id="titlemenu"><h1></h1></div>
    <div id="options"></div>
  `);
  return menuElement;
};

export const createCustomEvent = (eventType, detail = {}) => {
  return new CustomEvent(eventType, { detail });
};

// @beforeEach equivalente - Arrange para tests de menús
export const setupMenuTest = () => {
  clearDOM();
  const menu = createMockMenu();
  return menu;
};

// @afterEach equivalente - Cleanup para tests de menús
export const cleanupMenuTest = () => {
  clearDOM();
};

// Helper para crear opciones de menú
export const createMockOption = (text, id = null) => {
  const option = document.createElement('button');
  option.className = 'option';
  option.textContent = text;
  if (id) option.id = id;
  return option;
};

// Helper para simular click en opción
export const clickOption = (optionElement) => {
  const event = new MouseEvent('click', { bubbles: true });
  optionElement.dispatchEvent(event);
};
