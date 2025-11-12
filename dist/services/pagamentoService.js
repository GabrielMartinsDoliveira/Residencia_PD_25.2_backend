import { AppDataSource } from "../data-source.js";
import { Pagamento } from "../models/Pagamento.js";
const pagamentoRepository = AppDataSource.getRepository(Pagamento);
export const PagamentoService = {
    async criarPagamento(dados) {
        const novoPagamento = pagamentoRepository.create(dados);
        return await pagamentoRepository.save(novoPagamento);
    },
    async listarPagamentos() {
        return await pagamentoRepository.find({ relations: ["emprestimo"] });
    },
    async buscarPorId(id) {
        return await pagamentoRepository.findOne({
            where: { id },
            relations: ["emprestimo"],
        });
    },
    async atualizarStatus(id, status) {
        const pagamento = await pagamentoRepository.findOneBy({ id });
        if (!pagamento)
            throw new Error("Pagamento não encontrado");
        pagamento.status = status;
        return await pagamentoRepository.save(pagamento);
    },
    async deletarPagamento(id) {
        const pagamento = await pagamentoRepository.findOneBy({ id });
        if (!pagamento)
            throw new Error("Pagamento não encontrado");
        await pagamentoRepository.remove(pagamento);
    },
};
