describe('useDomCheckboxGroup component', function() {
  const checkboxGroupName = 'fruitJuices';

  it('It sets default from DOM', function() {
    cy.goToDemo()
      .get(`#${checkboxGroupName}`)
      .should('have.value', 'Apple')
      .get(`#${checkboxGroupName}`)
      .contains('fruitJuicesApple');
  });

  it('Allows checkbox to update naturally', function() {
    cy.goToDemo()
      .get(`#frustJuicesOrange`)
      .check()
      .should('be:checked');
  });

  it('Updates React state', function() {
    cy.goToDemo();
    cy.goToDemo()
      .get(`#frustJuicesApple`)
      .check()
      .get(`#${checkboxGroupName}-value`)
      .contains('frustJuicesApple')
      .contains('frustJuicesOrange');
  });
});
