module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/src/test/resources/static/js/**/*.test.js',
    '**/src/test/resources/static/js/**/*.spec.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test/resources/static/js/setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/main/resources/static/js/$1'
  },
  collectCoverageFrom: [
    'src/main/resources/static/js/**/*.js',
    '!src/main/resources/static/js/**/*.test.js',
    '!src/main/resources/static/js/**/*.spec.js',
    '!src/main/resources/static/js/scripts.js'
  ],
  coverageDirectory: 'target/test-coverage/js',
  coverageReporters: ['text', 'lcov', 'html'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/target/'
  ]
};