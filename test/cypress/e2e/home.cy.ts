const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'ipad-2', 'macbook-16'];

describe('Home Page', () => {
  const siteTitle = Cypress.env('ORG_NAME') as string;
  const homePageHeroText = `Discover the ${
    siteTitle ? `${siteTitle} ` : ''
  }blockchain.`;

  beforeEach(() => {
    cy.visit('/home');
  });

  sizes.forEach(size => {
    it(`Should display homepage on ${size} screen`, () => {
      cy.viewport(size);
      cy.visit('/');
      cy.clearLocalStorage('users-status');
      cy.contains(homePageHeroText).should('be.visible');
      cy.reload();
      cy.contains(homePageHeroText).should('not.be.visible');
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

    it(`should render cards on a ${size} screen`, () => {
      cy.viewport(size);
      cy.getByData('blocks-info').should('exist');
      cy.getByData('deploys-info').should('exist');
      cy.getByData('blocks-info').should('exist');
    });

    it(`should render footer on a ${size} screen`, () => {
      cy.viewport(size);
      cy.getByData('footer').should('exist');
    });

    it(`should adjust card styles on a ${size} screen`, () => {
      cy.viewport(size);
      if (size === 'macbook-16') {
        cy.getByData('home-content-container').should(
          'have.css',
          'flex-direction',
          'row',
        );
      } else if (size === 'iphone-6') {
        cy.getByData('home-content-container').should(
          'have.css',
          'flex-direction',
          'column',
        );
      }
    });
  });
});
