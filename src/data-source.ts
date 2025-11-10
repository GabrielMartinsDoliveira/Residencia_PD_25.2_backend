import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./models/Usuario.js";
import { Pagamento } from "./models/Pagamento.js";
import { Emprestimo } from "./models/Emprestimo.js";
import { Investimento } from "./models/Investimento.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "sua_senha",
  database: process.env.DB_NAME || "meu_banco",
  synchronize: true, // ⚠️ use false em produção
  logging: false,
  entities: [Usuario, Pagamento, Emprestimo, Investimento],
});