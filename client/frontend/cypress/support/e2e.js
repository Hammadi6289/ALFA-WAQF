// This file runs before every test file

// Import commands.js
import "./commands";

// Hide fetch/XHR requests in command log to keep it clean
const app = window.top;
if (app) {
  app.console.log = () => {};
}

// You can add global configurations here
beforeEach(() => {
  // Runs before each test
  cy.log("Starting new test...");
});

afterEach(() => {
  // Runs after each test
  cy.log("Test completed");
});
