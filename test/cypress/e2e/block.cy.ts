const blockHeight = 1;

describe('Block Page', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const middlewareUrl: string =
    Cypress.env('MIDDLEWARE_URL') || 'http://localhost:4000';

  it.skip('can visit at /block/:blockHeight?type=height', () => {
    cy.intercept({
      method: 'POST',
      url: `${middlewareUrl}/rpc`,
    }).as('blockFetch');

    cy.visit(`/block/${blockHeight}?type=height`);

    cy.wait('@blockFetch').its('response.statusCode').should('equal', 200);

    const truncatedBlockHash = 'f3499...718f1';

    cy.contains(truncatedBlockHash).should('be.visible');
  });
});
