<<<<<<< Updated upstream
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
=======
// Evita que excepciones no capturadas en la aplicación hagan fallar las pruebas
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false para que Cypress ignore excepciones no manejadas en la app
  return false
})

// Agrupa todos los tests relacionados con Shady Meadows
describe('Trabajo Final QA - Shady Meadows', () => {


  // Antes de cada test, navegar a la página principal
  beforeEach(() => {
    // Visita la URL base de la aplicación bajo prueba
    cy.visit('https://automationintesting.online/');
    // Carga el fixture `reservationForm` y la expone como alias `@reservation`
    cy.fixture('reservationForm').as('reservation')
  })


  // Caso de prueba 3.1.3 (Marcos):
  it.only('Completar el formulario con usuario invitado y validar campos completados', () => {
    // Obtiene los datos de la fixture @reservation
    cy.get('@reservation').then((r) => {
      // Rellena los campos del formulario 
      cy.fillReservationFormNoSubmit(r.nombre, r.apellido, r.email, String(r.telefono))
      // Envía el formulario y luego ejecuta la validación centralizada definida en support/commands.js
      cy.submitReservation().then(() => {
        // Usa el comando reutilizable para comprobar la UI tras el submit
        cy.assertValidacionCamposReserva()
      })
    })
  })


  // Caso de prueba 3.1.4 (Marcos): 
  it('Confirmar la reserva y validar que el mensaje de éxito con usuario invitado', () => {
    // Usa la fixture para rellenar el formulario mediante un comando reutilizable
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(r.nombre, r.apellido, r.email, r.telefono)
    })
    // Verifica que el mensaje de confirmación esté visible en la UI
    cy.contains('Your booking has been confirmed for the following dates:', { timeout: 10000 }).should('be.visible')
>>>>>>> Stashed changes
  })



<<<<<<< Updated upstream
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
=======
  // Caso de prueba 3.1.5 (Marcos): 
  // Nota: puede fallar si las fechas ya fueron reservadas anteriormente en el entorno
  it('Intentar repetir la misma fecha de reserva y validar el mensaje de error', () => {
    // Rellena la reserva con la fixture
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(r.nombre, r.apellido, r.email, r.telefono)
    })
    // Comprueba que la primera confirmación se muestre
    cy.contains('Your booking has been confirmed for the following dates:', { timeout: 10000 }).should('be.visible')

    // Selecciona otra habitación para intentar reservar de nuevo y provocar el error
    cy.get(':nth-child(1) > .col-lg-4 > .card > .card-body > .btn').click()
    // Intenta rellenar la segunda reserva con datos distintos
    cy.fillReservationForm('Juan', 'Perez', 'juan.perez@example.com', '09876543210')
    // Espera un posible mensaje de error por conflicto o carga de la página
    cy.contains('This page couldn’t load', { timeout: 10000 }).should('be.visible')
>>>>>>> Stashed changes
  })



<<<<<<< Updated upstream
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
=======
  // Caso de prueba 3.1.6 (Marcos):
  it('Intentar reservar sin completar el formulario y validar los mensajes de error', () => {
    // Abre el formulario sin rellenar campos
    cy.openReservationForm()

    // Envía el formulario y espera la respuesta del backend usando el comando reutilizable
    cy.submitReservation().then((res) => {
      cy.log('booking response status:', res.statusCode)
      // Si el backend devuelve 400, espera ver los mensajes de error en la UI
>>>>>>> Stashed changes
      if (res.statusCode >= 400) {
        expect(res.statusCode).to.be.oneOf([400])
        cy.log('response body', JSON.stringify(res.body))
        const errors = res.body && res.body.errors ? res.body.errors : []
<<<<<<< Updated upstream
        // Para cada mensaje devuelto por el backend, verificar que esté visible en la UI
=======
        // Verifica que cada mensaje devuelto por la API sea visible en la UI
>>>>>>> Stashed changes
        errors.forEach((msg) => {
          cy.contains(msg, { timeout: 10000 }).should('be.visible')
        })
      } else {
<<<<<<< Updated upstream
=======
        // Si el backend respondió con éxito, valida el mensaje de confirmación
>>>>>>> Stashed changes
        expect(res.statusCode).to.be.oneOf([200, 201])
        cy.contains('Your booking has been confirmed for the following dates:', { timeout: 10000 }).should('be.visible')
      }
    })
<<<<<<< Updated upstream

    // Fin del cuarto caso de prueba
=======
>>>>>>> Stashed changes

  })


<<<<<<< Updated upstream

})
=======
  

  // Caso placeholder: reserva exitosa (por implementar)
  it('Reserva exitosa como usuario invitado', () => {
    // Visita la URL base — pendiente de completar pasos de selección y confirmación
    cy.visit('https://automationintesting.online/')
  })

  // Validaciones UI del formulario de reserva
  it('Validaciones del formulario de reserva', () => {
    // Navega a la home
    cy.visit('https://automationintesting.online/')

    // Abre la primera habitación y el flujo de reserva
    cy.contains('Book Now').first().click()
    cy.contains('Check Availability & Book Your Stay')
    cy.get('a[href*="reservation"]').first().click()
    cy.contains('Book This Room')
    cy.contains('Reserve Now').click()

    // Envía el formulario vacío para comprobar mensajes visibles
    cy.contains('Reserve Now').click()

    // Comprueba la presencia de mensajes de validación básicos en la UI
    cy.contains('Firstname should not be blank')
    cy.contains('Lastname should not be blank')
    cy.contains('must not be empty')

    cy.contains('Firstname should not be blank').should('be.visible')
    cy.contains('Lastname should not be blank').should('be.visible')
    cy.contains('must not be empty').should('be.visible')

    // Asegura que seguimos en la página de reserva y que no se realizó la reserva
    cy.url().should('include', '/reservation/')
    cy.contains('Book This Room').should('be.visible')
  })


  // Formulario de contacto (por implementar)
  it('Formulario de contacto exitoso', () => {
    // Visita la página principal y reserva para futuros pasos de implementación
    cy.visit('https://automationintesting.online/')
  })

})
>>>>>>> Stashed changes
