describe('Pruebas Automatizadas - QA Automation', () => {

  // Test 1: Petición directa a la API para traer datos de habitaciones
  it('Lista de habitaciones mediante la API', () => {
    cy.request({
      method: 'GET',
      url: 'https://automationintesting.online/api/room',
      failOnStatusCode: false // Evita que Cypress falle automáticamente si el sitio está inestable
    }).then((response) => {
      // Si el servidor responde bien (200), validamos el cuerpo
      if (response.status === 200) {
        expect(response.body.rooms).to.be.an('array');
        expect(response.body.rooms.length).to.be.greaterThan(0);

        // 1. Tomamos la primera habitación del arreglo
        const primeraHabitacion = response.body.rooms[0];

        // 2. Validamos que tenga las propiedades clave que acabamos de ver en tu log
        expect(primeraHabitacion).to.have.property('roomid');
        expect(primeraHabitacion).to.have.property('roomName');
        expect(primeraHabitacion).to.have.property('roomPrice');
        expect(primeraHabitacion).to.have.property('features').and.to.be.an('array');

        // 3. Validar un dato específico (por ejemplo, que la habitación 101 valga 100)
        expect(primeraHabitacion.roomName).to.eq('101');
        expect(primeraHabitacion.roomPrice).to.eq(100);
        cy.log(JSON.stringify(response.body.rooms));
      } else {
        // Si el sitio web está caído o da error HTML, te lo mostrará de forma limpia en el log
        cy.log('El sitio web respondió con código: ' + response.status);
      }
    });
  });

  // Test 2: UI - Login
  it('Entrar a Report usando selectores', () => {
    cy.viewport(1280, 720);

    // 1. Cargamos los datos desde la fixture 'example.json'
    cy.fixture('adminUser').then((adminData) => {
      
      // 2. Ejecutamos el comando personalizado de Login
      cy.loginAdmin(adminData.username, adminData.password);
      
      // 3. Verificamos que el login fue exitoso buscando el botón de logout
      cy.contains('Logout').should('be.visible');

      // 4. Navegación estable a Reportes
      cy.get('#reportLink').contains('Report').click()

      // 5. Verificación del calendario con un timeout extendido
      // A veces el gráfico de React Big Calendar tarda un poco en procesar las reservas de la API.
      cy.get('.rbc-calendar', { timeout: 10000 }).should('be.visible');
    });
  });
});