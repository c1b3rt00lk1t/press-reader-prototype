import React from "react";
import Settings from "./Settings";
import { withPressReaderContext } from "../helpers/withPressReaderContext";
import { withLanguageContext } from "../helpers/withLanguageContext";
import { pipe } from "../helpers/pipe";

describe("<Settings />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    // cy.mount(withLanguageContext(withPressReaderContext(<Settings />)));
    cy.mount(pipe(withPressReaderContext, withLanguageContext)(<Settings />));
  });
});
