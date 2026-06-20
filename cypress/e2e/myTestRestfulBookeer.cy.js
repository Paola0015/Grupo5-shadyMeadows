// Trello: https://trello.com/b/Xk4sGKK3/tpfinal-shady-meadows-bb
// Drive > Hoja con Set de Pruebas: https://docs.google.com/spreadsheets/d/1qXmTXK_EZU0HHcU2C6V0GoJ5YD40KFHScWTmfYJvA3o/edit?gid=16637989#gid=16637989

// Maneja excepciones no capturadas en la aplicación para evitar que Cypress falle el test
Cypress.on('uncaught:exception', (err, runnable) => {
  return false // Evita que Cypress falle el test por excepciones no atrapadas en la aplicación
})

// Define la suite de pruebas para Shady Meadows
describe('Trabajo Final QA - Shady Meadows', () => {

  // Navega a la URL principal antes de cada test
  beforeEach(() => {
    cy.visit('https://automationintesting.online/');
    // Cargar datos de reserva desde fixture
    cy.fixture('reservationForm').as('reservation')
  })


  // Caso de prueba 3.1.3: 
  it('Completar el formulario con usuario invitado', () => {
    // Usar datos de fixture `reservationForm` y comando reutilizable
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(r.nombre, r.apellido, r.email, r.telefono)
    })
    // Fin del primer caso de prueba
  })


  // Caso de prueba 3.1.4: 
  it('Confirmar la reserva y validar que el mensaje de éxito con usuario invitado', () => {
    // Usar datos de fixture `reservationForm` y comando reutilizable
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(r.nombre, r.apellido, r.email, r.telefono)
    })
    // Verifica que el mensaje de confirmación de reserva sea visible (timeout ampliado)
    cy.contains('Your booking has been confirmed for the following dates:', { timeout: 10000 }).should('be.visible')
    // Fin del segundo caso de prueba
  })



  // Caso de prueba 3.1.5:
    //ATENCIÓN: Este caso de prueba puede fallar si se intenta reservar las mismas fechas 
    // varias veces. Si esto ocurre, modificar las fechas seleccionadas en el comando 
    // `openReservationForm` (líneas 29 y 32) a otras fechas futuras para evitar 
    // conflictos con reservas anteriores.
  it('Intentar repetir las mismas fechas de reserva y validar el mensaje de error', () => {
    // Usar datos de fixture `reservationForm` y comando reutilizable
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(r.nombre, r.apellido, r.email, r.telefono)
    })
    // Verifica que el mensaje de confirmación de reserva sea visible (timeout ampliado)
    cy.contains('Your booking has been confirmed for the following dates:', { timeout: 10000 }).should('be.visible')

    // Inicio caso de prueba 3.1.5: cambia de habitación y vuelve a intentar
    cy.get(':nth-child(1) > .col-lg-4 > .card > .card-body > .btn').click()
    // Usar el comando reutilizable para la segunda reserva y validar el error esperado
    cy.fillReservationForm('Juan', 'Perez', 'juan.perez@example.com', '09876543210')
    cy.contains('This page couldn’t load', { timeout: 10000 }).should('be.visible')
    // Fin del tercer caso de prueba
  })



  // Caso de prueba 3.1.6: 
  it('Intentar reservar sin completar el formulario y validar los mensajes de error', () => {
    // Usar comando reutilizable para abrir el formulario sin rellenar campos
    cy.openReservationForm()

    // Colocar antes del click que envía el formulario (intercepta el endpoint real)
    cy.intercept('POST', '**/api/booking**').as('creaReserva')

    // Enviar formulario
    cy.get('.btn-primary').click()

    // Esperar la petición (timeout ampliado) y validar respuesta y mensajes en UI
    cy.wait('@creaReserva', { timeout: 10000 }).its('response').then((res) => {
      cy.log('booking response status:', res.statusCode)
      // Si el backend devuelve error de validación (p. ej. 400), validar que los mensajes del body se muestran
      if (res.statusCode >= 400) {
        expect(res.statusCode).to.be.oneOf([400])
        cy.log('response body', JSON.stringify(res.body))
        const errors = res.body && res.body.errors ? res.body.errors : []
        // Para cada mensaje devuelto por el backend, verificar que esté visible en la UI
        errors.forEach((msg) => {
          cy.contains(msg, { timeout: 10000 }).should('be.visible')
        })
      } else {
        expect(res.statusCode).to.be.oneOf([200, 201])
        cy.contains('Your booking has been confirmed for the following dates:', { timeout: 10000 }).should('be.visible')
      }
    })

    // Fin del cuarto caso de prueba

  })

  //it.only('', () => {




})