describe('useDomSelect component', function() {
  const selectId = 'size';

  it('It sets default from DOM', function() {
    cy.goToDemo()
      .get(`#${selectId}`)
      .should('have.value', 'small')
      .get(`#${selectId}-value`)
      .contains('small');
  });

  it('Allows select to update naturally', function() {
    cy.goToDemo()
      .get(`#${selectId}`)
      .select('large')
      .should('have.value', 'large');
  });

  it('Updates React state', function() {
    cy.goToDemo()
      .get(`#${selectId}`)
      .select('large')
      .get(`#${selectId}-value`)
      .contains('large');
  });

  it('Can be updated by React state', () => {
    cy.goToDemo()
      .get(`#${selectId}`)
      .select('small')
      .get('#toggle-hide')
      .check()
      .get(`#${selectId}`)
      .should('have.value', 'large')
      .get(`#${selectId}-value`)
      .contains('large');
  });
});
