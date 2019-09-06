describe('useDomInput component', function() {
  it('Sets default from DOM', () => {
    cy.goToDemo()
      .get('#firstName')
      .should('have.value', 'Default From DOM')
      .get('#firstName-value')
      .contains('Default From DOM');
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
      .wait(200)
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
  //  //toggle-hide

  it('Can be updated by react state React state', function() {
    cy.goToDemo()
      .get('#toggle-hide')
      .check()
      .get('#firstName')
      //Has updated state?
      .should('have.value', 'Text Reset')

      //Can we update state from DOM still?
      .clear()
      .type('Crystal Skull')
      .get('#firstName-value')
      .contains('Crystal Skull');
  });
});
