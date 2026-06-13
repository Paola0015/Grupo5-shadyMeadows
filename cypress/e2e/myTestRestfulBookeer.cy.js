Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Trabajo Final QA - Shady Meadows', () => {

  // ==========================================
  // 3.1 Reserva exitosa como usuario invitado
  // ==========================================

  it('Reserva exitosa como usuario invitado', () => {

    cy.visit('https://automationintesting.online/')

    // TODO:
    // Navegar a la pagina principal y verificar habitaciones disponibles
    // Seleccionar una habitacion
    // Completar formulario con datos validos
    // Confirmar reserva
    // Validar mensaje de exito

  })


  // ==========================================
  // 3.2 Validaciones formulario reserva
  // ==========================================

  it('Validaciones del formulario de reserva', () => {

    // visitar la pagina
    cy.visit('https://automationintesting.online/')

    // buscar una habitacion y abrir reserva
    cy.contains('Book Now').first().click()

    // intentar enviar sin completar ningun campo
    cy.contains('Reserve Now').click()

    // verificar mensajes de error
    cy.contains('Firstname should not be blank')
    cy.contains('Lastname should not be blank')
    cy.contains('must not be empty')

    // TODO:
    // verificar que no se realizo reserva
    // sumar validacion de API
    // sumar validacion de imagen de habitacion

  })


  // ==========================================
  // 3.3 Formulario de contacto
  // ==========================================

  it('Formulario de contacto exitoso', () => {

    cy.visit('https://automationintesting.online/')

    // TODO:
    // Completar formulario contacto con datos validos
    // Enviar mensaje
    // Validar confirmacion

  })

})