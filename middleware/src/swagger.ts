import swaggerJsdoc, { Options } from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Casper Blockexplorer middleware API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts", "./src/index.ts"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

export const uiOptions: SwaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Casper Blockexplorer middleware API",
  customfavIcon: "/assets/favicon.ico",
};

export default openapiSpecification;
