import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API do Sistema de Empréstimos",
      version: "1.0.0",
      description: "Documentação da API de Empréstimos, Pagamentos e Usuários",
    },
    servers: [
      {
        url: "https://residencia-crowndfundig-backend.onrender.com/",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
