describe('useDomRadioGroup component', function() {
  const radioGroupName = 'color';
  const red = 'colorRed';
  const green = 'colorGreen'; //default
  const yellow = 'colorYellow';

  it('It sets default from DOM', function() {
    cy.goToDemo()
      .get(`#${green}`)
      .should('be.checked')
      .get(`#${red}`)
      .should('not.be.checked')
      .get(`#${yellow}`)
      .should('not.be.checked')
      .get(`#${radioGroupName}-value`)
      .contains('green')
      .should('not.contain', 'yellow')
      .should('not.contain', 'red');
  });

  it('Allows radio to switch naturally', function() {
    cy.goToDemo()
      .get(`#${red}`)
      .check()
      .should('be.checked')
      .get(`#${yellow}`)
      .should('not.be.checked')
      .get(`#${green}`)
      .should('not.be.checked');
  });

  it('Updates React state', function() {
    cy.goToDemo();
    cy.goToDemo()
      .get(`#${yellow}`)
      .check()
      .get(`#${radioGroupName}-value`)
      .contains('yellow')
      .should('not.contain', 'green')
      .should('not.contain', 'red');
  });
});
