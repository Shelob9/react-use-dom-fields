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

  it('Allows checkbox to check naturally', function() {
    cy.goToDemo()
      .get(`#${orangeBox}`)
      .check()
      .should('be.checked');
  });

  it('Allows checkbox to uncheck naturally', function() {
    cy.goToDemo()
      .get(`#${appleBox}`)
      .uncheck()
      .should('not.be.checked');
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

  it('Updates React state when unchecking ', function() {
    cy.goToDemo();
    cy.goToDemo()
      .get(`#${orangeBox}`)
      .check()
      .get(`#${checkboxGroupName}-value`)
      .contains('fruitJuicesApple')
      .contains('fruitJuicesOrange')

      //uncheck apple
      .get(`#${appleBox}`)
      .uncheck()
      .get(`#${checkboxGroupName}-value`)
      .should('not.contain', 'fruitJuicesApple')
      .contains('fruitJuicesOrange')

      //uncheck orange
      .get(`#${orangeBox}`)
      .uncheck()
      .get(`#${checkboxGroupName}-value`)
      .should('not.contain', 'fruitJuicesApple')
      .should('not.contain', 'fruitJuicesOrange');
  });
});
