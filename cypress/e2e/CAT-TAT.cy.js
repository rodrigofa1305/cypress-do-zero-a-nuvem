describe('Central de Atendimento ao Cliente TAT', () => {

  const longText = Cypress._.repeat('Qualquer Texto Nesse Campo ', 15)

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preeenche os campos Obrigatórios e Envia o Formulário', () => {
    cy.get('#firstName').type('Seleção')
    cy.get('#lastName').type('Brasileira')
    cy.get('#email').type('selecaobrasileira@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('span[class="success"] strong')
      .should('have.text', 'Mensagem enviada com sucesso.')
      .and('be.visible')
  })

  it('Exibe a Mensagem de Erro ao Submeter o Formulário com um email inválido', () => {
    cy.get('#firstName').type('Seleção')
    cy.get('#lastName').type('Brasileira')
    cy.get('#email').type('selecaobrasileira@@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('span[class="error"] strong')
      .should('have.text', 'Valide os campos obrigatórios!')
      .and('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com um valor não-numerico', () => {
    cy.get('#phone')
      .type('Brasileira')
      .should('have.value', '')
  })

  it('Campo telefone continua vazio quando preenchido com um valor não-numerico', () => {
    cy.get('#firstName').type('Seleção')
    cy.get('#lastName').type('Brasileira')
    cy.get('#email').type('selecaobrasileira@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    cy.get('span[class="error"] strong')
      .should('have.text', 'Valide os campos obrigatórios!')
      .and('be.visible')
  })

  it('Preenche e Limpa os Campos Nome, Sobrenome, Email e Telefone', () => {
    cy.get('#firstName')
      .type('Seleção')
      .should('have.value', 'Seleção')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Brasileira')
      .should('have.value', 'Brasileira')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('selecaobrasileira@@gmail.com')
      .should('have.value', 'selecaobrasileira@@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('91982648597')
      .should('have.value', '91982648597')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type(longText, { delay: 0 })
      .should('have.value', longText)
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()

    cy.get('span[class="error"] strong')
      .should('have.text', 'Valide os campos obrigatórios!')
      .and('be.visible')
  })

  it('Envia o fomrulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Seleção',
      lastName: 'Brasileira',
      email: 'selecaobrasileira@gmail.com',
      phone: '91982648597'
    }

    cy.fillmandatoryFieldsAndSubmit(data)

    cy.get('span[class="success"] strong')
      .should('have.text', 'Mensagem enviada com sucesso.')
      .and('be.visible')
  })

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) pelo seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('Marca o Tipo de Atendimento Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('Marca ambos os checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo na pasta Fixture', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo utlizando uma Fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('Acessa a página de política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  it('Testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.get('p').last().should('have.text', 'Talking About Testing').and('be.visible')
  })


})