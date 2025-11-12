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
    idTomador: string;
    prazo: number;
    montante: number;
    juros: number;
    dataFim?: string;
  }): Promise<Emprestimo> {
    const { idTomador, montante, juros } = data;

    const tomador = await this.usuarioRepo.findOne({
      where: { id: idTomador },
    });
    if (!tomador) {
      throw new Error("Tomador não encontrado");
    }

    if (tomador.role == "investidor")
      throw new Error(
        "Usuário não possui credenciais para solicitar empréstimo"
      );

    const emprestimoExistente = await this.emprestimoRepo.findOne({
      where: {
        tomador: { id: tomador.id },
        status: "aprovado",
      },
    });

    if (emprestimoExistente) {
      throw new Error("Você já possui um empréstimo em aberto");
    }

    if (!montante || montante <= 0) {
      throw new Error("Montante deve ser maior que zero");
    }

    if (!juros || juros < 0) {
      throw new Error("Juros deve ser um valor não negativo");
    }

    const emprestimo = this.emprestimoRepo.create({
      prazo: data.prazo,
      montante: data.montante,
      juros: data.juros,
      dataFim: data.dataFim ? new Date(data.dataFim) : undefined,
      tomador: tomador,
    });

    return this.emprestimoRepo.save(emprestimo);
  }

  async getEmprestimos(): Promise<Emprestimo[]> {
    return this.emprestimoRepo.find();
  }

  async getEmprestimoById(id: string): Promise<Emprestimo | null> {
    return this.emprestimoRepo.findOne({ where: { id } });
  }

  async updateEmprestimo(
    id: string,
    updates: Partial<Emprestimo>
  ): Promise<Emprestimo> {
    const emprestimo = await this.getEmprestimoById(id);
    if (!emprestimo) throw new Error("Empréstimo não encontrado");

    Object.assign(emprestimo, updates);
    return this.emprestimoRepo.save(emprestimo);
  }

  async deleteEmprestimo(id: string): Promise<void> {
    const emprestimo = await this.getEmprestimoById(id);
    if (!emprestimo) throw new Error("Empréstimo não encontrado");
    await this.emprestimoRepo.remove(emprestimo);
  }
}
