module.exports = {

  // Stop running tests after `n` failures
  bail: 1,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "json",
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "json",
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",

};
