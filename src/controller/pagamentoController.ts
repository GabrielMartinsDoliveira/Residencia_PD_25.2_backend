import { Request, Response } from "express";
import { PagamentoService } from "../services/pagamentoService.js";

export const PagamentoController = {
  async criar(req: Request, res: Response) {
    try {
      const pagamento = await PagamentoService.criarPagamento(req.body);
      res.status(201).json(pagamento);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async listar(req: Request, res: Response) {
    try {
      const pagamentos = await PagamentoService.listarPagamentos();
      res.status(200).json(pagamentos);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async listarPorEmprestimo(req: Request, res: Response) {
    try {
      const { emprestimoId } = req.params;

      const pagamentos = await PagamentoService.listarPagamentosPorEmprestimo(
        emprestimoId
      );

      res.status(200).json(pagamentos);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pagamento = await PagamentoService.buscarPorId(id);

      if (!pagamento) {
        return res.status(404).json({ message: "Pagamento não encontrado" });
      }

      res.status(200).json(pagamento);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async atualizarStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const pagamentoAtualizado = await PagamentoService.atualizarStatus(
        id,
        status
      );
      res.status(200).json(pagamentoAtualizado);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await PagamentoService.deletarPagamento(id);
      res.status(200).json({ message: "Pagamento excluído" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
