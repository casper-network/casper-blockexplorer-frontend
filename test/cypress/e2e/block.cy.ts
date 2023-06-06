import { blockTestHashes } from './hashes/blockTestHashes';

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
} = blockTestHashes();

describe('Block Page', () => {
  beforeEach(() => {
    cy.visit(`/block/${blockHash}`);
  });

  const rawDataHeading = 'AccordionItemHeading';
  const rawDataButton = 'AccordionItemButton';

  it('can visit at /block/:blockHeight', () => {
    cy.contains('Block Height').should('be.visible');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    cy.getByData('block-height').should('be.visible').contains(blockHeight);
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

  it('should navigate to parent hash block page', () => {
    cy.contains(truncatedParentHash)
      .click()
      .location('pathname')
      .should('eq', `/block/${parentHash}`);
  });

  it('should navigate to validator account', () => {
    cy.contains(truncatedValidatorHash)
      .click()
      .location('pathname')
      .should('eq', `/account/${validator}`);
  });

  it('should navigate to transfer deploy page', () => {
    cy.contains(truncatedTransfer)
      .click()
      .location('pathname')
      .should('eq', `/deploy/${transferDeployHash}`);
  });

  it('should navigate to deploy page', () => {
    cy.contains(truncatedDeployHash)
      .click()
      .location('pathname')
      .should('eq', `/deploy/${deployHash}`);
  });

  it('should expand and collapse block hash', () => {
    cy.getByData('hash')
      .eq(0)
      .should('contain', `${truncatedBlockHash}`)
      .viewport('macbook-16')
      .getByData('button')
      .eq(5)
      .should('contain', 'Expand')
      .click()
      .getByData('hash')
      .eq(0)
      .should('contain', blockHash)
      .getByData('button')
      .eq(5)
      .should('contain', 'Collapse')
      .click()
      .getByData('hash')
      .eq(0)
      .should('contain', truncatedBlockHash);
  });
});
