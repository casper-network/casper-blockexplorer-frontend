import { mockDeploy } from './data/mockDeploy';

const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'ipad-2', 'macbook-16'];

const {
  deployHash,
  truncatedDeployHash,
  blockHash,
  truncatedBlockHash,
  publicKey,
  truncatedPublicKey,
} = mockDeploy;

describe('Deploy Page', () => {
  sizes.forEach(size => {
    beforeEach(() => {
      cy.visit(`/deploy/${deployHash}`);
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

    it(`can visit deploy page on size ${size} screen`, () => {
      cy.viewport(size);
      cy.contains('Deploy Hash').should('be.visible');
      cy.contains(deployHash.slice(0, 5)).should('be.visible');
    });

    it(`should render deploy details card on a size ${size} screen`, () => {
      cy.viewport(size);
      cy.getByData('deploy-details-card').should('be.visible');
    });

    it(`should render transaction details card on a size ${size} screen`, () => {
      cy.viewport(size);
      cy.getByData('transaction-details-card').should('be.visible');
    });

    it(`should render footer on a ${size} screen`, () => {
      cy.viewport(size);
      cy.getByData('footer').should('exist');
    });

    it(`should expand and collapse block hash on a size ${size} heading`, () => {
      cy.viewport(size);
      if (size === 'macbook-16') {
        cy.getByData('hash-heading')
          .contains(truncatedBlockHash)
          .should('be.visible')
          .getByData('hash-expand-contract-button')
          .should('contain', 'Expand')
          .click()
          .getByData('hash-heading')
          .should('contain', blockHash)
          .getByData('hash-expand-contract-button')
          .should('contain', 'Collapse')
          .click()
          .getByData('hash-heading')
          .should('contain', truncatedBlockHash);
      } else {
        cy.getByData('hash-heading')
          .contains(truncatedBlockHash)
          .should('be.visible')
          .getByData('hash-expand-contract-button')
          .should('not.be.visible');
      }
    });

    it(`should render links on a ${size} screen`, () => {
      cy.viewport(size);
      if (size === 'macbook-16') {
        cy.getByData('block-hash-link')
          .contains(blockHash)
          .should('be.visible');
        cy.getByData('public-key-link')
          .contains(publicKey)
          .should('be.visible');
        cy.getByData('hash-heading').contains(deployHash).should('be.visible');
      } else {
        cy.getByData('block-hash-link')
          .contains(truncatedBlockHash)
          .should('be.visible');
        cy.getByData('public-key-link')
          .contains(truncatedPublicKey)
          .should('be.visible');
        cy.getByData('hash-heading')
          .contains(truncatedDeployHash)
          .should('be.visible');
      }
    });

    it(`should navigate to block page on a ${size} screen`, () => {
      cy.viewport(size);
      if (size === 'macbook-16') {
        cy.getByData('block-hash-link').contains(blockHash).click();
        cy.location('pathname').should('eq', `/block/${blockHash}`);
      } else {
        cy.getByData('block-hash-link').contains(truncatedBlockHash).click();
        cy.location('pathname').should('eq', `/block/${blockHash}`);
      }
    });

    it(`should navigate to account page on a ${size} screen`, () => {
      cy.viewport(size);
      if (size === 'macbook-16') {
        cy.getByData('public-key-link').contains(publicKey).click();
        cy.location('pathname').should('eq', `/account/${publicKey}`);
      } else {
        cy.getByData('public-key-link').contains(truncatedPublicKey).click();
        cy.location('pathname').should('eq', `/account/${publicKey}`);
      }
    });
  });
});
