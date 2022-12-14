describe('Peers Page', () => {
  it.skip('can visit at /peers', () => {
    cy.visit('/peers');

    cy.wait(5000);

    const peersPageTitle = 'Connected Peers';

    cy.contains(peersPageTitle).should('be.visible');
  });
});
