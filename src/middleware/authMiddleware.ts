import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source.js";
import { Usuario } from "../models/Usuario.js";


export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { matricula, senha } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(Usuario);
    const user = await userRepository.findOne({ where: { matricula } });

    if (!user) {
      res
        .status(401)
        .json({ error: "Usuário com essa matrícula não foi encontrado." });
      return;
    }

    const senhaCorreta = await user.compararSenha(senha);
    if (!senhaCorreta) {
      res.status(401).json({ error: "Credenciais inválidas." });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // adiciona os dados de autenticação ao objeto da requisição
    (req as any).auth = {
      token,
      userId: user.id,
      role: user.role,
    };

    next();
  } catch (err) {
    console.error("Erro no authMiddleware:", err);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};