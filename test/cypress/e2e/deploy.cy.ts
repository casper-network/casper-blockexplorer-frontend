const deployHash =
  '4ccdb1ab1d47034f615f0e9a16ecbe041d583b3175b84442d9138b53f4764e27';

describe('Deploy Page', () => {
  const middlewareUrl = Cypress.env('MIDDLEWARE_URL') as string;

  it.skip('can visit at /deploy/deployHash', () => {
    cy.intercept({
      method: 'POST',
      url: `${middlewareUrl}/rpc`,
    }).as('deployFetch');

    cy.visit(`/deploy/${deployHash}`);

    cy.wait('@deployFetch').its('response.statusCode').should('equal', 200);

    const deployCardTitle = 'Deploy Details';

    cy.contains(deployCardTitle).should('be.visible');
  });
});
