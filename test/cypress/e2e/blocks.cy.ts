describe('Blocks Page', () => {
  beforeEach(() => cy.visit('/blocks'));

  it('should display title', () => {
    const blocksPageTitle = 'Blocks';

    cy.get('h1').contains(blocksPageTitle).should('be.visible');

    const blocksTableHeading = 'Latest Blocks';

    cy.contains(blocksTableHeading).should('be.visible');
  });
});
