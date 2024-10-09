
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
        cy.get('[id="email"]').click().type('fulanodetal@gmai') //clica no campo e digita o email errado
        cy.get('[id=open-text-area]').click().type('Eu quero comer coco no jardim da vizinha amanhã cedo', {delay: 0}) //clica no campo e digita a mensagem
        cy.get('[type=submit]').click() //clica no botão de enviar

        cy.get('[class="error"]').should('be.visible', 'Valide os campos obrigatórios!') //verifica se a mensagem de erro parece
  })

    it('verifica que o campo de telefone só aceita números', function() {
        cy.get('[id="phone"]').click().type('abcdefg') // tenta digitar letras no campo de telefone
        cy.get('[id="phone"]').should('have.value', '') // verifica se o valor do campo continua vazio
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('[id="firstName"]').click().type('Fulano') //clica no campo e digita o nome
        cy.get('[id="lastName"]').click().type('de Tal') //clica no campo e digita o sobrenome
        cy.get('[id="email"]').click().type('fulanodetal@gmail.com') //clica no campo e digita o email
        cy.get('[id="check"]').contains('Qual seu meio de contato preferencial?')
        cy.get('[id="phone-checkbox"]').click() //clica no checkbox de telefone
        cy.get('[class=field]').contains('Telefone') //verifica se o campo de telefone aparece
        cy.get('[class=field]').contains('(obrigatório)')//clica no campo e digita o telefone
        cy.get('[type=submit]').click() //clica no botão de enviar
        cy.get('[class="error"]').should('be.visible', 'Valide os campos obrigatórios!') //verifica se a mensagem de erro aparece   
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        //completando os campos
        cy.get('[id="firstName"]').click().type('Fulano') //clica no campo e digita o nome
        cy.get('[id="lastName"]').click().type('de Tal') //clica no campo e digita o sobrenome
        cy.get('[id="email"]').click().type('fulanodetal@gmail.com') //clica no campo e digita o email
        cy.get('[id="phone"]').click().type('11999999999') //clica no campo e digita o telefone
        cy.get('[id="check"]').contains('Qual seu meio de contato preferencial?')
        cy.get('[id="phone-checkbox"]').click() //clica no checkbox de telefone
        cy.get('[class=field]').contains('Telefone') //verifica se o campo de telefone aparece
        cy.get('[class=field]').contains('(obrigatório)')//clica no campo e digita o telefone
        cy.get('[id="open-text-area"]').click().type('Mensagem de teste') //clica no campo e digita a mensagem

        //validação dos campos com digitação
        cy.get('[id="firstName"]').should('have.value', 'Fulano') //verifica se o nome foi digitado
        cy.get('[id="lastName"]').should('have.value', 'de Tal') //verifica se o sobrenome foi digitado
        cy.get('[id="email"]').should('have.value', 'fulanodetal@gmail.com') //verifica se o email foi digitado
        cy.get('[id="phone"]').should('have.value', '11999999999') //verifica se o telefone foi digitado
        cy.get('[id="open-text-area"]').should('have.value', 'Mensagem de teste') //verifica se a mensagem foi digitada

        //limpeza dos campos
        cy.get('[id="firstName"]').clear() //limpa o campo de nome
        cy.get('[id="lastName"]').clear() //limpa o campo de sobrenome
        cy.get('[id="email"]').clear() //limpa o campo de email
        cy.get('[id="phone"]').clear() //limpa o campo de telefone
        cy.get('[id="open-text-area"]').clear() //limpa o campo de mensagem

        //validação dos campos vazios
        cy.get('[id="firstName"]').should('have.value', '') //verifica se o nome foi limpo
        cy.get('[id="lastName"]').should('have.value', '') //verifica se o sobrenome foi limpo
        cy.get('[id="email"]').should('have.value', '') //verifica se o email foi limpo
        cy.get('[id="phone"]').should('have.value', '') //verifica se o telefone foi limpo
        cy.get('[id="open-text-area"]').should('have.value', '') //verifica se a mensagem foi limpa
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('[type=submit]').click() //clica no botão de enviar
        cy.get('[class="error"]').should('be.visible', 'Valide os campos obrigatórios!') //verifica se a mensagem de erro aparece
    })

    it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit() //chama o comando customizado
        cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso!') //verifica se a mensagem de sucesso aparece
    })

    it('')
})