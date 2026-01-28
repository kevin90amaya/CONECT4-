/// <reference types="cypress" />

describe('Menú Principal', () => {
  beforeEach(() => {
    // Visita la página principal antes de cada prueba
    cy.visit('/')
  })

  it('debe mostrar el título del menú', () => {
    // Verifica que el título del menú sea visible
    cy.contains('h2', 'Menú Principal').should('be.visible')
  })

  it('debe mostrar las opciones del menú', () => {
    // Verifica que las opciones del menú estén presentes
    cy.contains('button', 'Jugar').should('be.visible')
    cy.contains('button', 'Opciones').should('be.visible')
    cy.contains('button', 'Salir').should('be.visible')
  })

  it('debe navegar al hacer clic en una opción', () => {
    // Espía en el evento de clic
    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog')
    })

    // Haz clic en el botón Jugar
    cy.contains('button', 'Jugar').click()
    
    // Verifica que se haya llamado al manejador de clic
    cy.get('@consoleLog').should('have.been.calledWith', 'Opción seleccionada:', 0)
  })
})
