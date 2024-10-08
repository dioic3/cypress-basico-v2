//describe define a suite de teste e o bloco it define um caso de teste
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => cy.visit('src/index.html'))
    it('verifica o título da aplicação', function() {
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('[id="firstName"]').click().type('Fulano') //clica no campo e digita o nome
        cy.get('[id="lastName"]').click().type('de Tal') //clica no campo e digita o sobrenome
        cy.get('[id="email"]').click().type('fulanodetal@gmail.com') //clica no campo e digita o email
        cy.get('[id=open-text-area]').click().type('Mensagem de teste') //clica no campo e digita a mensagem
        cy.get('[type=submit]').click() //clica no botão de enviar

        cy.get('[class="success"]').should('be.visible', 'Mensagem enviada com sucesso!') //verifica se a mensagem de sucesso aparece
    })

    it('preenche os campos obrigatórios e envia o formulário com delay no campo de mensagem', function() {
        cy.get('[id="firstName"]').click().type('Fulano') //clica no campo e digita o nome
        cy.get('[id="lastName"]').click().type('de Tal') //clica no campo e digita o sobrenome
        cy.get('[id="email"]').click().type('fulanodetal@gmail.com') //clica no campo e digita o email
        cy.get('[id=open-text-area]').click().type('Eu quero comer coco no jardim da vizinha amanhã cedo', {delay: 0}) //clica no campo e digita a mensagem
        cy.get('[type=submit]').click() //clica no botão de enviar

        cy.get('[class="success"]').should('be.visible', 'Mensagem enviada com sucesso!') //verifica se a mensagem de sucesso aparece
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('[id="firstName"]').click().type('Fulano') //clica no campo e digita o nome
        cy.get('[id="lastName"]').click().type('de Tal') //clica no campo e digita o sobrenome
        cy.get('[id="email"]').click().type('fulanodetal@gmail.com') //clica no campo e digita o email
        cy.get('[id=open-text-area]').click().type('Eu quero comer coco no jardim da vizinha amanhã cedo', {delay: 0}) //clica no campo e digita a mensagem
        cy.get('[type=submit]').click() //clica no botão de enviar

        cy.get('[class="success"]').should('be.visible', 'Mensagem enviada com sucesso!') //verifica se a mensagem de sucesso aparece
  })
  