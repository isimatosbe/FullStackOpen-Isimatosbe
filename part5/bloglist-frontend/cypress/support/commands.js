Cypress.Commands.add('register', ({ username, password, name }) => {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username, password, name
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title, author, url, likes },
        headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
        }
    })
    cy.visit('http://localhost:3000')
})


Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('loggedNoteappUser')
  cy.visit('http://localhost:3000')
})
