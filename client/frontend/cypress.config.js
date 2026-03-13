const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://alfalah-waqf.vercel.app",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    experimentalStudio: true, // Optional: record interactions
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
