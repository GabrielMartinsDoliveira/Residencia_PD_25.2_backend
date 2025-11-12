import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { swaggerUi, swaggerSpec } from "./swagger.js"
import { AppDataSource } from "./data-source.js";
import investimentoRoutes from "./routes/investimentoRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import emprestimoRoutes from "./routes/emprestimoRoutes.js";
import pagamentoRoutes from "./routes/pagamentoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/usuario", usuarioRoutes);
app.use("/investimento", investimentoRoutes);
app.use("/emprestimo", emprestimoRoutes);
app.use("/pagamento", pagamentoRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Banco conectado com sucesso!");
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar com o banco:", err);
  });
