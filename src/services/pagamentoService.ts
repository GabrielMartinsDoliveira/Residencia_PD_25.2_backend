import { AppDataSource } from "../data-source.js";
import { Pagamento } from "../models/Pagamento.js";
import { Emprestimo } from "../models/Emprestimo.js";

const pagamentoRepository = AppDataSource.getRepository(Pagamento);
const emprestimoRepository = AppDataSource.getRepository(Emprestimo);

export const PagamentoService = {

  async gerarPagamentosParaEmprestimo(emprestimo: Emprestimo): Promise<Pagamento[]> {
    const pagamentosGerados: Pagamento[] = [];

    const prazo = Number(emprestimo.prazo);
    const montante = Number(emprestimo.montante);
    const juros = Number(emprestimo.juros) / 100;

    
    const i = juros;
    const n = prazo;

    const valorParcela =
      i > 0
        ? montante * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
        : montante / n;

    
    const hoje = new Date();

    for (let k = 1; k <= n; k++) {
      const venc = new Date(hoje);
      venc.setMonth(venc.getMonth() + k); // parcela mensal

      const pagamento = pagamentoRepository.create({
        emprestimo,
        status: "em aberto",
        metodo: "boleto",
        valor: Number(valorParcela.toFixed(2)),
        dataPagamento: null,
        dataVencimento: venc
      });

      pagamentosGerados.push(pagamento);
    }

    return await pagamentoRepository.save(pagamentosGerados);
  },
 
  async criarPagamento(dados: Partial<Pagamento>): Promise<Pagamento> {
    if (!dados.emprestimo || !dados.emprestimo.id) {
      throw new Error("É necessário informar o ID do empréstimo.");
    }

    const emprestimo = await emprestimoRepository.findOne({
      where: { id: dados.emprestimo.id },
    });

    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado");
    }

    const pagamento = pagamentoRepository.create(dados);
    const saved = await pagamentoRepository.save(pagamento);
    
    if (saved.status !== "pago") return saved;

    let valorPagamento = Number(saved.valor);
    if (saved.multa) valorPagamento += Number(saved.multa);

    emprestimo.saldoDevedor -= valorPagamento;

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

   async listarPagamentosPorEmprestimo(
    emprestimoId: string
  ): Promise<Pagamento[]> {
    const pagamentos = await pagamentoRepository.find({
      where: { emprestimo: { id: emprestimoId } },
      relations: ["emprestimo"],
      order: { dataPagamento: "ASC" }, 
    });

    return pagamentos;
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

    if (status === "pago") {
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
