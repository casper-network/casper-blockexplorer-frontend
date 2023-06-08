const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'macbook-13'];

describe('Home Page', () => {
  const siteTitle = Cypress.env('ORG_NAME') as string;

  sizes.forEach(size => {
    it(`Should display homepage on ${size.toString()} screen`, () => {
      cy.viewport(size);

      cy.visit('/');

      const homePageHeroText = `Discover the ${
        siteTitle ? `${siteTitle} ` : ''
      }blockchain.`;

      cy.contains(homePageHeroText).should('be.visible');

      if (size === 'macbook-13') {
        // Should navigate to Blocks page
        cy.get('a').contains('Blocks').click();
        cy.location('pathname').should('eq', '/blocks');

        // Should navigate to Peers page
        cy.get('a').contains('Peers').click();
        cy.location('pathname').should('eq', '/peers');

        // Should navigate to Home page
        cy.get('a').contains('Home').click();
        cy.location('pathname').should('eq', '/');
      }
    });
  });
});
