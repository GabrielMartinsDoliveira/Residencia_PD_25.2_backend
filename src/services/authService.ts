import { AppDataSource } from "../data-source.js";
import { Usuario } from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const blacklistedTokens = new Set<string>();

export class AuthService {
  private userRepo = AppDataSource.getRepository(Usuario);

  async login(email: string, senha: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new Error("Usuário não foi encontrado.");
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

  async logout(token: string): Promise<void> {
    // Adiciona o token à blacklist
    blacklistedTokens.add(token);
    
    // Opcional: Remover token após o tempo de expiração para limpar memória
    setTimeout(() => {
      blacklistedTokens.delete(token);
    }, 3600000); // 1 hora
  }

  isTokenBlacklisted(token: string): boolean {
    return blacklistedTokens.has(token);
  }
}