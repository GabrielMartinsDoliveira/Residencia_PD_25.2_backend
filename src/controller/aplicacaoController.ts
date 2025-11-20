import { Request, Response } from "express";
import { AplicacaoService } from "../services/aplicacaoService.js";

const service = new AplicacaoService();

export const aplicarEmInvestimento = async (req: Request, res: Response) => {
  try {
    const { usuarioId, valor } = req.body;
    const { investimentoId } = req.params;

    if (!usuarioId || !valor) {
      return res.status(400).json({
        error: "Campos obrigatórios: usuarioId, valor",
      });
    }

    const aplicacao = await service.aplicar(usuarioId, investimentoId, valor);

    res.status(201).json(aplicacao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAplicacoesPorInvestimento = async (
  req: Request,
  res: Response
) => {
  try {
    const { investimentoId } = req.params;

    const aplicacoes = await service.getAplicacoesPorInvestimento(
      investimentoId
    );

    res.status(200).json(aplicacoes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAplicacoesPorUsuario = async (req: Request, res: Response) => {
  try {
    const { usuarioId } = req.params;

    const aplicacoes = await service.getAplicacoesPorUsuario(usuarioId);

    res.status(200).json(aplicacoes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAplicacaoById = async (req: Request, res: Response) => {
  try {
    const aplicacao = await service.getAplicacaoById(req.params.id);

    if (!aplicacao) {
      return res.status(404).json({ message: "Aplicação não encontrada" });
    }

    res.status(200).json(aplicacao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
