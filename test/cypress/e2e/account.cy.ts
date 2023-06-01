import { hashes } from './hashes/hashes';

const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'macbook-13'];

const { publicKey, accountHash, truncatedAccountHash } = hashes();

// const accountHash =
//   '017fec504c642f2b321b8591f1c3008348c57a81acafceb5a392cf8416a5fb4a3c';

describe('Account Page', () => {
  // const middlewareUrl = Cypress.env('NODE_URL') as string;

  // it('can visit at /account/:accountHash', () => {
  // cy.intercept({
  //   method: 'POST',
  //   url: `${middlewareUrl}/rpc`,
  // }).as('accountFetch');

  // cy.visit(`/account/${accountHash}`);

  // cy.wait('@accountFetch').its('response.statusCode').should('equal', 200);

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
        });
      } else cy.getByData('h1').should('contain', 'Account Details');
    });
  });
});
