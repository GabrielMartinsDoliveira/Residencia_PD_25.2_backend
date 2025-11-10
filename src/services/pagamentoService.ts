import { AppDataSource } from "../data-source";
import { Pagamento } from "../models/Pagamento";

const pagamentoRepository = AppDataSource.getRepository(Pagamento);

export const PagamentoService = {

  async criarPagamento(dados: Partial<Pagamento>): Promise<Pagamento> {
    const novoPagamento = pagamentoRepository.create(dados);
    return await pagamentoRepository.save(novoPagamento);
  },

  async listarPagamentos(): Promise<Pagamento[]> {
    return await pagamentoRepository.find();
  },

  async buscarPorId(id: string): Promise<Pagamento | null> {
    return await pagamentoRepository.findOne({
      where: { id },
      relations: ["idEmprestimo"],
    });
  },

  async atualizarStatus(id: string, status: string): Promise<Pagamento> {
    const pagamento = await pagamentoRepository.findOneBy({ id });
    if (!pagamento) throw new Error("Pagamento não encontrado");

    pagamento.status = status as any;
    return await pagamentoRepository.save(pagamento);
  },

 
  async deletarPagamento(id: string): Promise<void> {
    const pagamento = await pagamentoRepository.findOneBy({ id });
    if (!pagamento) throw new Error("Pagamento não encontrado");

    await pagamentoRepository.remove(pagamento);
  },
};