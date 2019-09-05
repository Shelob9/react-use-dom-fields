describe('useDomSelect component', function() {
  const selectId = 'size';

  it('Loads correctly', function() {
    cy.goToDemo().contains('React App');
  });

  it('It sets default with react', function() {
    cy.goToDemo()
      .get(`#${selectId}`)
      .should('have.value', 'large');
  });
  it('Allows select to update naturally', function() {
    cy.goToDemo()
      .get(`#${selectId}`)
      .select('smol')
      .should('have.value', 'smol');
  });

  it('Updates React state', function() {
    cy.goToDemo()
      .get(`#${selectId}`)
      .select('smol')
      .get(`#${selectId}-value`)
      .contains('smol');
  });
});
