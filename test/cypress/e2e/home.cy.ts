describe('Home Page', () => {
  it('can visit at root url', async () => {
    cy.visit('/');

    const homePageHeroText = 'Discover the Casper Blockchain.';

    cy.contains(homePageHeroText).should('be.visible');
  });
});
