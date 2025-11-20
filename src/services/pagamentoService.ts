import { AppDataSource } from "../data-source.js";
import { Pagamento } from "../models/Pagamento.js";
import { Emprestimo } from "../models/Emprestimo.js";

const pagamentoRepository = AppDataSource.getRepository(Pagamento);
const emprestimoRepository = AppDataSource.getRepository(Emprestimo);

export const PagamentoService = {
  
  async criarPagamento(dados: Partial<Pagamento>): Promise<Pagamento> {
    if (!dados.emprestimo || !dados.emprestimo.id) {
      throw new Error("É necessário informar o ID do empréstimo.");
    }

    // Buscar o empréstimo
    const emprestimo = await emprestimoRepository.findOne({
      where: { id: dados.emprestimo.id },
    });

    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado");
    }

    // Criar pagamento
    const pagamento = pagamentoRepository.create(dados);
    const saved = await pagamentoRepository.save(pagamento);

    // Se não for pago, não abate saldo
    if (saved.status !== "pago") return saved;

    // Abater saldo do empréstimo
    let valorPagamento = Number(saved.valor);

    if (saved.multa) {
      valorPagamento += Number(saved.multa);
    }

    emprestimo.saldoDevedor = Number(emprestimo.saldoDevedor) - valorPagamento;

    // Se quitou
    if (emprestimo.saldoDevedor <= 0) {
      emprestimo.saldoDevedor = 0;
      emprestimo.status = "quitado";
    }

    await emprestimoRepository.save(emprestimo);

    return saved;
  },

  async listarPagamentos(): Promise<Pagamento[]> {
    return await pagamentoRepository.find({ relations: ["emprestimo"] });
  },

  async buscarPorId(id: string): Promise<Pagamento | null> {
    return await pagamentoRepository.findOne({
      where: { id },
      relations: ["emprestimo"],
    });
  },

  async atualizarStatus(id: string, status: string): Promise<Pagamento> {
    const pagamento = await pagamentoRepository.findOne({
      where: { id },
      relations: ["emprestimo"],
    });

    if (!pagamento) throw new Error("Pagamento não encontrado");

    pagamento.status = status as any;
    const saved = await pagamentoRepository.save(pagamento);

    // Se o status mudou para "pago", abater do empréstimo
    if (status === "pago" && pagamento.emprestimo) {
      const emprestimo = pagamento.emprestimo;

      let valor = Number(pagamento.valor);
      if (pagamento.multa) valor += Number(pagamento.multa);

      emprestimo.saldoDevedor -= valor;

      if (emprestimo.saldoDevedor <= 0) {
        emprestimo.saldoDevedor = 0;
        emprestimo.status = "quitado";
      }

      await emprestimoRepository.save(emprestimo);
    }

    return saved;
  },

  async deletarPagamento(id: string): Promise<void> {
    const pagamento = await pagamentoRepository.findOneBy({ id });
    if (!pagamento) throw new Error("Pagamento não encontrado");

    await pagamentoRepository.remove(pagamento);
  },
};
