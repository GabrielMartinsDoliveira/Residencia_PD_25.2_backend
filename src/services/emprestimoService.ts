import { AppDataSource } from "../data-source.js";
import { Emprestimo } from "../models/Emprestimo.js";
import { Usuario } from "../models/Usuario.js";
import { Repository } from "typeorm";

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
    dataFim?: string;
    codigoTransacao: number;
  }): Promise<Emprestimo> {
    const { tomadorId, montante, juros, codigoTransacao } = data;

    const codigoExistente = await this.emprestimoRepo.findOne({
      where: { codigoTransacao },
    });

    if (codigoExistente) {
      throw new Error("Código de transação já está em uso");
    }

    const tomador = await this.usuarioRepo.findOne({
      where: { id: tomadorId },
    });

    if (!tomador) {
      throw new Error("Tomador não encontrado");
    }

    if (tomador.role !== "tomador") {
      throw new Error(
        "Usuário não possui credenciais para solicitar empréstimo"
      );
    }

    const emprestimoExistente = await this.emprestimoRepo.findOne({
      where: {
        tomador: { id: tomador.id },
        status: "em analise",
      },
    });

    if (emprestimoExistente) {
      throw new Error("Você já possui um empréstimo em análise");
    }

    if (!montante || montante <= 0) {
      throw new Error("Montante deve ser maior que zero");
    }

    if (!juros || juros < 0) {
      throw new Error("Juros deve ser um valor não negativo");
    }

    if (!codigoTransacao) {
      throw new Error("Código de transação é obrigatório");
    }

    const emprestimo = this.emprestimoRepo.create({
      prazo: data.prazo,
      montante: data.montante,
      juros: data.juros,
      saldoDevedor: data.montante,
      codigoTransacao: data.codigoTransacao,
      dataFim: data.dataFim ? new Date(data.dataFim) : undefined,
      tomador: tomador,
      status: "em analise",
    });

    return this.emprestimoRepo.save(emprestimo);
  }

  async getEmprestimos(): Promise<Emprestimo[]> {
    return this.emprestimoRepo.find({
      relations: ["tomador"],
    });
  }

  async getEmprestimoById(id: string): Promise<Emprestimo | null> {
    return this.emprestimoRepo.findOne({
      where: { id },
      relations: ["tomador"],
    });
  }

  async getEmprestimosPorTomador(tomadorId: string): Promise<Emprestimo[]> {
    return this.emprestimoRepo.find({
      where: { tomador: { id: tomadorId } },
      relations: ["tomador"],
      order: { dataInicio: "DESC" },
    });
  }

  async updateEmprestimo(
    id: string,
    updates: Partial<Emprestimo>
  ): Promise<Emprestimo> {
    const emprestimo = await this.getEmprestimoById(id);
    if (!emprestimo) throw new Error("Empréstimo não encontrado");

    if (
      updates.codigoTransacao &&
      updates.codigoTransacao !== emprestimo.codigoTransacao
    ) {
      const codigoExistente = await this.emprestimoRepo.findOne({
        where: { codigoTransacao: updates.codigoTransacao },
      });

      if (codigoExistente) {
        throw new Error("Código de transação já está em uso");
      }
    }

    Object.assign(emprestimo, updates);
    return this.emprestimoRepo.save(emprestimo);
  }

  async deleteEmprestimo(id: string): Promise<void> {
    const emprestimo = await this.getEmprestimoById(id);
    if (!emprestimo) throw new Error("Empréstimo não encontrado");
    await this.emprestimoRepo.remove(emprestimo);
  }
}
