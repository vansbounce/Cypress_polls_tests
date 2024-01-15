describe('Upload image for Poll', () => {
  it('Clear cookies and localStorage', () => {
    cy.clearCookies({ log: true })
    cy.clearLocalStorage('your item', { log: true })
  })
  
  it('Visit admin page', () => {
    cy.admin()
  })

  it('Click on + button', () => {
    cy.get('#mui-1').click()
    cy.contains('h2', 'Создание опроса').should('be.visible')
  })

  // Загружаем файл в последний на странице инпут с типом файл
  it('Upload image', () => {
    cy.get('input[type=file]:last')
      .invoke('show')
      .selectFile('cypress/fixtures/cover.jpg')
    cy.get('button:contains(Обрезать изображение)').click()
  // Проверяем что в аттрибуте поменялся путь с assets на api
    cy.get('.photoInputImage:last')
      .should('have.attr', 'src')
      .and('contain', '/api/file/image/')
  })
})


//87272 - октябрь
//76190 + 83809 = 160000 - ноябрь
//83809 - аванс дек + 76190 зп дек = 160000
