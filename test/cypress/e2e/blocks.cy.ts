describe('Blocks Page', () => {
  beforeEach(() => cy.visit('/blocks'));

  it('should display title', () => {
    const blocksPageTitle = 'Blocks';

    cy.get('h1').contains(blocksPageTitle).should('be.visible');
  });
});
