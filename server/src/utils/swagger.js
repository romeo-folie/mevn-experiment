const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Client Provider API",
      version: "1.0.0",
    },
  },
  apis: [path.join(process.cwd(), "/src/routes/*.routes.js")],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
