import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { swaggerUi, swaggerSpec } from "./swagger.js";
import { AppDataSource } from "./data-source.js";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import investimentoRoutes from "./routes/investimentoRoutes.js";
import aplicacaoRoutes from "./routes/aplicacaoRoutes.js";
import emprestimoRoutes from "./routes/emprestimoRoutes.js";
import pagamentoRoutes from "./routes/pagamentoRoutes.js";
import authRoutes from "./routes/authRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes)
app.use("/usuarios", usuarioRoutes);
app.use("/investimentos", investimentoRoutes);
app.use("/aplicacoes", aplicacaoRoutes);
app.use("/emprestimos", emprestimoRoutes);
app.use("/pagamentos", pagamentoRoutes);

const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado ao banco Supabase Postgres com sucesso!");
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar com o banco de dados Supabase:");
    console.error(err.message || err);
    process.exit(1);
  });
