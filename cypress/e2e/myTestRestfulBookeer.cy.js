Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Trabajo Final QA - Shady Meadows', () => {

  beforeEach(() => {
    cy.visit("/");
  });

  // =========================
  // 3.1 RESERVA EXITOSA COMO USUARIO INVITADO
  // =========================

    it('3.1.1 Verificar navegación a página principal', () => {
      // validar que se muestra el mensaje de bienvenida
      cy.contains("Welcome to Shady Meadows B&B")
        .should("be.visible");
      // validar que se muestra el botón de reserva
      cy.get('a[href="#booking"]')
        .should("be.visible")
        .click();
      //validar que se navega a la sección de reserva
      cy.url().should("include", "#booking");

      cy.get("#booking").should("be.visible");
      // validar que se muestran las tarjetas de habitaciones disponibles
      cy.fixture("rooms").then((data) => {

        data.rooms.forEach((room) => {
          cy.contains("h5.card-title", room.type)
            .should("be.visible");
        });

      });

    });

it("3.1.2 Verificar selección de habitación y formulario", () => {

  cy.fixture("rooms").then((data) => {

    cy.wrap(data.rooms).each((room) => {
      //Validar que el botón de disponibilidad de cada habitación esté habilitado
      cy.botonDisponibilidadDeHabitacionesHabilitado(room.id)
        .click();
      //validar que se navega a la página de reserva correspondiente
      cy.url().should("include", `/reservation/${room.id}`);
      //validar que se muestra el formulario de reserva
      cy.get("form").should("be.visible");
      //volver a la página principal para la siguiente iteración
      cy.go("back");
    });

  });

});




 
    // TODO:
    // Completar formulario con datos validos ( nombre, apellido, email, telefono, fechas)
    // Confirmar reserva




  // 3.2 Validaciones formulario reserva

  it('Validaciones del formulario de reserva', () => {

    //Paola

    // verificar que aparecen los mensajes de error correspondientes
    // Verificar que no se realizó reserva
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
  

