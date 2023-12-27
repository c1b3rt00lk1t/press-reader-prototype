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

  xit("makes a selection and clears it after", () => {
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
  });

  xit("makes a selection and navigate through the results", () => {
    // Arrange
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='settings-English']").click();
    cy.get("[aria-label='footer-search']").click();

    // Interact
    cy.get("#TagsOR").select("financiero");
    cy.findByRole("button", { name: "Search" }).click();
    cy.get("ul > :nth-child(1)").click();

    //Assert
    cy.contains("EEUU");
    cy.contains("ECONOMÍA");
    cy.contains("FINANCIERO");

    //Interact
    cy.get(".to-next").click();
    //Assert
    cy.contains("EEUU");
    cy.contains("ECONOMÍA");
    cy.contains("FINANCIERO");
    cy.get(".to-previous").click();
    //Assert
    cy.contains("EEUU");
    cy.contains("ECONOMÍA");
    cy.contains("FINANCIERO");
    cy.get("[aria-label='footer-share']").click();
  });

  xit("enables local folder in Desktop", () => {
    // Arrange
    cy.viewport(1600, 900);
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='settings-English']").click();

    // Interact
    cy.findByText("Desktop (select a folder)").click();

    // Assert
    cy.get(".only-wider-screen svg").should(
      "have.attr",
      "aria-label",
      "checked"
    );
  });

  it("allows to prefetch last session in Mobile", () => {
    // Arrange
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='settings-English']").click();

    // Intercept GET requests and respond with a predefined response
    cy.intercept(
      "GET",
      "https://firebasestorage.googleapis.com/v0/b/press-uploader-2348f.appspot.com/**",
      {
        statusCode: 200,
        body: "Mocked Response",
      }
    ).as("getRequests");

    // Assert
    cy.findByText("Last prefetched: 00000000").should("exist");

    // Interact
    cy.findByText("Prefetch last session").click();

    // Wait for the intercepted requests
    cy.wait("@getRequests").then(({ response }) => {
      // Assertions on the intercepted requests
      const { body, statusCode } = response;
      expect(statusCode).to.equal(200);
      expect(body).to.equal("Mocked Response");
    });

    // Assert
    cy.findByText("Last prefetched: 20231203").should("exist");
  });
});
