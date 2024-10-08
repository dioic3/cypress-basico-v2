describe('parte 2 - cac-tact', () => {
    beforeEach(() => cy.visit('src/index.html'))
    it('marca ambos checkboxes, depois desmarca o ultimo', () => {
        cy.get('input[type="checkbox"]').check()
        cy.get('input[type="checkbox"]').should('be.checked')
        cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
    })

    it('seleciona as opções de uma vez e desmarca de uma vez', function () {
        cy.get('input[type="checkbox"]').should('have.length', 2).each(($check) => {
            console.log($check)
            cy.wrap($check).check()
            cy.wrap($check).should('be.checked')
            cy.wrap($check).uncheck()
        })
    })


    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('[id="firstName"]').click().type('Fulano') //clica no campo e digita o nome
        cy.get('[id="lastName"]').click().type('de Tal') //clica no campo e digita o sobrenome
        cy.get('[id="email"]').click().type('fulanodetal@gmail.com') //clica no campo e digita o email
        cy.get('[id="check"]').contains('Qual seu meio de contato preferencial?')
        cy.get('[id="phone-checkbox"]').check() //clica no checkbox de telefone
        cy.get('[class=field]').contains('Telefone') //verifica se o campo de telefone aparece
        cy.get('[class=field]').contains('(obrigatório)')//clica no campo e digita o telefone
        cy.get('[type=submit]').click() //clica no botão de enviar
        cy.get('[class="error"]').should('be.visible', 'Valide os campos obrigatórios!') //verifica se a mensagem de erro aparece   
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/arquivo-teste.txt')
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () { 
        cy.get('input[type="file"]').selectFile('cypress/fixtures/arquivo-teste.txt', { action: 'drag-drop' })
    })

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('arquivo-teste.txt').as('arquivoTeste')
        cy.get('input[type="file"]').selectFile('@arquivoTeste')
    })
})
