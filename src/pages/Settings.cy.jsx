import React from "react";
import Settings from "./Settings";
import { withAppContext } from "../helpers/withAppContext";

describe("<Settings />", () => {
  it("renders", () => {
    cy.mount(withAppContext(<Settings />));
    cy.contains("Configuración");
  });

  it("changes language", () => {
    cy.mount(withAppContext(<Settings />));
    cy.get("[aria-label=settings-English]").click();
    cy.contains("Settings");
    cy.get("[aria-label=settings-Castellano]").click();
    cy.contains("Configuración");
    cy.get("[aria-label=settings-Italiano").click();
    cy.contains("Configurazione");
  });
});
