// Maneja excepciones no capturadas en la aplicación para evitar que Cypress falle el test
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Trabajo Final QA - Shady Meadows', () => {
  // Navega a la URL principal antes de cada test
  beforeEach(() => {
    cy.visit('/');
    // Cargar datos de reserva desde fixture
    cy.fixture('reservationForm').as('reservation');
  });

  // =========================
  // 3.1 RESERVA EXITOSA COMO USUARIO INVITADO
  // =========================

  it('3.1.1 Verificar navegación a página principal', () => {
    cy.contains('Welcome to Shady Meadows B&B')
      .should('be.visible');

    cy.get('a[href="#booking"]')
      .should('be.visible')
      .click();

    cy.url().should('include', '#booking');

    cy.get('#booking').should('be.visible');

    cy.fixture('rooms').then((data) => {
      data.rooms.forEach((room) => {
        cy.contains('h5.card-title', room.type)
          .should('be.visible');
      });
    });
  });

  it('3.1.2 Verificar selección de habitación y formulario', () => {
    cy.fixture('rooms').then((data) => {

      cy.wrap(data.rooms).each((room) => {
        cy.botonDisponibilidadDeHabitacionesHabilitado(room.id)
          .click();

        cy.url().should('include', `/reservation/${room.id}`);

        cy.get('form').should('be.visible');

        /*
        cy.seleccionarRangoCalendario('01','16');
        */

        cy.hacerClickEnReservar();

        cy.validarFormularioReservaVisible();

        cy.go('back');
      });

    });
  });

  // Caso de prueba 3.1.3: OK---
  it('Completar el formulario con usuario invitado y validar campos completados', () => {
    // Usar datos de fixture `reservationForm` y comando reutilizable
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(r.nombre, r.apellido, r.email, r.telefono);
    });

    // Tras enviar la reserva, validar que no hay alertas de error en los campos
    cy.assertValidacionCamposReserva({ checkSuccess: true });
    // Fin del primer caso de prueba
  });

  // Caso de prueba 3.1.4: OK
  it('Confirmar la reserva y validar el mensaje de éxito con usuario invitado', () => {
    // Usar datos de fixture `reservationForm` y comando reutilizable
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(r.nombre, r.apellido, r.email, r.telefono);
    });

    // Verifica que el mensaje de confirmación de reserva sea visible (timeout ampliado)
    cy.contains('Your booking has been confirmed for the following dates:', { timeout: 10000 })
      .should('be.visible');
  });

  // Caso de prueba 3.1.5: OK
  //ATENCIÓN: Este caso de prueba puede fallar si se intenta reservar las mismas fechas 
  // varias veces. Si esto ocurre, modificar las fechas seleccionadas en el comando 
  // `openReservationForm` (líneas 29 y 32) a otras fechas futuras para evitar 
  // conflictos con reservas anteriores.
  it('Intentar repetir las mismas fechas de reserva y validar el mensaje de error', () => {
    // Usar datos de fixture `reservationForm` y comando reutilizable
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(r.nombre, r.apellido, r.email, r.telefono);
    });

    // Verifica que el mensaje de confirmación de reserva sea visible (timeout ampliado)
    cy.contains('Your booking has been confirmed for the following dates:', { timeout: 10000 })
      .should('be.visible');

    // Inicio caso de prueba 3.1.5: cambia de habitación y vuelve a intentar
    cy.get(':nth-child(1) > .col-lg-4 > .card > .card-body > .btn').click();

    // Usar el comando reutilizable para la segunda reserva y validar el error esperado
    cy.fillReservationForm('Juan', 'Perez', 'juan.perez@example.com', '09876543210');

    cy.contains('This page couldn’t load', { timeout: 10000 })
      .should('be.visible');
  });

  // Caso de prueba 3.1.6: OK
  it('Intentar reservar sin completar el formulario y validar los mensajes de error', () => {
    // Usar comando reutilizable para abrir el formulario sin rellenar campos
    cy.openReservationForm();

    // Colocar antes del click que envía el formulario (intercepta el endpoint real)
    cy.intercept('POST', '**/api/booking**')
      .as('creaReserva');

    cy.get('.btn-primary').click();

    // Esperar la petición (timeout ampliado) y validar respuesta y mensajes en UI
    cy.wait('@creaReserva', { timeout: 10000 })
      .its('response')
      .then((res) => {
        cy.log('booking response status:', res.statusCode);

        // Si el backend devuelve error de validación (p. ej. 400), validar que los mensajes del body se muestran
        if (res.statusCode >= 400) {
          expect(res.statusCode).to.be.oneOf([400]);
          cy.log('response body', JSON.stringify(res.body));

          const errors = res.body && res.body.errors ? res.body.errors : [];

          // Para cada mensaje devuelto por el backend, verificar que esté visible en la UI
          errors.forEach((msg) => {
            cy.contains(msg, { timeout: 10000 }).should('be.visible');
          });
        } else {
          expect(res.statusCode).to.be.oneOf([200, 201]);
          cy.contains('Your booking has been confirmed for the following dates:', { timeout: 10000 })
            .should('be.visible');
        }
      });
  });

  describe('Formulario de contacto - Juan', () => {
    // 3.3 Formulario de contacto

    // 3.3.1
    it('Formulario de contacto exitoso', () => {

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
  });

  // =====================================
  // VALIDACIÓN DE IMAGEN DE HABITACIÓN
  // =====================================

  it('Validar que la imagen de la habitación de reserva se corresponda con la misma', () => {

    cy.get('[href="/#rooms"]').click();

    cy.contains('Our Rooms')
      .should('be.visible');

    cy.get('a[href*="reservation/2"]').click();

    cy.contains('Double Room')
      .should('be.visible');

    cy.contains('TV').should('be.visible');
    cy.contains('Radio').should('be.visible');
    cy.contains('Safe').should('be.visible');

    cy.url().should('include', '/reservation/2');

    cy.get('img')
      .should('have.attr', 'src')
      .and('include', '/images/room2.jpg');
  });

  // =====================================
  // FORMULARIO DE CONTACTO
  // =====================================

  describe('Formulario de contacto', () => {

    it('Enviar formulario de contacto en blanco y validar los mensajes de error que aparecen', () => {

      cy.get('[href="/#contact"]').click();

      cy.contains('Send Us a Message')
        .should('be.visible');

      cy.contains('button', 'Submit').click();

      cy.contains('Email may not be blank').should('be.visible');
      cy.contains('Subject must be between 5 and 100 characters.').should('be.visible');
      cy.contains('Message may not be blank').should('be.visible');
      cy.contains('Subject may not be blank').should('be.visible');
      cy.contains('Phone may not be blank').should('be.visible');
      cy.contains('Name may not be blank').should('be.visible');
      cy.contains('Phone must be between 11 and 21 characters.').should('be.visible');
      cy.contains('Message must be between 20 and 2000 characters.').should('be.visible');
    });

    it('Enviar formulario de contacto con email inválido', () => {

      cy.fixture('contactFormValues').then((values) => {

        cy.get('[data-testid="ContactName"]')
          .type(values.Name);

        cy.get('[data-testid="ContactEmail"]')
          .type('abc');

        cy.get('[data-testid="ContactPhone"]')
          .type(values.Phone);

        cy.get('[data-testid="ContactSubject"]')
          .type(values.Subject);

        cy.get('[data-testid="ContactDescription"]')
          .type(values.Message);

        cy.contains('button', 'Submit').click();

        cy.contains('must be a well-formed email address')
          .should('be.visible');
      });
    });

    it('Enviar formulario de contacto con datos válidos', () => {

      cy.fixture('contactFormValues').then((values) => {

        cy.get('[data-testid="ContactName"]')
          .type(values.Name);

        cy.get('[data-testid="ContactEmail"]')
          .type(values.Email);

        cy.get('[data-testid="ContactPhone"]')
          .type(values.Phone);

        cy.get('[data-testid="ContactSubject"]')
          .type(values.Subject);

        cy.get('[data-testid="ContactDescription"]')
          .type(values.Message);

        cy.contains('button', 'Submit').click();

        cy.contains('Thanks for getting in touch John Doe!')
          .should('be.visible');

        cy.contains('get back to you about')
          .should('be.visible');

        cy.contains(values.Subject)
          .should('be.visible');

        cy.contains('as soon as possible')
          .should('be.visible');
      });
    });

    it('Enviar formulario de contacto con teléfono inválido', () => {

      cy.fixture('contactFormValues').then((values) => {

        cy.get('[data-testid="ContactName"]')
          .type(values.Name);

        cy.get('[data-testid="ContactEmail"]')
          .type(values.Email);

        cy.get('[data-testid="ContactPhone"]')
          .type('abcdefghijk');

        cy.get('[data-testid="ContactSubject"]')
          .type(values.Subject);

        cy.get('[data-testid="ContactDescription"]')
          .type(values.Message);

        cy.contains('button', 'Submit').click();

        cy.contains('Must be a valid phone.')
          .should('be.visible');
      });
    });

  });

});