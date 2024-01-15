describe('Visit Orgstructure page', () => {
  it('Clear cookies and localStorage', () => {
    cy.clearCookies({ log: true })
    cy.clearLocalStorage('your item', { log: true })
  })
  
  it('Visit admin page', () => {
    cy.admin()
  })
  
  //Проверяем видимость кнопки настроек и окна настроек
  it('Click on Settings button', () => {
    cy.get('[aria-label=settings]')
      .should('be.visible')
      .click()
    cy.get('.polls-dynamic-configuration').should('be.visible')
  })

  //Проверяем что кнопка 'Применить' выключена
  it('Button is disabled', () => {
    cy.get('button.polls-dynamic-configuration__button--accept').should(
        'have.attr', 
        'tabindex', 
        '-1')
  })
})