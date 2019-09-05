describe('useDomInput component', function() {
  it('Sets default from React', () =>
    function() {
      cy.goToDemo()
        .get('#firstName')
        .should('have.value', 'Default From React');
    });

  it('empties input', () => {
    cy.goToDemo()
      .get('#firstName')
      .clear()
      .should('have.value', '');
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
