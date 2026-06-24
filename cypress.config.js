const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
      baseUrl: "https://automationintesting.online/",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    retries: 1,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
