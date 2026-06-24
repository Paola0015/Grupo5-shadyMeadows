Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Trabajo Final QA - Shady Meadows', () => {

  // 3.1 Reserva exitosa como usuario invitado

  it('Reserva exitosa como usuario invitado', () => {

    cy.visit('https://automationintesting.online/')

    // TODO:
    // navegar a la pagina principal y verificar que se muestran las habitaciones disponibles
    // Seleccionar una habitacion y abrir el formulario de reserva
    // Completar formulario con datos validos ( nombre, apellido, email, telefono, fechas)
    // Confirmar reserva

  })


  // 3.2 Validaciones formulario reserva

  it('Validaciones del formulario de reserva', () => {

    //Paola

    // verificar que aparecen los mensajes de error correspondientes
    // Verificar que no se realizó reserva
    // sumar Vlidacion de Api, al menos una
    // sumar Validacion de imagen que corresponda con la de una habitacion
   it('Validar que la imagen de la habitación de reserva se corresponda con la misma', ()=>{

        cy.visit('https://automationintesting.online/')
        cy.get('[href="/#rooms"]').click()
        cy.contains('Our Rooms').should('be.visible')
        cy.get('a[href*="reservation/2"]').click()
        cy.contains('Double Room').should('be.visible')
        cy.contains('TV').should('be.visible')
        cy.contains('Radio').should('be.visible')
        cy.contains('Safe').should('be.visible')
        cy.url().should('include', '/reservation/2')
      
        cy.get('img').should('have.attr', 'src').and('include', '/images/room2.jpg')
       })



  // 3.3 Formulario de contacto

  it('Formulario de contacto exitoso', () => {

    cy.visit('https://automationintesting.online/')

    // TODO:
    // Completar formulario contacto con datos validos
    // Enviar mensaje y validar que se muestra la informacion
    it('Enviar formulario de contacto en blanco y validar los mensajes de error que aparecen', ()=>{
        cy.visit('https://automationintesting.online/')
        cy.get('[href="/#contact"]').click()
        cy.contains('Send Us a Message').should('be.visible')
        cy.contains('button', 'Submit').click()
        cy.contains('Email may not be blank').should('be.visible')
        cy.contains('Subject must be between 5 and 100 characters.').should('be.visible')
        cy.contains('Message may not be blank').should('be.visible')
        cy.contains('Subject may not be blank').should('be.visible')
        cy.contains('Phone may not be blank').should('be.visible')
        cy.contains('Name may not be blank').should('be.visible')
        cy.contains('Phone must be between 11 and 21 characters.').should('be.visible')
        cy.contains('Message must be between 20 and 2000 characters.').should('be.visible')

    })
    it('Enviar formulario de contacto con datos correctos y "abc" en mail y validar que aparece mensaje de error (must be a well-formed email address).', ()=>{
      cy.visit('https://automationintesting.online/')
      cy.fixture('contactFormValues').then((contactFormValues) => {
        const values = contactFormValues
        cy.get('[data-testid="ContactName"]').type(values.Name)
        cy.get('[data-testid="ContactEmail"]').type('abc')
        cy.get('[data-testid="ContactPhone"]').type(values.Phone)
        cy.get('[data-testid="ContactSubject"]').type(values.Subject)
        cy.get('[data-testid="ContactDescription"]').type(values.Message)
        cy.contains('button', 'Submit').click()
        cy.contains('must be a well-formed email address').should('be.visible')
      })
    })

    it('Enviar formulario de contacto con datos correctos y 20 caracteres en mensaje y validar que se confirma el envío de consulta', ()=>{
      cy.visit('https://automationintesting.online/')
      cy.fixture('contactFormValues').then((contactFormValues) => {
        const values = contactFormValues
        cy.get('[data-testid="ContactName"]').type(values.Name)
        cy.get('[data-testid="ContactEmail"]').type(values.Email)
        cy.get('[data-testid="ContactPhone"]').type(values.Phone)
        cy.get('[data-testid="ContactSubject"]').type(values.Subject)
        cy.get('[data-testid="ContactDescription"]').type(values.Message)
        cy.contains('button', 'Submit').click()
        cy.contains('Thanks for getting in touch John Doe!').should('be.visible')
        cy.contains('get back to you about').should('be.visible')
        cy.contains(values.Subject).should('be.visible')
        cy.contains('as soon as possible').should('be.visible')
      })
    })

    it('Enviar formulario de contacto con telefono usando como caracteres 11 letras y verificar que aparece mensaje de error.(must be a valid phone)', ()=>{
      cy.visit('https://automationintesting.online/')
      cy.fixture('contactFormValues').then((contactFormValues) => {
        const values = contactFormValues
        cy.get('[data-testid="ContactName"]').type(values.Name)
        cy.get('[data-testid="ContactEmail"]').type(values.Email)
        cy.get('[data-testid="ContactPhone"]').type('abcdefghijk')
        cy.get('[data-testid="ContactSubject"]').type(values.Subject)
        cy.get('[data-testid="ContactDescription"]').type(values.Message)
        cy.contains('button', 'Submit').click()
        cy.contains('Must be a valid phone.').should('be.visible')
      })
    })
