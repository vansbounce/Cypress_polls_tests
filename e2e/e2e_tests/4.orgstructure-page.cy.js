describe('Visit Orgstructure page', () => {
    it('Clear cookies and localStorage', () => {
      cy.clearCookies({ log: true })
      cy.clearLocalStorage('your item', { log: true })
    })
  
    it('Visit admin page', () => {
      cy.admin()
    })
    //Проверяем переход на вкладку Оргструктура и отображение элементов на странице
    it('Click on Orgstructure Tab', () => {
      cy.contains('h2', 'Оргструктура').click()
      cy.url().should('include','/organizationStructure')
      cy.wait(3000)
      cy.get('.polls-organization-structure-page__button--uploading')
        .should('contain', 'Загрузить оргструктуру')
        .and('be.visible')
      cy.get('.polls-organization-structure-tree-view__search')
        .should('contain', 'Поиск по названию')
        .and('be.visible')
      cy.get('.sc-dGCmGc ').should('be.visible')
    })
    //Проверяем загрузку файла оргструктуры
    it('Upload structure file', () => {
      cy.get('input[type=file]')
        .invoke('show')
        // .selectFile('cypress/fixtures/')
    })
    //Проверяем строку поиска
    it('Search check', () => {
      cy.get('input[placeholder]')
        .type('Главный администратор')
        .should('have.value', 'Главный администратор')
      cy.get('.polls-organization-structure-info-row__element-name').should('contain', 'Главный администратор')
      cy.get('button.fwCvXE').click()
    })
})