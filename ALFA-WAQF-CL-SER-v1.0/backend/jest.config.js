export default {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/test-setup/jest.setup.js"],
  transform: {},
  testTimeout: 10000, // 10 seconds timeout for tests
  //extensionsToTreatAsEsm: [".js"],
};
