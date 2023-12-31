import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";

function ThrowsError() {
  throw new Error("Error thrown from ThrowsError");
}

describe("<ErrorBoundary />", () => {
  it("renders when an error is thrown", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ErrorBoundary>
        <ThrowsError />
      </ErrorBoundary>
    );
    // Wait for the uncaught exception produced on purpose
    cy.on("uncaught:exception", () => {
      return false;
    });
  });
});
