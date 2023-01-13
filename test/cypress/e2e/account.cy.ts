const accountHash =
  '017fec504c642f2b321b8591f1c3008348c57a81acafceb5a392cf8416a5fb4a3c';

describe('Account Page', () => {
  const middlewareUrl = Cypress.env('MIDDLEWARE_URL') as string;

  it.skip('can visit at /account/:accountHash', () => {
    cy.intercept({
      method: 'POST',
      url: `${middlewareUrl}/rpc`,
    }).as('accountFetch');

    cy.visit(`/account/${accountHash}`);

    cy.wait('@accountFetch').its('response.statusCode').should('equal', 200);

    const accountCardTitle = 'Account Details';

    cy.contains(accountCardTitle).should('be.visible');
  });
});
