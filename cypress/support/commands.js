
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('[id="firstName"]').click().type('Fulano') //clica no campo e digita o nome
    cy.get('[id="lastName"]').click().type('de Tal') //clica no campo e digita o sobrenome
    cy.get('[id="email"]').click().type('fulanodetal@gmail.com') //clica no campo e digita o email
    cy.get('[id=open-text-area]').click().type('Mensagem de teste') //clica no campo e digita a mensagem
    cy.get('[type=submit]').click() //clica no botão de enviar

    cy.get('[class="success"]').should('be.visible', 'Mensagem enviada com sucesso!') //verifica se a mensagem de sucesso aparece
})
