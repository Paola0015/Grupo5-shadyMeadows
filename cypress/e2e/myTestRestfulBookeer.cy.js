Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Trabajo Final QA - Shady Meadows', () => {

 

  it('Reserva exitosa como usuario invitado', () => {

    cy.visit('https://automationintesting.online/')

    

  })



it('Validaciones del formulario de reserva', () => {

 

 
  cy.visit('https://automationintesting.online/')


 
  cy.contains('Book Now').first().click()

  
  cy.contains('Check Availability & Book Your Stay')

 
  cy.get('a[href*="reservation"]').first().click()

 
  cy.contains('Book This Room')

  
  cy.contains('Reserve Now').click()

    // verificar que aparecen los mensajes de error correspondientes
    // Verificar que no se realizó reserva
    // sumar Vlidacion de Api, al menos una
    // sumar Validacion de imagen que corresponda con la de una habitacion


  
  cy.contains('Reserve Now').click()

  cy.contains('Firstname should not be blank')
  
  cy.contains('Lastname should not be blank')
  cy.contains('must not be empty')


  // verificar que aparecen los mensajes de error correspondientes
  cy.contains('Firstname should not be blank').should('be.visible')
  cy.contains('Lastname should not be blank').should('be.visible')
  cy.contains('must not be empty').should('be.visible')

// Verificar que no se realizó reserva
  cy.url().should('include', '/reservation/')
  cy.contains('Book This Room').should('be.visible') 

  
})


  

  it('Formulario de contacto exitoso', () => {

    cy.visit('https://automationintesting.online/')

   

  })

})