describe('Block Page', () => {
  it('can visit at /block/:blockHeight', () => {
    const blockHeight = 1;

    cy.visit(`/block/${blockHeight}?type=height`);

    cy.contains('Block Height').should('be.visible');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    cy.getByData('block-height').should('be.visible').contains(blockHeight);
  });
});
