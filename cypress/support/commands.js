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

// Comando para abrir el formulario de reserva (selección de fechas y apertura del formulario)
Cypress.Commands.add('openReservationForm', () => {
	cy.get('.col-lg-8 > .btn').click()
	cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click()
	cy.get('.react-datepicker__navigation--next').click()
	cy.get('.react-datepicker__day--015').click() // Modificar 015 si se repite la prueba Caso de prueba 3.1.4 'Confirmar la reserva y validar que el mensaje de éxito con usuario invitado'
	cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click()
	cy.get('.react-datepicker__navigation--next').click()
	cy.get('.react-datepicker__day--020').click() // Modificar 020 si se repite la prueba Caso de prueba 3.1.4 'Confirmar la reserva y validar que el mensaje de éxito con usuario invitado'
	cy.get('.col-8 > .btn').click()
	cy.get(':nth-child(1) > .card > .card-footer > .btn').should('be.visible').click()
	cy.url().should('include', '/reservation/')
	cy.get('#doReservation').should('be.visible').click()
	cy.get('form').should('be.visible')
})



// Comando para abrir + rellenar el formulario de reserva y confirmándola.
Cypress.Commands.add('fillReservationForm', (nombre, apellido, email, telefono) => {
	cy.openReservationForm()
	cy.get('[name="firstname"]').type(nombre)
	cy.get('[name="lastname"]').type(apellido)
	cy.get('[name="email"]').type(email)
	cy.get('[name="phone"]').type(telefono)
	cy.get('.btn-primary').click()
})