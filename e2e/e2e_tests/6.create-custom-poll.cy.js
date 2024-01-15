// Проставляем текушую дату
const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')
const currentDate = `${day}.${month}.${year}`

describe('Create custom Poll', () => {
    it('Clear cookies and localStorage', () => {
        cy.clearCookies({ log: true })
        cy.clearLocalStorage('your item', { log: true })
    })

    it('Visit Admin Page', () => {
        cy.admin()
    })

    // Выбираем создание кастомного опроса
    it('Click on + button and check custom value', () => {
        cy.get('#mui-1').click()
        cy.contains('h2', 'Создание опроса').should('be.visible')
        cy.get('[aria-haspopup=listbox]').click()
        cy.get('[data-value=1]')
            .should('contain', 'Кастомный')
            .click()
    })

    it('Check the current date', () => {
        cy.get('#date-picker-inline')
            .invoke('attr', 'value')
            .then((value) => {
            const dateOnPage = value.trim()
    // Сравниваем дату на странице с текущей датой
            expect(dateOnPage).to.equal(currentDate)
        })
    })

    // Заполняем обязательные поля
    it('Fill in the required fields', () => {
        cy.get('#mui-58')
            .type('Автотест')
            .should('have.value', 'Автотест')
        cy.get('.polls-text-editor').click()
        cy.get('.se-wrapper-wysiwyg').type('Этот опрос создан автоматически')
        cy.contains('ОК').click()
        cy.get('.polls-text-editor__preview > p').contains('Этот опрос создан автоматически')
    })

    // Нажимаем на кнопку далее и проверяем статус опроса
    it('Click on submit button', () => {
        cy.get('.polls-styled-button__content')
            .should('contain', 'Далее')
            .click()
        cy.wait(4000)
        cy.get('.MuiBreadcrumbs-li')
            .eq(1)
            .should('contain','Автотест')
        cy.get('span:contains(Создан)')
    })
})