import { accountTestData } from './data/account-test-data';

const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'ipad-2', 'macbook-16'];
const { publicKey, truncatedPublicKey, accountHash, truncatedAccountHash } =
  accountTestData;

describe('Account Page', () => {
  beforeEach(() => cy.visit(`/account/${publicKey}`));

  context('Account Header', () => {
    sizes.forEach(size => {
      it(`Should display an h1, an avatar and truncated hash on a ${size} screen`, () => {
        cy.viewport(size);

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
        } else {
          cy.getByData('h1').should('contain', 'Account Details');
          cy.getByData('avatar-icon').should('be.visible');
          cy.getByData('h2').should('contain', `${truncatedAccountHash}`);
        }
      });
    });
  });

  context('Account Details', () => {
    // TODO: copyToClipBoard tests pending #361
    sizes.forEach(size => {
      it(`Should display account details on a ${size} screen`, () => {
        if (size === 'macbook-13') {
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
