import { hashes } from './data/hashes';

const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'ipad-2', 'macbook-16'];
const { publicKey, truncatedPublicKey, accountHash, truncatedAccountHash } =
  hashes.mainnet;

describe('Account Page', () => {
  beforeEach(() => cy.visit(`/account/${publicKey}`));

  context('Account Header', () => {
    sizes.forEach(size => {
      it.only(`Should display an h1, an avatar and truncated hash on a ${size} screen`, () => {
        cy.viewport(size);

        if (size === 'macbook-16') {
          cy.getByData('h1-account-details').should(
            'contain',
            'Account Details',
          );

          cy.getByData('avatar-icon').should('be.visible');

          cy.getByData('hash-heading').should(
            'contain',
            `${truncatedAccountHash}`,
          );

          cy.getByData('hash-expand-contract-button')
            .should('contain', 'Expand')
            .click()
            .getByData('hash-heading')
            .should('contain', `${accountHash}`)
            .getByData('hash-expand-contract-button')
            .should('contain', 'Collapse')
            .getByData('hash-expand-contract-button')
            .click()
            .should('contain', 'Expand');
        } else {
          cy.getByData('h1-account-details').should(
            'contain',
            'Account Details',
          );
          cy.getByData('avatar-icon').should('be.visible');
          cy.getByData('hash-heading').should(
            'contain',
            `${truncatedAccountHash}`,
          );
        }
      });
    });
  });

  context('Account Details', () => {
    // TODO: copyToClipBoard tests pending UiKit#176
    sizes.forEach(size => {
      it(`Should display account details on a ${size} screen`, () => {
        cy.viewport(size);
        if (size === 'macbook-16') {
          cy.getByData('account-hash-h3').should('contain', 'Account Hash');
          cy.getByData('account-hash').should('contain', `${accountHash}`);

          cy.getByData('public-key-h3').should('contain', 'Public Key');
          cy.getByData('public-key').should('contain', `${publicKey}`);

          cy.getByData('balance-h3').should('contain', 'Balance');

          cy.getByData('raw-data-h3').should('contain', 'Raw Data');
        } else {
          cy.getByData('account-hash-h3').should('contain', 'Account Hash');
          cy.getByData('account-hash').should(
            'contain',
            `${truncatedAccountHash}`,
          );
          cy.getByData('public-key-h3').should('contain', 'Public Key');
          cy.getByData('public-key').should('contain', `${truncatedPublicKey}`);

          cy.getByData('balance-h3').should('contain', 'Balance');
          cy.getByData('raw-data-h3').should('contain', 'Raw Data');
        }
      });
    });
  });

  context('Raw Data display', () => {
    const rawDataHeading = 'AccordionItemHeading';
    const rawDataButton = 'AccordionItemButton';

    sizes.forEach(size => {
      it(`should render the Show Raw Data button on a ${size} screen`, () => {
        cy.get(`[data-accordion-component=${rawDataHeading}]`).should(
          'contain',
          'Show Raw Data',
        );
      });

      it('should display and hide raw data on click', () => {
        cy.get(`[data-accordion-component=${rawDataButton}]`)
          .click()
          .get(`[data-accordion-component=${rawDataHeading}]`)
          .should('contain', 'Hide Raw Data')
          .get('.object-key-val')
          .should('contain', 'root":{...}')
          .get(`[data-accordion-component=${rawDataButton}]`)
          .click()
          .get(`[data-accordion-component=${rawDataHeading}]`)
          .should('contain', 'Show Raw Data');
      });
    });
  });
});
