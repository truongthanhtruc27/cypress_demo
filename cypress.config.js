const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "vb2ofv",

  e2e: {
    baseUrl: "http://localhost:3000",

    viewportWidth: 1280,
    viewportHeight: 720,

    screenshotOnRunFailure: true,

    video: false,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
