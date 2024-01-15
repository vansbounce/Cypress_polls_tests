describe('Visit Admin Page', () => {
    //Заходим на страницу админом и проверяем загрузку апи
    it('Success visit Admin Page', () => {
        cy.clearCookies({ log: true })
        cy.clearLocalStorage('your item', { log: true })
        cy.req()
    })

    it('Check admin cookies and Page title', () => {
    // Проверяем куки админа и страницу админа
        cy.getCookie('x-auth-user').should(
            'have.property', 
            'value', 
            'admin')
        cy.title().should('include', 'Сервис опросов: Администратор')
    })

    it('Check Redirect link and options button', () => {
    // Проверяем видимость кнопки редирект и настроек
        cy.get('.sc-bBeLUv')
            .should('be.visible')
            .should('have.length', 3)
            .and('contain', 'Перейти к опросам') 
    })

    it('Check Tabs', () => {
    // Проверяем видимость вкладок
        cy.get('.sc-fTFjTM')
            .should('be.visible')
            .should('have.length', 3)
            .and('contain', 'Опросы')
        cy.get('.sc-fTFjTM')
            .should('be.visible')
            .and('contain', 'Архив опросов')
        cy.get('.sc-fTFjTM')
            .should('be.visible')
            .and('contain', 'Оргструктура')
    })

    //Проверяем отображение опросов и кнопку 'Создать'
    it('Check polls and "+Создать" button', () => {
        cy.get('#mui-1').should('be.visible')
        cy.get('.sc-kOHTFB').should('be.visible')
    })

    it('Failed visit Admin Page', () => {      
    //Проверяем редирект пользователя со страницы администратора и попап об ошибке
        cy.clearCookies({ log: true })
        cy.setCookie('x-auth-user', 'rudnyy')
        cy.getCookie('x-auth-user').should(
            'have.property', 
            'value', 
            'rudnyy')
        cy.visit('https://dev-polls.labss.online/survey')
        cy.get('#notistack-snackbar').contains('Ошибка авторизации: Для пользователя rudnyy не найден доступ')
        cy.title().should('include', 'Сервис опросов')
    })
})