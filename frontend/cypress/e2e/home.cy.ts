describe('Home Page', () => {
  it('can visit at root url', () => {
    cy.visit('/');

    expect(true).to.equal(true);
  });
});
