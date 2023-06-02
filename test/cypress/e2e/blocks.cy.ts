describe('Blocks Page', () => {
  beforeEach(() => cy.visit('/blocks'));

  it('should title visible', () => {
    const blocksPageTitle = 'Blocks';
    cy.get('p').contains(blocksPageTitle).should('be.visible');
  });

  // it('should load more blocks');
});
