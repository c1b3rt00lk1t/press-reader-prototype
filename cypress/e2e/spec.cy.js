describe("template spec", () => {
  it("passes", () => {
    cy.viewport(600, 900);
    cy.visit("http://localhost:3000/");
  });
});
