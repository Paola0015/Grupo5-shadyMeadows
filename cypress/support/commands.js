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
Cypress.Commands.add("botonDisponibilidadDeHabitacionesHabilitado", (roomId) => {
  cy.get(`a.btn.btn-primary[href*="/reservation/${roomId}"]`)
    .should("be.visible")
    .and("contain", "Book now")
    .and("have.class", "btn")
    .and("have.class", "btn-primary");
});
Cypress.Commands.add("seleccionarRangoCalendario", (inicio, fin) => {

  cy.contains('button.rbc-button-link', inicio)
    .trigger('mousedown', { which: 1, force: true });

  cy.get('body')
    .trigger('mousemove', { force: true });

  cy.contains('button.rbc-button-link', fin)
    .trigger('mouseup', { force: true });


  cy.get('.rbc-event-content[title="Selected"]')
    .should('be.visible');

  cy.get('.rbc-event-content[title="Selected"]')
    .should('have.length.at.least', 2);

  cy.get('.rbc-event-content[title="Selected"]')
    .each(($el) => {
      cy.wrap($el)
        .should('be.visible')
        .and('contain.text', 'Selected');
    });

});
Cypress.Commands.add("hacerClickEnReservar", () => {

  cy.get("#doReservation")
    .should("be.visible")
    .click();

  cy.get(".room-firstname")
    .should("be.visible");

})
Cypress.Commands.add("validarFormularioReservaVisible", () => {

  cy.get("form")
    .should("be.visible");

  cy.get(".room-booking-form")
    .should("be.visible");

  cy.get(".room-firstname")
    .should("be.visible");

  cy.get(".room-lastname")
    .should("be.visible");

  cy.get(".room-email")
    .should("be.visible");

  cy.get(".room-phone")
    .should("be.visible");

});


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