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

  it("makes a selection and clears it after", () => {
    // Arrange
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='settings-English']").click();
    cy.get("[aria-label='footer-search']").click();

    // Interact

    cy.get(":nth-child(2) > :nth-child(2) > :nth-child(1) > input").type(
      "2020-01-10"
    );
    cy.get(":nth-child(2) > :nth-child(2) > :nth-child(2) > input").type(
      "2024-01-10"
    );

    cy.get("#session").select("20231203");
    cy.get("#ZoneOR").select("china");
    cy.get("#ZoneAND").select("eeuu");
    cy.get("#SectorOR").select("energía");
    cy.get("#SectorAND").select("materias primas");
    cy.get("#TagsOR").select("financiero");
    cy.get("#TagsAND").select("cadena de suministro");
    cy.get("[type='text']").type("test");

    cy.get(":nth-child(7) > .horizontal > :nth-child(1) > input").click();
    cy.get(":nth-child(7) > .horizontal > :nth-child(2) > input").click();
    cy.get(":nth-child(7) > .horizontal > :nth-child(3) > input").click();

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
    cy.findByRole("button", { name: "Search" }).click();
    cy.get("[aria-label='footer-search']").click();
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

    // Wait for the uncaught exception
    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include("DOMException: Document is not focused.");
      return false;
    });
  });

  it("selects by text in all possible scenarios and orders", () => {
    // Arrange
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='settings-English']").click();
    cy.get("[aria-label='footer-search']").click();
    cy.findByRole("button", { name: "Search" }).click();
    cy.get("[aria-label='footer-search']").click();
    cy.findByText("Clear").click();

    // Interact
    cy.get("[type='text']").type("china");
    cy.get(":nth-child(7) > .horizontal > :nth-child(1) > input").click();
    cy.findByRole("button", { name: "Search" }).click();
    cy.get("[aria-label='footer-search']").click();

    // Arrange
    cy.findByText("Clear").click();

    // Interact
    cy.get("[type='text']").type("gas");
    cy.get(":nth-child(7) > .horizontal > :nth-child(2) > input").click();
    cy.findByRole("button", { name: "Search" }).click();
    cy.get("[aria-label='footer-search']").click();

    // Arrange
    cy.findByText("Clear").click();

    // Interact
    cy.get("[type='text']").type("tipos");
    cy.get(":nth-child(7) > .horizontal > :nth-child(3) > input").click();
    cy.findByRole("button", { name: "Search" }).click();
    cy.get("[aria-label='footer-search']").click();

    // Arrange
    cy.findByText("Clear").click();

    // Interact
    cy.get("[type='text']").type("Expansión");
    cy.get(":nth-child(7) > .horizontal > :nth-child(1) > input").click();
    cy.findByRole("button", { name: "Search" }).click();
    cy.get("[aria-label='footer-search']").click();
  });

  it("makes a selection and navigate through some results and goes back to the items list", () => {
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
    cy.get("body").type("{rightArrow}");
    // cy.get(".to-next").click();
    cy.wait(1000);
    //Assert
    cy.contains("EEUU");
    cy.contains("ECONOMÍA");
    cy.contains("FINANCIERO");
    cy.get("body").type("{rightArrow}");
    //Assert
    cy.contains("EEUU");
    cy.contains("ECONOMÍA");
    cy.contains("FINANCIERO");
    cy.get("[aria-label='footer-share']").click();

    //Interact
    cy.get(".to-next").click();
    cy.wait(1000);
    cy.get(".to-next").click();
    cy.wait(1000);
    cy.get(".to-next").click();
    cy.wait(1000);
    cy.get(".to-next").click();
    cy.wait(1000);
    cy.get(".to-next").click();
    cy.wait(1000);
    cy.get(".to-next").click();
    cy.wait(1000);
    cy.get(".to-next").click();
    cy.wait(1000);
    cy.get(".to-next").click();
    cy.wait(1000);
    cy.get(".to-next").click();

    cy.wait(1000);
    cy.get("[aria-label='footer-list']").click();
    cy.wait(1000);
    cy.contains("Junk Debt Market Is Shrinking");

    // Wait for the uncaught exception
    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include("DOMException: Document is not focused.");
      return false;
    });
  });

  it("copies title and link to clipboard", () => {
    // Arrange
    cy.viewport(1600, 900);
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, "writeText")
        .returns(Promise.resolve())
        .as("writeTextClipboard");
    });

    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, "write")
        .returns(Promise.resolve())
        .as("writeClipboard");
    });

    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='settings-English']").click();
    cy.get("[aria-label='footer-search']").click();

    cy.get("#TagsOR").select("financiero");
    cy.findByRole("button", { name: "Search" }).click();

    // Interact
    cy.get("ul > :nth-child(1) [aria-label='Copy link to clipboard']")
      .focus()
      .click();

    cy.get("ul > :nth-child(1) [aria-label='Copy title to clipboard']")
      .focus()
      .click();

    // Assert
    cy.get("@writeTextClipboard").should("have.been.called");
    cy.get("@writeClipboard").should("have.been.called");

    // Wait for the uncaught exception
    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include("DOMException: Document is not focused.");
      return false;
    });
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
    cy.get(".download-error").should("not.exist");
    cy.get(".download-completed").should("exist");
  });

  it("allows to change prefetching settings", () => {
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

    // Interact
    cy.findByText("Always prefetch last session (once)").click();

    // Assert
    cy.findByText("Always prefetch last session (once)").then((div) => {
      cy.wrap(div).find("svg").should("have.attr", "aria-label", "checked");
    });
    cy.findByText("Always prefetch last session").then((div) => {
      cy.wrap(div).find("svg").should("have.attr", "aria-label", "unchecked");
    });

    cy.wait("@getRequests");

    // Interact
    cy.findByText("Always prefetch last session").click();

    // Assert
    cy.findByText("Always prefetch last session (once)").then((div) => {
      cy.wrap(div).find("svg").should("have.attr", "aria-label", "unchecked");
    });
    cy.findByText("Always prefetch last session").then((div) => {
      cy.wrap(div).find("svg").should("have.attr", "aria-label", "checked");
    });
    cy.wait("@getRequests");
  });

  it("allows to prefetch on submit", () => {
    // Arrange
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='settings-English']").click();

    // Intercept GET requests and respond with a predefined response
    cy.intercept(
      "GET",
      "https://firebasestorage.googleapis.com/v0/b/press-uploader-2348f.appspot.com/**",
      {
        statusCode: 404,
        body: "Mocked Response",
      }
    ).as("getRequests");

    // Interact
    cy.findByText("Prefetch on Search").click();

    // Assert
    cy.findByText("Prefetch on Search").then((div) => {
      cy.wrap(div).find("svg").should("have.attr", "aria-label", "checked");
    });

    // Interact
    cy.get("[aria-label='footer-search']").click();

    cy.findByText("Clear").click();

    cy.get("[type='text']").type("gas");
    cy.get(":nth-child(7) > .horizontal > :nth-child(2) > input").click();
    cy.findByRole("button", { name: "Search" }).click();
    cy.wait("@getRequests");
    cy.get("ul > :nth-child(1)").click();
    cy.wait("@getRequests");
    cy.intercept(
      "GET",
      "https://firebasestorage.googleapis.com/v0/b/press-uploader-2348f.appspot.com/**",
      {
        statusCode: 402,
        body: "Mocked Response",
      }
    ).as("getRequests2");

    cy.get("body").type("{rightArrow}");
    cy.wait("@getRequests2");
  });

  it("handles an error when prefetching last session in Mobile", () => {
    // Arrange
    cy.get("[aria-label='footer-settings']").click();
    cy.get("[aria-label='settings-English']").click();
    // Stub localStorage.setItem to throw an error
    cy.window().then((win) => {
      function fn() {
        throw new Error("Simulated localStorage error");
      }
      cy.stub(win.localStorage, "setItem").callsFake(fn);
    });

    // Interact
    cy.findByText("Prefetch last session").click();

    // Wait for the uncaught exception
    cy.on("uncaught:exception", (err) => {
      // Assert that the error message contains the expected text
      expect(err.message).to.include("Simulated localStorage error");
      return false;
    });
    cy.contains("Settings");
    cy.contains("Last prefetched: 00000000").should("exist");
    cy.get(".download-error").should("exist");
    cy.get(".download-downloaded").should("not.exist");
  });

  it("handles an error in the PDF document rendering", () => {
    // Arrange
    cy.window().focus();
    cy.intercept(
      "GET",
      "https://firebasestorage.googleapis.com/v0/b/press-uploader-2348f.appspot.com/**",
      {
        statusCode: 200,
        body: "Invalid PDF content",
      }
    ).as("pdfRequest");
    cy.get("[aria-label='footer-list']").click();

    //Interact
    cy.get("ul > :nth-child(1)").click();
    cy.wait("@pdfRequest");

    // Wait for the uncaught exception
    cy.on("uncaught:exception", (err) => {
      // Assert that the error message contains the expected text
      expect(err.message).to.include("Simulated pdf content error");
      return false;
    });

    // Wait for the uncaught exception
    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include("DOMException: Document is not focused.");
      return false;
    });

    cy.contains("Failed to load PDF file.");
  });

  it("enables local folder in Desktop", () => {
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

    cy.get("[aria-label='footer-list']").click();
    cy.contains("desktop mode activated, click to select a folder").click();

    // Interact
    // Select a folder in cypress/downloads
    cy.findByText("Desktop (select a folder)").click();
    cy.pause();
    cy.get("[aria-label='footer-list']").click();
    //Assert
    cy.contains("desktop mode activated, click to select a folder").should(
      "not.exist"
    );
  });
});
