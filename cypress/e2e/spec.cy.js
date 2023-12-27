describe("Test Press Reader", () => {
  beforeEach(() => {
    cy.viewport(600, 900);
    cy.visit("/");
  });

  xit("changes pages", () => {
    cy.get("[aria-label='footer-search']").click();
    cy.get("[aria-label='footer-list']").click();
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='footer-share']").click();
  });

  xit("changes languages", () => {
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='settings-English']").click();
    cy.contains("Settings");
    cy.get("[aria-label='settings-Italiano']").click();
    cy.contains("Configurazione");
    cy.get("[aria-label='settings-Castellano']").click();
    cy.contains("Configuración");
  });

  it("makes a selection and clears it after", () => {
    // Arrange
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='settings-English']").click();
    cy.get("[aria-label='footer-search']").click();

    // Interact
    cy.get("#session").select("20231203");
    cy.get("#ZoneOR").select("china");
    cy.get("#ZoneAND").select("eeuu");
    cy.get("#SectorOR").select("energía");
    cy.get("#SectorAND").select("materias primas");
    cy.get("#TagsOR").select("financiero");
    cy.get("#TagsAND").select("cadena de suministro");
    cy.get("[type='text']").type("test");

    // Assert
    cy.get("#session > option:selected").should("have.text", "20231203");
    cy.get("#ZoneOR > option:selected").should("have.text", "china");
    cy.get("#ZoneAND > option:selected").should("have.text", "eeuu");
    // it has more than one label because of the nature of the OR selector
    cy.get("#SectorOR > option:selected").should("have.text", "energíagas");
    cy.get("#SectorAND > option:selected").should(
      "have.text",
      "materias primas"
    );
    // it has more than one label because of the nature of the OR selector
    cy.get("#TagsOR > option:selected").should(
      "have.text",
      "bancos centralesdeudafinancieropolítica monetariatipos"
    );
    cy.get("#TagsAND > option:selected").should(
      "have.text",
      "cadena de suministro"
    );
    cy.get("[type='text']").should("have.value", "test");

    // Interact
    cy.findByText("Clear").click();

    // Negate previous assertions
    // Assert
    cy.get("#session > option:selected").should("not.have.text", "20231203");
    cy.get("#ZoneOR > option:selected").should("not.have.text", "china");
    cy.get("#ZoneAND > option:selected").should("not.have.text", "eeuu");
    // it has more than one label because of the nature of the OR selector
    cy.get("#SectorOR > option:selected").should("not.have.text", "energíagas");
    cy.get("#SectorAND > option:selected").should(
      "not.have.text",
      "materias primas"
    );
    // it has more than one label because of the nature of the OR selector
    cy.get("#TagsOR > option:selected").should(
      "not.have.text",
      "bancos centralesdeudafinancieropolítica monetariatipos"
    );
    cy.get("#TagsAND > option:selected").should(
      "not.have.text",
      "cadena de suministro"
    );
    cy.get("[type='text']").should("not.have.value", "test");

    // Positive assertions
    cy.get("#session > option:selected").should("have.text", "all");
    cy.get("#ZoneOR > option:selected").should("have.text", "all");
    cy.get("#ZoneAND > option:selected").should("have.text", "any");
    cy.get("#SectorOR > option:selected").should("have.text", "all");
    cy.get("#SectorAND > option:selected").should("have.text", "any");
    cy.get("#TagsOR > option:selected").should("have.text", "all");
    cy.get("#TagsAND > option:selected").should("have.text", "any");
    cy.get("[type='text']").should("have.value", "");

    // Interact
  });
});
