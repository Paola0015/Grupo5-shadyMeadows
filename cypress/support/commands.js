// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('completarContactForm',(data) =>{
    // Completar formulario
    cy.get('[data-testid="ContactName"]').type(data.name)
    cy.get('[data-testid="ContactEmail"]').type(data.email)
    cy.get('[data-testid="ContactPhone"]').type(data.phone)
    cy.get('[data-testid="ContactSubject"]').type(data.subject)
    cy.get('[data-testid="ContactDescription"]').type(data.message)
})

Cypress.Commands.add('successfullyForm',(data) =>{
    // Completar formulario 
    cy.get('[data-testid="ContactName"]').type(data.name)
    cy.get('[data-testid="ContactEmail"]').type(data.email)
    cy.get('[data-testid="ContactPhone"]').type(data.phone)
    cy.get('[data-testid="ContactSubject"]').type(data.subject)
    cy.get('[data-testid="ContactDescription"]').type(data.message)
})


// Comando para abrir el formulario de reserva (selección de fechas y apertura del formulario)
Cypress.Commands.add('openReservationForm', () => {
	cy.get('.col-lg-8 > .btn').click()
	cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click()
	cy.get('.react-datepicker__navigation--next').click()
	cy.get('.react-datepicker__day--018').click() // Modificar 015 si se repite la prueba Caso de prueba 3.1.4 'Confirmar la reserva y validar que el mensaje de éxito con usuario invitado'
	cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click()
	cy.get('.react-datepicker__navigation--next').click()
	cy.get('.react-datepicker__day--019').click() // Modificar 020 si se repite la prueba Caso de prueba 3.1.4 'Confirmar la reserva y validar que el mensaje de éxito con usuario invitado'
	cy.get('.col-8 > .btn').click()
	cy.get(':nth-child(1) > .card > .card-footer > .btn').should('be.visible').click()
	cy.url().should('include', '/reservation/')
	cy.get('#doReservation').should('be.visible').click()
	cy.get('form').should('be.visible')
})




// Comando para abrir + rellenar el formulario de reserva y confirmándola.
Cypress.Commands.add('fillReservationForm', (nombre, apellido, email, telefono) => {
	// Abre el formulario (selección de fechas y apertura del modal/página)
	cy.openReservationForm()
	// Escribe el nombre en el campo `firstname`
	cy.get('[name="firstname"]').type(nombre)
	// Escribe el apellido en el campo `lastname`
	cy.get('[name="lastname"]').type(apellido)
	// Escribe el email en el campo `email`
	cy.get('[name="email"]').type(email)
	// Escribe el teléfono en el campo `phone`
	cy.get('[name="phone"]').type(telefono)
	// Hace click en el botón primario para enviar el formulario y crear la reserva
	cy.get('.btn-primary').click()
})

// Comando para rellenar el formulario SIN enviar (útil para validar mensajes antes del submit)
Cypress.Commands.add('fillReservationFormNoSubmit', (nombre, apellido, email, telefono) => {
	// Abre el formulario sin realizar el envío al final
	cy.openReservationForm()
	// Limpia y escribe el nombre en el campo `firstname`
	cy.get('[name="firstname"]').clear().type(nombre)
	// Limpia y escribe el apellido en el campo `lastname`
	cy.get('[name="lastname"]').clear().type(apellido)
	// Limpia y escribe el email en el campo `email`
	cy.get('[name="email"]').clear().type(email)
	// Limpia y escribe el teléfono en el campo `phone`
	cy.get('[name="phone"]').clear().type(telefono)
	// Intencionalmente no se hace click en el botón de envío para permitir validaciones previas
})

// Comando para enviar el formulario y esperar la respuesta del backend
// - `alias`: nombre del alias para interceptar la petición (por defecto 'creaReserva')
Cypress.Commands.add('submitReservation', (alias = 'creaReserva') => {
	// Intercepta la petición POST al endpoint de booking con el alias dado
	cy.intercept('POST', '**/api/booking**').as(alias)
	// Hace click en el botón de envío
	cy.get('.btn-primary').click()
	// Espera la petición interceptada y devuelve el objeto `response` para encadenar aserciones
	return cy.wait(`@${alias}`, { timeout: 10000 }).its('response')
})

// Comando que centraliza todas las validaciones de UI tras enviar el formulario
// - Realiza las mismas comprobaciones que anteriormente estaban inline en los tests:
//   * busca mensajes en `.alert > ul > li`
//   * comprueba `validationMessage` del input email (HTML5)
//   * busca textos específicos en el body ('must be a well-formed email address', 'size must be between 3 and 18')
//   * revisa cualquier elemento `.alert` por si el mensaje aparece fuera de una lista
// - Si no encuentra errores, por defecto verifica que aparezca el mensaje de confirmación
Cypress.Commands.add('assertValidacionCamposReserva', (options = { checkSuccess: true }) => {
	// Devuelve la cadena para seguir encadenando comandos Cypress
	return cy.get('body').then(($body) => {
		// Buscar elementos de lista dentro de alertas
		const $items = $body.find('.alert > ul > li')
		if ($items.length) {
			const messages = Array.from($items).map(el => el.innerText.trim()).join(' | ')
			cy.log('Se encontraron mensajes de validación:', messages)
			throw new Error('Errores de validación detectados: ' + messages)
		}

		// Comprobar validación nativa del input email
		const $email = $body.find('[name="email"]')
		if ($email.length && $email[0].validationMessage) {
			const msg = $email[0].validationMessage
			cy.log('Mensaje de validación nativa en campo email:', msg)
			throw new Error('Validación en campo email: ' + msg)
		}

		// Buscar texto dentro del body para casos no estructurados
		const bodyText = $body.text()
		if (bodyText && bodyText.includes('must be a well-formed email address')) {
			cy.log('Se detectó mensaje de validación: must be a well-formed email address')
			throw new Error('Mensaje de validación detectado: must be a well-formed email address')
		}

		if (bodyText && bodyText.includes('size must be between 3 and 18')) {
			cy.log('Se detectó mensaje de validación: size must be between 3 and 18')
			throw new Error('Mensaje de validación detectado: size must be between 3 and 18')
		}

		// Revisar cualquier elemento con clase .alert por si el texto aparece allí
		const $alerts = $body.find('.alert')
		if ($alerts.length) {
			const alertsText = Array.from($alerts).map(a => a.innerText.trim()).join(' | ')
			if (/size must be between/i.test(alertsText) || /must be a well-formed email address/i.test(alertsText)) {
				cy.log('Se detectó mensaje de validación en .alert:', alertsText)
				throw new Error('Mensaje de validación detectado: ' + alertsText)
			}
		}

		// Si se pidió, comprobar que el mensaje de confirmación aparece cuando no hay errores
		if (options.checkSuccess) {
			cy.contains('Your booking has been confirmed for the following dates:', { timeout: 10000 }).should('be.visible')
		}
	})
})

Cypress.Commands.add('loginAdmin', (username, password) => {
  cy.visit('https://automationintesting.online/admin/', { timeout: 12000 });

  // 1. Esperamos explícitamente a que el input de username no esté deshabilitado
  cy.get('#username', { timeout: 8000 })
    .should('be.visible')
    .should('not.be.disabled')
    .type(username, { force: true });
    
  // 2. Hacemos lo mismo con el password, y le sumamos { force: true } 
  // Esto obliga a Cypress a escribir aunque React meta un bloqueo momentáneo
  cy.get('#password')
    .should('not.be.disabled')
    .type(password, { force: true });
  
  // 3. Esperamos que el botón de login sea cliqueable y le damos marcha
  cy.get('#doLogin').should('not.be.disabled').click();
});

// Evita que Cypress falle los tests debido a excepciones no capturadas de la aplicación web
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false previene que Cypress falle el test
  return false;
});