function goToDemo() {
  cy.visit('http://localhost:1234/');
}

describe('useDomInput component', function() {
  beforeEach(goToDemo);
  it('Loads correctly', function() {
    cy.contains('React App');
  });
  it('Allows input to update naturally', function() {
    cy.get('#firstName').clear();

    cy.get('#firstName')
      .type('Green Skull')
      .should('have.value', 'Green Skull');

    cy.get('#firstName-value').contains('Green Skull');
  });
});
