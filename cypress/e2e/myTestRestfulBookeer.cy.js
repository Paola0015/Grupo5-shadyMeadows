Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Trabajo Final QA - Shady Meadows', () => {

    beforeEach(() => {
      cy.visit('https://automationintesting.online/');
  });

  // 3.3 Formulario de contacto

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


    // TODO:
    // Completar formulario contacto con datos validos
    // Enviar mensaje y validar que se muestra la informacion
    // sumar que se envie correctamente el mail

  })

