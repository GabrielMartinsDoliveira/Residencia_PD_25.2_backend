import { AppDataSource } from "../data-source.js";
import { Investimento } from "../models/Investimento.js";
import { Usuario } from "../models/Usuario.js";
import { Repository } from "typeorm";

export class InvestimentoService {
  private investimentoRepo: Repository<Investimento>;
  private usuarioRepo: Repository<Usuario>;

  constructor() {
    this.investimentoRepo = AppDataSource.getRepository(Investimento);
    this.usuarioRepo = AppDataSource.getRepository(Usuario);
  }

  async createInvestimento(data: Partial<Investimento>): Promise<Investimento> {
    const { idAdministrador } = data;

    const administrador = await this.usuarioRepo.findOne({
      where: { id: idAdministrador},
    });

    if (!administrador) {
      throw new Error("Administrador não encontrado");
    }

    if(administrador.role !== "admin"){
      throw new Error("O usuário não possui credenciais para criar um investimento")
    }

    const investimento = this.investimentoRepo.create({
      ...data,
      idAdministrador: administrador.id,
    });

    return this.investimentoRepo.save(investimento);
  }

  async getInvestimentos(): Promise<Investimento[]> {
    return this.investimentoRepo.find();
  }

  async getInvestimentoById(id: string): Promise<Investimento | null> {
    return this.investimentoRepo.findOne({ where: { id } });
  }

  async updateStatusInvestimento(id: string, status: string): Promise<Investimento> {
    const investimento = await this.getInvestimentoById(id);
    if (!investimento) throw new Error("Investimento não encontrado");
    
    investimento.status = status as any;
    return this.investimentoRepo.save(investimento);
  }

  async deleteInvestimento(id: string): Promise<void> {
    const investimento = await this.getInvestimentoById(id);
    if (!investimento) throw new Error("Investimento não encontrado");
    await this.investimentoRepo.remove(investimento);
  }
}