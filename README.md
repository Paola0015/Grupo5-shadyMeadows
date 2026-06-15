# Trabajo Final QA Automation - Grupo 5

## Descripción del Proyecto

Este proyecto corresponde al trabajo final del curso de QA Automation utilizando Cypress.

La aplicación web utilizada para las pruebas es **Shady Meadows**, un sistema de reservas de Bed & Breakfast.

## Aplicación testeada

https://automationintesting.online/

## Integrantes del Grupo

### Carolina Medina

Email: [carolinaestefaniamedina@gmail.com](mailto:carolinaestefaniamedina@gmail.com)

### Walter Tejerina

Email: [xwtejerina@gmail.com](mailto:xwtejerina@gmail.com)

### Juan Ignacio Poropat

Email: [poropatjuanignacio@gmail.com](mailto:poropatjuanignacio@gmail.com)

### Paola Venturini

Email: [paoandre225@gmail.com](mailto:paoandre225@gmail.com)

### Marcos Polzoni

Email: [marcos_polzoni@yahoo.com.ar](mailto:marcos_polzoni@yahoo.com.ar)


### Florencia Viale
Email:


## Herramientas utilizadas

* Cypress
* JavaScript
* GitHub
* Trello
* Google Drive / Google Sheets

## Enlaces del Proyecto

### Tablero Trello

https://trello.com/invite/b/6a2b2afbae4d77c5a09f62c1/ATTI9a2ff72e5f8fa4c0d03d47c9ecec5fdf95092542/grupo-5-qa-automation

### Casos de prueba (Drive)

https://drive.google.com/drive/folders/1FPu4GRcVf7W7ED5IRavupwgM0SB1ozoo

### Repositorio GitHub

https://github.com/usuario/grupo-5-qa-automation

## Estructura del Proyecto

```bash
cypress/
│── e2e/
│   └── myTestRestfullBooker.cy.js
│── fixtures/
│── support/
```

## Flujos Automatizados

### Reserva exitosa como usuario invitado

* Verificación de habitaciones disponibles
* Selección de habitación
* Completar formulario de reserva
* Confirmación exitosa

### Validaciones del formulario de reserva

* Validación de campos vacíos
* Mensajes de error
* Verificación de no creación de reserva

### Formulario de contacto

* Completar formulario
* Envío correcto
* Confirmación visual

## Ejecución del Proyecto

Instalar dependencias:

```bash
npm install
```

Abrir Cypress:

```bash
npx cypress open
```

Ejecutar tests:

```bash
npx cypress run
```
