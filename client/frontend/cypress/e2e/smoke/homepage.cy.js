describe("Smoke Test - Homepage", () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit("/");
    cy.wait(1000);
  });

  it("should load the homepage successfully", () => {
    // Check that the page loads with status 200
    cy.request("/").its("status").should("eq", 200);
  });

  it("should have the correct page title", () => {
    cy.title().should("not.be.empty");
    // cy.title().should('include', 'Alfalah WAQF');
  });

  it("should display the navigation bar", () => {
    // Check for navbar elements (adjust selectors based on your actual HTML)
    cy.get("nav").should("be.visible");
    cy.get(".navbar").should("exist");
    // Or check for specific links
    cy.contains("Home").should("be.visible");
    cy.contains("Find a Doctor").should("be.visible");
  });

  it("should have working navigation links", () => {
    // Test that navigation links are clickable
    cy.get('a[href="/about"]').should("be.visible");
    cy.get('a[href="/doctors"]').should("be.visible");
    cy.get('a[href="/contact"]').should("be.visible");
  });

  it("should load without JavaScript errors", () => {
    // Check console for errors
    cy.window().then((win) => {
      const originalConsoleError = win.console.error;
      const errors = [];

      win.console.error = (...args) => {
        errors.push(args);
        originalConsoleError.apply(win.console, args);
      };

      // Reload to capture any console errors during load
      cy.reload().then(() => {
        expect(errors).to.have.length(0);
      });
    });
  });

  it("should be responsive (mobile view)", () => {
    // Test mobile viewport
    cy.viewport("iphone-x");
    cy.get("nav").should("be.visible");
    // Check if mobile menu button exists
    cy.get(".navbar-toggler").should("be.visible");
  });
});
