
context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Should display an error if URL is missing', () => {
    cy.get('#url')
      .should('have.value', '')

    cy.get('#errorMessage')
      .should('not.be.visible')

    cy.get('#sendButton').click()

    cy.get('#errorMessage')
      .should('be.visible').should('contain', 'URL is missing')
  })

  it('Should display an error if the JSON is not valid', () => {
    cy.get('#url')
      .type('http://localhost:3000/').should('have.value', 'http://localhost:3000/')

    cy.get('#args')
      .type('invalid')

    cy.get('#errorMessage')
      .should('not.be.visible')

    cy.get('#sendButton').click()

    cy.get('#errorMessage')
      .should('be.visible').should('contain', 'Invalid JSON arguments')
  })

  it('Should only type numbers on duration and arrivale rate', () => {
    cy.get('#url')
      .type('http://localhost:3000/').should('have.value', 'http://localhost:3000/')

    cy.get('#duration')
      .type('abc').should('have.value', '')

    cy.get('#arrivalRate')
      .type('abc').should('have.value', '')

    cy.get('#duration')
      .type(1).should('have.value', '1')

    cy.get('#arrivalRate')
      .type(2).should('have.value', '2')
  })

  it('Should display an error if the GraphQL server is offline', () => {
    cy.get('#url')
    .type('http://localhost:3000/').should('have.value', 'http://localhost:3000/')

    cy.get('#sendButton').click()

    cy.wait(1000)

    cy.get('#sendButton')
      .should('have.attr', 'disabled')

    cy.wait(7000)

    cy.get('#errorMessage')
    .should('be.visible').should('contain', 'There was an error running the load tester, check the logs')
  })
})
