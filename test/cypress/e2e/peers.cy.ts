const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'ipad-2', 'macbook-16'];

describe('Peers Page', () => {
  sizes.forEach(size => {
    beforeEach(() => {
      cy.visit('/peers');
    });

    it(`should render connected peers header on a size ${size} screen`, () => {
      cy.viewport(size);
      cy.getByData('peers-header').should('be.visible');
    });

    it(`should navigate to blocks page on a ${size} screen`, () => {
      cy.viewport(size);
      if (size === 'macbook-16') {
        cy.get('a').contains('Blocks').click();
        cy.location('pathname').should('eq', '/blocks');
      } else {
        cy.getByData('styled-button').click();
        cy.getByData('mobile-link').contains('Blocks').click();
        cy.location('pathname').should('eq', '/blocks');
      }
    });

    it(`should navigate to deploys page on a ${size} screen`, () => {
      cy.viewport(size);
      if (size === 'macbook-16') {
        cy.get('a').contains('Deploys').click();
        cy.location('pathname').should('eq', '/deploys');
      } else {
        cy.getByData('styled-button').click();
        cy.getByData('mobile-link').contains('Deploys').click();
        cy.location('pathname').should('eq', '/deploys');
      }
    });
    it(`should navigate to validators page on a ${size} screen`, () => {
      cy.viewport(size);
      if (size === 'macbook-16') {
        cy.get('a').contains('Validators').click();
        cy.location('pathname').should('eq', '/validators');
      } else {
        cy.getByData('styled-button').click();
        cy.getByData('mobile-link').contains('Validators').click();
        cy.location('pathname').should('eq', '/validators');
      }
    });

    it(`should navigate to home page on a ${size} screen`, () => {
      cy.viewport(size);
      if (size === 'macbook-16') {
        cy.get('a').contains('Home').click();
        cy.location('pathname').should('eq', '/');
      } else {
        cy.getByData('styled-button').click();
        cy.getByData('mobile-link').contains('Home').click();
        cy.location('pathname').should('eq', '/');
      }
    });

    it(`should render header on a ${size} screen`, () => {
      cy.viewport(size);
      if (size === 'macbook-16') {
        cy.getByData('search-select').should('exist');
        cy.getByData('mobile-select').should('not.exist');
        cy.getByData('desktop-nav').should('be.visible');
      } else if (size === 'ipad-2') {
        cy.getByData('search-select').should('exist');
        cy.getByData('mobile-select').should('not.exist');
        cy.getByData('desktop-nav').should('not.be.visible');
      } else {
        cy.getByData('search-select').should('not.exist');
        cy.getByData('mobile-select').should('exist');
        cy.getByData('desktop-nav').should('not.be.visible');
      }
    });

    it(`should render footer on a ${size} screen`, () => {
      cy.viewport(size);
      cy.getByData('footer').should('exist');
    });
  });
});
