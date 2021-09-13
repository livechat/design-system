/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [`<rootDir>/jest.setup.ts`],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
};
