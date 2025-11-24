import { Request, Response } from "express";
import { EmprestimoService } from "../services/emprestimoService.js";

const service = new EmprestimoService();

export const createEmprestimo = async (req: Request, res: Response) => {
  try {
    const emprestimo = await service.createEmprestimo(req.body);
    return res.status(201).json(emprestimo);

  } catch (error: any) {
    return handleError(res, error);
  }
};

export const getEmprestimos = async (_req: Request, res: Response) => {
  try {
    const emprestimos = await service.getEmprestimos();
    return res.status(200).json(emprestimos);

  } catch (error: any) {
    return handleError(res, error);
  }
};

export const getEmprestimoById = async (req: Request, res: Response) => {
  try {
    const emprestimo = await service.getEmprestimoById(req.params.id);

    if (!emprestimo) {
      return res.status(404).json({ error: "Empréstimo não encontrado" });
    }

    return res.status(200).json(emprestimo);

  } catch (error: any) {
    return handleError(res, error);
  }
};

export const getEmprestimosPorTomador = async (req: Request, res: Response) => {
  try {
    const emprestimos = await service.getEmprestimosPorTomador(req.params.tomadorId);
    return res.status(200).json(emprestimos);

  } catch (error: any) {
    return handleError(res, error);
  }
};

export const updateEmprestimo = async (req: Request, res: Response) => {
  try {
    const emprestimo = await service.updateEmprestimo(req.params.id, req.body);
    return res.status(200).json(emprestimo);

  } catch (error: any) {
    return handleError(res, error);
  }
};

export const deleteEmprestimo = async (req: Request, res: Response) => {
  try {
    await service.deleteEmprestimo(req.params.id);
    return res.status(200).json({ message: "Empréstimo excluído com sucesso" });

  } catch (error: any) {
    return handleError(res, error);
  }
};

/**
 * Tratamento centralizado de erros
 */
function handleError(res: Response, error: any) {
  console.error(error);

  const mensagem = error.message || "Erro desconhecido";

  if (mensagem.includes("não encontrado")) {
    return res.status(404).json({ error: mensagem });
  }

  if (mensagem.includes("credenciais") || mensagem.includes("permissão")) {
    return res.status(403).json({ error: mensagem });
  }

  if (mensagem.includes("inválido") || mensagem.includes("deve ser")) {
    return res.status(422).json({ error: mensagem });
  }

  // Se não for erro esperado → erro interno
  return res.status(500).json({ error: "Erro interno no servidor" });
}
