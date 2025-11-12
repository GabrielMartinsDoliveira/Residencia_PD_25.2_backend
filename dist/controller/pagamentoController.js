import { PagamentoService } from "../services/pagamentoService.js";
export const PagamentoController = {
    async criar(req, res) {
        try {
            const pagamento = await PagamentoService.criarPagamento(req.body);
            res.status(201).json(pagamento);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    async listar(req, res) {
        try {
            const pagamentos = await PagamentoService.listarPagamentos();
            res.status(200).json(pagamentos);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const pagamento = await PagamentoService.buscarPorId(id);
            if (!pagamento) {
                return res.status(404).json({ message: "Pagamento não encontrado" });
            }
            res.status(200).json(pagamento);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    async atualizarStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const pagamentoAtualizado = await PagamentoService.atualizarStatus(id, status);
            res.status(200).json(pagamentoAtualizado);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    async deletar(req, res) {
        try {
            const { id } = req.params;
            await PagamentoService.deletarPagamento(id);
            res.status(200).json({ message: "Pagamento excluído" });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};
