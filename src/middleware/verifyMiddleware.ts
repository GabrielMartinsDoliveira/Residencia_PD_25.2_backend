import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    res.status(403).json({ error: "Token não fornecido." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // adiciona o id do usuário à requisição
    (req as any).userId = decoded.userId;
    (req as any).role = decoded.role;

    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido ou expirado." });
  }
};