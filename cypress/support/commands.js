const longText = Cypress._.repeat('Qualquer Texto Nesse Campo ', 15)

Cypress.Commands.add('fillmandatoryFieldsAndSubmit', (data = {
    firstName: 'Copa do Mundo',
    lastName: 'Nos Estados Unidos',
    email: 'campeaoa@gmail.com',
    phone: '91975436758'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('#phone').type(data.phone)
    cy.get('#phone-checkbox').click()

    cy.get('button[type="submit"]').click()
})