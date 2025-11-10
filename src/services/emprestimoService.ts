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

  async createEmprestimo(data: Partial<Emprestimo>): Promise<Emprestimo> {
    const { idTomador } = data;

    // verifica se o tomador existe
    const tomador = await this.usuarioRepo.findOne({ where: { id: idTomador as any } });
    if (!tomador) {
      throw new Error("Tomador não encontrado");
    }

    // verifica se já há empréstimo em aberto
    const emprestimoExistente = await this.emprestimoRepo.findOne({
      where: {
        idTomador: tomador,
        status: "em andamento",
      },
    });

    if (emprestimoExistente) {
      throw new Error("Você já possui um empréstimo em aberto");
    }

    const emprestimo = this.emprestimoRepo.create({
      ...data,
      idTomador: tomador,
    });

    return this.emprestimoRepo.save(emprestimo);
  }

  async getEmprestimos(): Promise<Emprestimo[]> {
    return this.emprestimoRepo.find();
  }

  async getEmprestimoById(id: string): Promise<Emprestimo | null> {
    return this.emprestimoRepo.findOne({ where: { id } });
  }

  async updateEmprestimo(id: string, updates: Partial<Emprestimo>): Promise<Emprestimo> {
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