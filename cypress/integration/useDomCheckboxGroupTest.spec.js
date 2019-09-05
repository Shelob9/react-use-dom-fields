describe('useDomCheckbox component', function() {
  const checkboxGroupName = 'fruitJuices';
  const appleBox = 'fruitJuicesApple';
  const orangeBox = 'fruitJuicesOrange';

  it('It sets default from DOM', function() {
    cy.goToDemo()
      .get(`#${appleBox}`)
      .should('be.checked')
      .get(`#${orangeBox}`)
      .should('not.be.checked')
      .get(`#${checkboxGroupName}-value`)
      .contains('fruitJuicesApple');
  });

  it('Allows checkbox to update naturally', function() {
    cy.goToDemo()
      .get(`#${orangeBox}`)
      .check()
      .should('be:checked');
  });

  it('Updates React state', function() {
    cy.goToDemo();
    cy.goToDemo()
      .get(`#${orangeBox}`)
      .check()
      .get(`#${checkboxGroupName}-value`)
      .contains('fruitJuicesApple')
      .contains('fruitJuicesOrange');
  });
});
