const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'ipad-2', 'macbook-16'];

describe('Blocks Page', () => {
  beforeEach(() => cy.visit('/blocks'));

  sizes.forEach(size => {
    it('should display title', () => {
      cy.viewport(size);
      const blocksPageTitle = 'Blocks';

      cy.get('h1').contains(blocksPageTitle).should('be.visible');

      const blocksTableHeading = 'Latest Blocks';

      cy.contains(blocksTableHeading).should('be.visible');
    });

    it(`Should display blocks table on ${size} screen`, () => {
      cy.viewport(size);
      cy.getByData('base-table').should('be.visible');
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

    it(`should navigate to peers page on a ${size} screen`, () => {
      cy.viewport(size);
      if (size === 'macbook-16') {
        cy.get('a').contains('Peers').click();
        cy.location('pathname').should('eq', '/peers');
      } else {
        cy.getByData('styled-button').click();
        cy.getByData('mobile-link').contains('Peers').click();
        cy.location('pathname').should('eq', '/peers');
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
