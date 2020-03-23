describe('Working with fields dynamically added to DOM', () => {
  it('Deals with being initialize without a value', () => {
    cy.goToDemo()
      .get('#dyn-1')
      .should('have.value', '')
      .type('To Fall');
    cy.get('#dyn-change').click();
    cy.get('#dyn-2')
      .should('have.value', 'twenty')
      .type('four');
    cy.get('#dyn-change').click();
    cy.get('#dyn-1').should('have.value', 'To Fall');
    cy.get('#dyn-change').click();
    cy.get('#dyn-2').should('have.value', 'four');
  });
});
