import { Request, Response } from "express";
import { InvestimentoService } from "../services/investimentoService.js";

const service = new InvestimentoService();

export const createInvestimento = async (req: Request, res: Response) => {
  try {
    const investimento = await service.createInvestimento(req.body);
    res.status(201).json(investimento);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getInvestimentos = async (_req: Request, res: Response) => {
  try {
    const investimentos = await service.getInvestimentos();
    res.status(200).json(investimentos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getInvestimentoById = async (req: Request, res: Response) => {
  try {
    const investimento = await service.getInvestimentoById(req.params.id);
    if (!investimento) {
      return res.status(404).json({ message: "Investimento não encontrado" });
    }
    res.status(200).json(investimento);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateStatusInvestimento = async (req: Request, res: Response) => {
  try {
    const investimento = await service.updateStatusInvestimento(
      req.params.id,
      req.body.status
    );
    res.status(200).json(investimento.status);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteInvestimentoById = async (req: Request, res: Response) => {
  try {
    await service.deleteInvestimento(req.params.id);
    res.status(200).json({ message: "Investimento excluído com sucesso" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};