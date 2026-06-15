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

      cy.contains("Welcome to Shady Meadows B&B")
        .should("be.visible");

      cy.get('a[href="#booking"]')
        .should("be.visible")
        .click();

      cy.url().should("include", "#booking");

      cy.get("#booking").should("be.visible");

      cy.fixture("rooms").then((data) => {

        data.rooms.forEach((room) => {
          cy.contains("h5.card-title", room.type)
            .should("be.visible");
        });

      });

    });

    it("3.1.2 Verificar seleccion de habitación y formulario", () => {

      cy.fixture("rooms").then((data) => {

        data.rooms.forEach((room) => {

          cy.get(`a[href*="/reservation/${room.id}"]`)
            .should("be.visible")
            .click();

          cy.url().should("include", `/reservation/${room.id}`);

          cy.get("form").should("be.visible");

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
  

