import { AppDataSource } from "../data-source.js";
import { Emprestimo } from "../models/Emprestimo.js";
import { Usuario } from "../models/Usuario.js";
import { Repository } from "typeorm";
import { PagamentoService } from "./pagamentoService.js";

export class EmprestimoService {
  private emprestimoRepo: Repository<Emprestimo>;
  private usuarioRepo: Repository<Usuario>;

  constructor() {
    this.emprestimoRepo = AppDataSource.getRepository(Emprestimo);
    this.usuarioRepo = AppDataSource.getRepository(Usuario);
  }

  async createEmprestimo(data: {
    tomadorId: string;
    prazo: number;
    montante: number;
    juros: number;
    dataFim?: Date;
  }) {
    const { tomadorId, prazo, montante, juros, dataFim } = data;

    const tomador = await this.usuarioRepo.findOne({
      where: { id: tomadorId },
    });

    if (!tomador) {
      throw new Error("Tomador não encontrado.");
    }

    if (tomador.role !== "tomador") {
      throw new Error(
        "Apenas usuários com role 'tomador' podem solicitar empréstimos."
      );
    }

    const emprestimo = this.emprestimoRepo.create({
      tomador,
      prazo,
      montante,
      juros,
      saldoDevedor: montante,
      dataInicio: new Date(),
      dataFim,
      status: "em analise",
    });

    const saved = await this.emprestimoRepo.save(emprestimo);

    const pagamentosGerados =
      await PagamentoService.gerarPagamentosParaEmprestimo(saved);

    return {
      ...saved,
      pagamentos: pagamentosGerados,
    };
  }

  async getEmprestimos() {
    return await this.emprestimoRepo.find({
      relations: ["tomador", "pagamentos"],
      order: { dataInicio: "DESC" },
    });
  }

  async getEmprestimoById(id: string) {
    const emprestimo = await this.emprestimoRepo.findOne({
      where: { id },
      relations: ["tomador", "pagamentos"],
    });

    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado");
    }

    return emprestimo;
  }

  async getEmprestimosPorTomador(tomadorId: string) {
    const emprestimos = await this.emprestimoRepo.find({
      where: {
        tomador: { id: tomadorId },
      },
      relations: ["tomador", "pagamentos"],
    });

    return emprestimos;
  }

  async updateEmprestimo(id: string, data: Partial<Emprestimo>) {
    const emprestimo = await this.emprestimoRepo.findOne({
      where: { id },
      relations: ["pagamentos"],
    });

    if (!emprestimo) throw new Error("Empréstimo não encontrado");

    if (emprestimo.status === "quitado") {
      throw new Error("Não é possível alterar um empréstimo já quitado.");
    }

    if (["aprovado", "negado"].includes(emprestimo.status)) {
      delete data.montante;
      delete data.prazo;
      delete data.juros;
    }

    Object.assign(emprestimo, data);

    return await this.emprestimoRepo.save(emprestimo);
  }

  async deleteEmprestimo(id: string) {
    const emprestimo = await this.emprestimoRepo.findOne({
      where: { id },
      relations: ["pagamentos"],
    });

    if (!emprestimo) throw new Error("Empréstimo não encontrado");

    if (emprestimo.status === "quitado") {
      throw new Error("Não é possível excluir um empréstimo quitado.");
    }

    const temPagamentosPagos = emprestimo.pagamentos.some(
      (p) => p.status === "pago"
    );

    if (temPagamentosPagos) {
      throw new Error(
        "Não é possível excluir um empréstimo com pagamentos já realizados."
      );
    }

    await this.emprestimoRepo.remove(emprestimo);

    return { message: "Empréstimo excluído com sucesso" };
  }
}
