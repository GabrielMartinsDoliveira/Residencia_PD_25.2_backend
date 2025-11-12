import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./models/Usuario.js";
import { Pagamento } from "./models/Pagamento.js";
import { Emprestimo } from "./models/Emprestimo.js";
import { Investimento } from "./models/Investimento.js";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Usuario, Pagamento, Emprestimo, Investimento],
});
