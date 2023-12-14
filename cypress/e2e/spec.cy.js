describe("template spec", () => {
  beforeEach(() => {
    cy.viewport(600, 900);
    cy.visit("http://localhost:3000/");
  });

  it("changes pages", () => {
    cy.get("[aria-label='footer-search']").click();
    cy.get("[aria-label='footer-list']").click();
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='footer-share']").click();
  });
});
