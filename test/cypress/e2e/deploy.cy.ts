import { hashes } from './data';

const { deployHash } = hashes.mainnet;

describe('Deploy Page', () => {
  it('can visit at /deploy/deployHash', () => {
    cy.visit(`/deploy/${deployHash}`);

    cy.contains('Deploy Hash').should('be.visible');
    cy.contains(deployHash.slice(0, 5)).should('be.visible');
  });
});
