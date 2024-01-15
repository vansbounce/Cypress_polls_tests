describe('Visit Admin Page', () => {
    //Заходим на страницу админом и проверяем загрузку апи
    it('Success visit Admin Page', () => {
        cy.clearCookies({ log: true })
        cy.clearLocalStorage('your item', { log: true })
        cy.admin()
    })

    it('Check admin cookies and Page title', () => {
    // Проверяем куки админа и страницу админа
        cy.getCookie('x-auth-user').should(
            'have.property', 
            'value', 
            'admin')
        cy.title().should('include', 'Сервис опросов: Администратор')
    })

    it('Check search-title', () => {
        cy.get('#search-title')
            .type('Все виды вопросов v1')
            .should('have.value', 'Все виды вопросов v1')
        cy.get('.polls-survey-list-page__survey-title').should('contain', 'Все виды вопросов v1')
        cy.get('#search-title').clear()
        })
    
    it('Check search-Type', () => {
        cy.get('#search-textType')
            .type('Постоянный')
            .should('have.value', 'Постоянный')
        cy.get('[col-id=textType]').should('contain', 'Постоянный')
        cy.get('#search-textType').clear()
    })

    it('Check search author', () => {
        cy.get('#search-author')
            .type('Главный администратор')
            .should('have.value', 'Главный администратор')
        cy.get('[col-id=author]').should('contain', 'Главный администратор')
        cy.get('#search-author').clear()
    })

    it('Check search Status', () => {
        cy.get('#search-textStatus')
            .type('Запущен')
            .should('have.value', 'Запущен')
        cy.get('[col-id=textStatus]').should('contain', 'Запущен')
        cy.get('#search-textStatus').clear()
    })
})