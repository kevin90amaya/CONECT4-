const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      // Configuraciones adicionales pueden ir aquí
    },
  },
  component: {
    devServer: {
      framework: 'react', // Cambia a 'vue' o 'svelte' si es necesario
      bundler: 'vite',
    },
    specPattern: 'cypress/component/**/*.cy.js'
  },
  video: false,
  screenshotOnRunFailure: true
})
