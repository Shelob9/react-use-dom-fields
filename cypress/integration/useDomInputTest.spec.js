describe('useDomInput component', function() {
  it('Loads correctly', function() {
    cy.goToDemo().contains('React App');
  });

  it('Sets default from React', () =>
    function() {
      cy.goToDemo()
        .get('#firstName')
        .should('have.value', 'Default From React');
    });

  it('Allows input to update naturally', function() {
    cy.goToDemo()
      .get('#firstName')
      .clear()
      .get('#firstName')
      .type('Green Skull')
      .should('have.value', 'Green Skull');
  });

  it('Updates React state', function() {
    cy.goToDemo()
      .get('#firstName')
      .clear()
      .get('#firstName')
      .type('Green Skull')
      .should('have.value', 'Green Skull')
      .get('#firstName-value')
      .contains('Green Skull');
  });
});
