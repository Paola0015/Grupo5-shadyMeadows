// Maneja excepciones no capturadas en la aplicación para evitar que Cypress falle el test
Cypress.on('uncaught:exception', (err, runnable) => {
  return false // Evita que Cypress falle el test por excepciones no atrapadas en la aplicación
})

describe('Trabajo Final QA - Shady Meadows', () => {

    beforeEach(() => {
      cy.visit('https://automationintesting.online/');
  });
  // Navega a la URL principal antes de cada test
  beforeEach(() => {
    cy.visit('https://automationintesting.online/');
    // Cargar datos de reserva desde fixture
    cy.fixture('reservationForm').as('reservation')
  })



  // Caso de prueba 3.1.3: OK---
  it('Completar el formulario con usuario invitado y validar campos completados', () => {
    // Usar datos de fixture `reservationForm` y comando reutilizable
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(r.nombre, r.apellido, r.email, r.telefono)
    })
    // Tras enviar la reserva, validar que no hay alertas de error en los campos
    cy.assertValidacionCamposReserva({ checkSuccess: true })
    // Fin del primer caso de prueba
  })

  // Caso de prueba 3.1.4: OK
  it('Confirmar la reserva y validar el mensaje de éxito con usuario invitado', () => {
    // Usar datos de fixture `reservationForm` y comando reutilizable
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(r.nombre, r.apellido, r.email, r.telefono)
    })
    // Verifica que el mensaje de confirmación de reserva sea visible (timeout ampliado)
    cy.contains('Your booking has been confirmed for the following dates:', { timeout: 10000 }).should('be.visible')
    // Fin del segundo caso de prueba
  })

  // Caso de prueba 3.1.5: OK
  //ATENCIÓN: Este caso de prueba puede fallar si se intenta reservar las mismas fechas 
  // varias veces. Si esto ocurre, modificar las fechas seleccionadas en el comando 
  // `openReservationForm` (líneas 29 y 32) a otras fechas futuras para evitar 
  // conflictos con reservas anteriores.
  it.only('Intentar repetir las mismas fechas de reserva y validar el mensaje de error', () => {
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

    // 3.3.1 
    it('Formulario de contacto exitoso', () => {

      cy.visit("https://automationintesting.online/#contact");

      // Validar que el formulario existe
      cy.get("form").should("be.visible");

      // Completar campos con dátos válidos
      cy.fixture('dataContactForm').then((data) => {
        cy.completarContactForm(data);

    });
      // Enviar formulario
      cy.contains('Submit')
          .should("be.visible")
          .click();
});

    // 3.3.2
    it('Enviar el mensaje y validar que se muestra la confirmación', () => {

    cy.visit('https://automationintesting.online/#contact');

    // Interceptar la petición POST
    cy.intercept('POST', '**/message').as('sendMessage');

    // Validar que el formulario existe
    cy.get('form').should('be.visible');

    // Completar campos
    cy.fixture('dataSuccessfullyForm').then((data) => {
        cy.successfullyForm(data);
    });

    // Enviar formulario
    cy.contains('Submit')
        .should('be.visible')
        .click();

    // Validar respuesta del backend
    cy.wait('@sendMessage')
      .its('response.statusCode')
      .should('eq', 200);

    // Validar mensaje de éxito
    cy.contains('Thanks for getting in touch Marcelo Gallardo!')
      .should('be.visible');

});

  // Caso de prueba 3.1.6: OK
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
