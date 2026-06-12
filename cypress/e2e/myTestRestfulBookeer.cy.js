describe('Trabajo Final QA - Shady Meadows', () => {

  // ==========================================
  // 3.1 Reserva exitosa como usuario invitado
  // ==========================================

  it('Reserva exitosa como usuario invitado', () => {

    cy.visit('https://automationintesting.online/')

    // TODO:
    // Verificar habitaciones disponibles
    // Seleccionar habitación
    // Completar formulario
    // Confirmar reserva
    // Validar mensaje de éxito

  })


  // ==========================================
  // 3.2 Validaciones formulario reserva
  // ==========================================

  it('Validaciones del formulario de reserva', () => {

    cy.visit('https://automationintesting.online/')

    // TODO:
    // Intentar enviar vacío
    // Validar mensajes de error
    // Verificar que no se realizó reserva

  })


  // ==========================================
  // 3.3 Formulario de contacto
  // ==========================================

  it('Formulario de contacto exitoso', () => {

    cy.visit('https://automationintesting.online/')

    // TODO:
    // Completar formulario contacto
    // Enviar formulario
    // Validar confirmación

  })

})