import { accountTestData } from './test-data/account-test-data';

const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'ipad-2', 'macbook-13'];
const { publicKey, accountHash, truncatedAccountHash } = accountTestData();

describe('Account Page', () => {
  sizes.forEach(size => {
    it(`Should display an h1, an avatar and truncated hash on a ${size.toString()} screen`, () => {
      cy.viewport(size);

      cy.visit(`/account/${publicKey}`);

      if (size === 'macbook-13') {
        cy.getByData('h1').should('contain', 'Account Details');

        cy.getByData('avatar-icon').should('be.visible');

        cy.getByData('h2').should('contain', `${truncatedAccountHash}`);

        cy.getByData('button')
          .eq(5)
          .should('contain', 'Expand')
          .click()
          .getByData('h2')
          .should('contain', `${accountHash}`)
          .getByData('button')
          .should('contain', 'Collapse')
          .getByData('button')
          .eq(5)
          .click()
          .should('contain', 'Expand');

        context('Account Details Card', () => {
          cy.getByData('account-hash-h3').should('contain', 'Account Hash');
          cy.getByData('public-key-h3').should('contain', 'Public Key');
          cy.getByData('balance-h3').should('contain', 'Balance');
        });
      } else {
        cy.getByData('h1').should('contain', 'Account Details');
        cy.getByData('avatar-icon').should('be.visible');
        cy.getByData('h2').should('contain', `${truncatedAccountHash}`);
      }
    });
  });
});

// const middlewareUrl = Cypress.env('NODE_URL') as string;

// it('can visit at /account/:accountHash', () => {
// cy.intercept({
//   method: 'POST',
//   url: `${middlewareUrl}/rpc`,
// }).as('accountFetch');

// cy.visit(`/account/${accountHash}`);

// cy.wait('@accountFetch').its('response.statusCode').should('equal', 200);
// });
