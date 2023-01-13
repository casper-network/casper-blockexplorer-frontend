describe('Peers Page', () => {
  it('can visit at /peers', () => {
    cy.visit('/peers');

    const peersPageTitle = 'Connected Peers';

    cy.contains(peersPageTitle).should('be.visible');
  });
});
