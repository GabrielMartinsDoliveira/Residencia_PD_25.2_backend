import { Request, Response } from "express";
import { AuthService } from "../services/authService.js";

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórias." });
    }

    const resultado = await authService.login(email, senha);
    res.json(resultado);
  } catch (error) {
    res.status(401).json({ error: "Erro ao realizar login"});
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    
    if (!token) {
      return res.status(400).json({ error: "Token não fornecido." });
    }

    await authService.logout(token);
    
    res.json({ message: "Logout realizado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar logout." });
  }
};