// cypress/support/e2e.js
import "@cypress/code-coverage/support";

describe("Test Press Reader", () => {
  beforeEach(() => {
    cy.viewport(600, 900);
    cy.visit("/");
  });

  it("changes pages", () => {
    cy.get("[aria-label='footer-search']").click();
    cy.get("[aria-label='footer-list']").click();
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='footer-share']").click();
  });

  it("changes languages", () => {
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='settings-English']").click();
    cy.contains("Settings");
    cy.get("[aria-label='settings-Italiano']").click();
    cy.contains("Configurazione");
    cy.get("[aria-label='settings-Castellano']").click();
    cy.contains("Configuración");
  });
});
