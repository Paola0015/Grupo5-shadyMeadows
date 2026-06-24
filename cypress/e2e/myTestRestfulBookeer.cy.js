// Maneja excepciones no capturadas en la aplicación para evitar que Cypress falle el test
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Trabajo Final QA - Shady Meadows', () => {

  beforeEach(() => {
    cy.visit('/');
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

  //Juan Poporat
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

    //fin Juani Poporat

  it('Completar el formulario con usuario invitado y validar campos completados', () => {
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(
        r.nombre,
        r.apellido,
        r.email,
        r.telefono
      );
    });

    cy.assertValidacionCamposReserva({
      checkSuccess: true
    });
  });

  it('Confirmar la reserva y validar el mensaje de éxito con usuario invitado', () => {
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(
        r.nombre,
        r.apellido,
        r.email,
        r.telefono
      );
    });

    cy.contains(
      'Your booking has been confirmed for the following dates:',
      { timeout: 10000 }
    ).should('be.visible');
  });

  it('Intentar repetir las mismas fechas de reserva y validar el mensaje de error', () => {
    cy.get('@reservation').then((r) => {
      cy.fillReservationForm(
        r.nombre,
        r.apellido,
        r.email,
        r.telefono
      );
    });

    cy.contains(
      'Your booking has been confirmed for the following dates:',
      { timeout: 10000 }
    ).should('be.visible');

    cy.get(':nth-child(1) > .col-lg-4 > .card > .card-body > .btn')
      .click();

    cy.fillReservationForm(
      'Juan',
      'Perez',
      'juan.perez@example.com',
      '09876543210'
    );

    cy.contains(
      'This page couldn’t load',
      { timeout: 10000 }
    ).should('be.visible');
  });

  it('Intentar reservar sin completar el formulario y validar los mensajes de error', () => {
    cy.openReservationForm();

    cy.intercept('POST', '**/api/booking**')
      .as('creaReserva');

    cy.get('.btn-primary').click();

    cy.wait('@creaReserva', { timeout: 10000 })
      .its('response')
      .then((res) => {

        cy.log('booking response status:', res.statusCode);

        if (res.statusCode >= 400) {
          expect(res.statusCode).to.be.oneOf([400]);

          const errors =
            res.body && res.body.errors
              ? res.body.errors
              : [];

          errors.forEach((msg) => {
            cy.contains(msg, { timeout: 10000 })
              .should('be.visible');
          });

        } else {
          expect(res.statusCode).to.be.oneOf([200, 201]);

          cy.contains(
            'Your booking has been confirmed for the following dates:',
            { timeout: 10000 }
          ).should('be.visible');
        }
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

});})