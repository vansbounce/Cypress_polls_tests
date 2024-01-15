describe('Visit archive page', () => {
  it('Clear cookies and localStorage', () => {
    cy.clearCookies({ log: true })
    cy.clearLocalStorage('your item', { log: true })
  })

  it('Visit admin page', () => {
    cy.admin()
  })
  //Проверяем переход на вкладку Архив опросов и отображение элементов на странице
  it('Click on Archive Tab', () => {
    cy.contains('h2', 'Архив опросов').click()
    cy.url().should('include','archive')
    cy.wait(4000)
    cy.get('.sc-kOHTFB').should('have.length', 13)
    cy.get('[col-id=textStatus]').should('contain', 'В архиве')
  })
})