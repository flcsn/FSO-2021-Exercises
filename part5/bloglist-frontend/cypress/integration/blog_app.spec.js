describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'initialUser',
      password: 'initialPass',
      name: 'initialName',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#usernameField').type('initialUser')
      cy.get('#passwordField').type('initialPass')
      cy.get('#loginButton').click()

      cy.get('.success').contains('logged in successfully!')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameField').type('initialUser')
      cy.get('#passwordField').type('wrongPass')
      cy.get('#loginButton').click()

      cy.get('.error').contains('login failed')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#usernameField').type('initialUser')
      cy.get('#passwordField').type('initialPass')
      cy.get('#loginButton').click()
    })

    it('a blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#titleField').type('test blog')
      cy.get('#authorField').type('test author')
      cy.get('#urlField').type('test url')
      cy.get('#submitButton').click()

      cy.get('.success').contains('created new blog test blog successfully!')
      cy.contains('test blog')
    })

    describe('and there is an existing blog', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('#titleField').type('test blog')
        cy.get('#authorField').type('test author')
        cy.get('#urlField').type('test url')
        cy.get('#submitButton').click()

        cy.contains('view details').click()
      })

      it('users may `like` a blog', function() {
        cy.get('#likeButton').click()
        cy.contains('1 like(s)')
      })

      it('it can be deleted', function() {
        cy.contains('remove').click()

        cy.get('.success').contains('removed blog test blog successfully!')
      })
    })

    describe('and there are two existing blogs', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('#titleField').type('test blog 1')
        cy.get('#authorField').type('test author 1')
        cy.get('#urlField').type('test url 1')
        cy.get('#submitButton').click()

        cy.contains('test author 1', { timeout: 5000 })

        cy.contains('create new blog').click()
        cy.get('#titleField').type('test blog 2')
        cy.get('#authorField').type('test author 2')
        cy.get('#urlField').type('test url 2')
        cy.get('#submitButton').click()

        cy.contains('test author 2', { timeout: 5000 })
          .contains('view details')
          .click()

        cy.get('#likeButton').click()
        cy.contains('hide').click()

        cy.get('.success').contains('updated blog test blog 2 successfully!')
      })

      it('both blogs are visible', function() {
        cy.get('div.blogDefaultInfo').should('have.length', 2)
      })

      it.only('the blogs are sorted according to the number of likes', function() {
        cy.get('div.blogDefaultInfo:first')
          .contains('view details')
          .click()
        cy.get('div.blogDefaultInfo:first').contains('1 like(s)')

        cy.contains('hide').click()

        cy.get('div.blogDefaultInfo').eq(1)
          .contains('view details')
          .click()

        cy.get('div.blogDefaultInfo').eq(1).contains('0 like(s)')
      })
    })
  })
})