import { blockTestHashes } from './data/blockTestHashes';

const sizes: Cypress.ViewportPreset[] = ['iphone-6', 'ipad-2', 'macbook-16'];

const {
  blockHash,
  parentHash,
  validator,
  blockHeight,
  deployHash,
  truncatedParentHash,
  truncatedDeployHash,
  truncatedValidatorHash,
  truncatedTransfer,
  transferDeployHash,
  truncatedBlockHash,
} = blockTestHashes.mainnet;

describe('Block Page', () => {
  beforeEach(() => {
    cy.visit(`/block/${blockHash}`);
  });

  const rawDataHeading = 'AccordionItemHeading';
  const rawDataButton = 'AccordionItemButton';

  context('Block Header', () => {
    sizes.forEach(size => {
      it('should expand and collapse block hash', () => {
        cy.viewport(size);
        if (size === 'macbook-16') {
          cy.getByData('hash-heading')
            .should('contain', `${truncatedBlockHash}`)
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
        }
      });
    });
  });

  context('Block Details', () => {
    sizes.forEach(size => {
      it('should render block details card based on view size', () => {
        cy.viewport(size);
        if (size === 'macbook-16') {
          cy.getByData('block-details-card').should('exist');
        } else {
          cy.getByData('mobile-block-details-card').should('exist');
        }
      });

      it('can visit at /block/:blockHeight', () => {
        cy.viewport(size);
        if (size === 'macbook-16') {
          cy.contains('Block Height').should('be.visible');

          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          cy.getByData('block-height')
            .should('be.visible')
            .contains(blockHeight);
        }
      });

      it('should navigate to parent hash block page', () => {
        cy.viewport(size);
        if (size === 'macbook-16') {
          cy.contains(parentHash)
            .click()
            .location('pathname')
            .should('eq', `/block/${parentHash}`);
        } else {
          cy.contains(truncatedParentHash)
            .click()
            .location('pathname')
            .should('eq', `/block/${parentHash}`);
        }
      });

      it('should navigate to validator account', () => {
        cy.viewport(size);
        if (size === 'macbook-16') {
          cy.contains(validator)
            .click()
            .location('pathname')
            .should('eq', `/account/${validator}`);
        } else {
          cy.contains(truncatedValidatorHash)
            .click()
            .location('pathname')
            .should('eq', `/account/${validator}`);
        }
      });

      it('should navigate to transfer deploy page', () => {
        cy.viewport(size);
        cy.contains(truncatedTransfer)
          .click()
          .location('pathname')
          .should('eq', `/deploy/${transferDeployHash}`);
      });

      it('should navigate to deploy page', () => {
        cy.viewport(size);
        cy.contains(truncatedDeployHash)
          .click()
          .location('pathname')
          .should('eq', `/deploy/${deployHash}`);
      });
    });
  });

  context('Raw Data display', () => {
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
