import { Request, Response } from "express";
import { AuthService } from "../services/authService.js";

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const { matricula, senha } = req.body;

    const resultado = await authService.login(matricula, senha);

    res.status(200).json(resultado);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
