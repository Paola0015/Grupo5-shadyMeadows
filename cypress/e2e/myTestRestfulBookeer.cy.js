describe('Trabajo Final QA - Shady Meadows', () => {

  // ==========================================
  // 3.1 Reserva exitosa como usuario invitado
  // ==========================================

  it('Reserva exitosa como usuario invitado', () => {

    cy.visit('https://automationintesting.online/')

    // TODO:
    // navegar a la pagina principal y verificar que se muestran las habitaciones disponibles 
    // Seleccionar una habitacion y abrir el formulario de reserva 
    // Completar formulario con datos validos ( nombre, apellido, email, telefono, fechas)
    // Confirmar reserva
    

  })


  // ==========================================
  // 3.2 Validaciones formulario reserva
  // ==========================================

  it('Validaciones del formulario de reserva', () => {

    cy.visit('https://automationintesting.online/')

    // TODO:
    // verificar que aparecen los mensajes de error correspondientes
    // Verificar que no se realizó reserva
    // sumar Vlidacion de Api, al menos una
    // sumar Validacion de imagen que corresponda con la de una habitacion

  })


  // ==========================================
  // 3.3 Formulario de contacto
  // ==========================================

  it('Formulario de contacto exitoso', () => {

    cy.visit('https://automationintesting.online/')

    // TODO:
    // Completar formulario contacto con datos validos 
    // Enviar mensaje y validar que se muestra la informacion 
    // sumar que se envie correctamente el mail

  })

})