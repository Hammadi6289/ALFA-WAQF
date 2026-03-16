// Custom command to check if element exists and is visible
Cypress.Commands.add("shouldBeVisible", (selector) => {
  cy.get(selector).should("be.visible");
});

// Custom command to check for broken images
Cypress.Commands.add("checkImages", () => {
  cy.get("img").each(($img) => {
    cy.wrap($img).should("be.visible");
    expect($img[0].naturalWidth).to.be.greaterThan(0);
  });
});

// Custom command to check for 404 links
Cypress.Commands.add("checkLinks", () => {
  cy.get("a").each(($link) => {
    const href = $link.prop("href");
    if (href && href.startsWith("http")) {
      cy.request({
        url: href,
        failOnStatusCode: false,
      })
        .its("status")
        .should("not.eq", 404);
    }
  });
});
