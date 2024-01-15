describe('Redirect to User Page from Admin Page', () => {
  //Чистим куки и проверяем отображение страницы Администратора 
  it('Visit Admin Page', () => {
    cy.clearCookies({ log: true })
    cy.clearLocalStorage('your item', { log: true })
    cy.visit('https://dev-polls.labss.online/survey')
    cy.wait(4000) 
    cy.getCookie('x-auth-user').should(
        'have.property', 
        'value', 
        'admin')
    cy.title().should('include', 'Сервис опросов: Администратор')
  })

  //Проверяем отображение кнопки редиректа 
  it('Check Redirect link is visible', () => {
    cy.contains('Перейти к опросам').should('be.visible')
  })
  
  //Проверяем отображение страницы Пользователя
  it('Click on Redirect link and Check User Page', () => {
    cy.get('button.hqbMLU')
      .should('contain', 'Перейти к опросам')
      .click()
    cy.url().should('include','https://dev-polls.labss.online/')
    cy.title().should('include', 'Сервис опросов')
  })
})