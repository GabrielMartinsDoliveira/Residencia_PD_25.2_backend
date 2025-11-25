import { AppDataSource } from "../data-source.js";
import { Usuario } from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class AuthService {
  private userRepo = AppDataSource.getRepository(Usuario);

  async login(matricula: string, senha: string) {
    const user = await this.userRepo.findOne({ where: { matricula } });

    if (!user) {
      throw new Error("Usuário com essa matrícula não foi encontrado.");
    }

    const senhaCorreta = await user.compararSenha(senha);
    if (!senhaCorreta) {
      throw new Error("Credenciais inválidas.");
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return {
      token,
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        matricula: user.matricula,
        role: user.role,
      },
    };
  }
}
