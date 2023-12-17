import React from "react";
import Settings from "./Settings";
import { withAppContext } from "../helpers/withAppContext";

describe("<Settings />", () => {
  it("renders", () => {
    cy.mount(withAppContext(<Settings />));
    cy.contains("Configuración");
  });
});
