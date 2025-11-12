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
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [Usuario, Pagamento, Emprestimo, Investimento],
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
