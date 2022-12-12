describe('Blocks Page', () => {
  it('can visit at /block/:blockHeight?type=height', () => {
    cy.visit('/blocks');

    const blocksPageTitle = 'Blocks';

    // TODO: This is extremely hacky; we should consider having a BE middleware layer to wait on
    cy.wait(10000);

    cy.get('h2').contains(blocksPageTitle).should('be.visible');
  });
});
