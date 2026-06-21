Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Trabajo Final QA - Shady Meadows', () => {

  // 3.1 Reserva exitosa como usuario invitado

  it('Reserva exitosa como usuario invitado', () => {

    cy.visit('https://automationintesting.online/')

    // TODO:
    // navegar a la pagina principal y verificar que se muestran las habitaciones disponibles
    // Seleccionar una habitacion y abrir el formulario de reserva
    // Completar formulario con datos validos ( nombre, apellido, email, telefono, fechas)
    // Confirmar reserva

  })

// 3.2 Validaciones formulario reserva

it('Validaciones del formulario de reserva', () => {

  //Paola

 
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

  // LISTO ..... verificar que aparecen los mensajes de error correspondientes
  // LISTO ..... Verificar que no se realizó reserva
  // sumar Vlidacion de Api, al menos una
  // sumar Validacion de imagen que corresponda con la de una habitacion

})


  // 3.3 Formulario de contacto

  it('Formulario de contacto exitoso', () => {

    cy.visit('https://automationintesting.online/')

    // TODO:
    // Completar formulario contacto con datos validos
    // Enviar mensaje y validar que se muestra la informacion
    // sumar que se envie correctamente el mail

  })

})