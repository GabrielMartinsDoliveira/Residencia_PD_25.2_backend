import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./src/data-source.js";
import investimentoRoutes from "./src/routes/investimentoRoutes.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import emprestimoRoutes from "./src/routes/emprestimoRoutes.js"
import pagamentoRoutes from "./src/routes/pagamentoRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/usuarios", usuarioRoutes);
app.use("/investimentos", investimentoRoutes);
app.use("/emprestimos", emprestimoRoutes);
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