import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // carrega variáveis do .env antes de tudo
import { swaggerUi, swaggerSpec } from "./swagger.js";
import { AppDataSource } from "./data-source.js";
import investimentoRoutes from "./routes/investimentoRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import emprestimoRoutes from "./routes/emprestimoRoutes.js";
import pagamentoRoutes from "./routes/pagamentoRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
// 📘 Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// 🧭 Rotas
app.use("/usuario", usuarioRoutes);
app.use("/investimento", investimentoRoutes);
app.use("/emprestimo", emprestimoRoutes);
app.use("/pagamento", pagamentoRoutes);
const PORT = process.env.PORT || 3000;
// 🚀 Inicialização da conexão e do servidor
AppDataSource.initialize()
    .then(() => {
    console.log("✅ Conectado ao banco Supabase Postgres com sucesso!");
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
})
    .catch((err) => {
    console.error("❌ Erro ao conectar com o banco de dados Supabase:");
    console.error(err.message || err);
    process.exit(1); // encerra o processo caso a conexão falhe
});
