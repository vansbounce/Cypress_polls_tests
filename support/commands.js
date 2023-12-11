// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// 
// Cypress.Commands.add('login', (username, password) => {
//     cy.get('#user_login').type(username)
//     cy.get('#user_password').type(password)
//     cy.get('#user_remember_me').click()
//     cy.contains('Sign in').click()
// })

//Команда на загрузку страницы админа и ожидание всех апишек 
Cypress.Commands.add('req', () => {
    cy.intercept('front').as('front')
    cy.intercept('surveys').as('surveys')
    cy.intercept('trafficLightState').as('trafficLightState')
    cy.visit('https://dev-polls.labss.online/survey')
    cy.wait('@front')
        .its('response.statusCode')
        .should('equal', 200)
    cy.wait('@surveys')
        .its('response.statusCode')
        .should('equal', 200)
    cy.wait('@trafficLightState')
        .its('response.statusCode')
        .should('equal', 200)
})

//Команда на загрузку страницы администратора с кукой admin
Cypress.Commands.add('admin', () => {
    cy.visit('https://dev-polls.labss.online/survey')
    cy.wait(4000) 
    cy.getCookie('x-auth-user').should(
        'have.property', 
        'value', 
        'admin')
    cy.title().should('include', 'Сервис опросов: Администратор')
})