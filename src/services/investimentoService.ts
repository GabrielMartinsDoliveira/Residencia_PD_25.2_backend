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

  private mapInvestimento(i: Investimento) {
    return {
      id: i.id,
      status: i.status,
      prazo: i.prazo,
      valor: i.valor,
      totalInvestido: i.totalInvestido,
      juros: i.juros,
      dataInicio: i.dataInicio,
      dataFim: i.dataFim,
      administrador: {
        id: i.administrador.id,
        nome: i.administrador.nome,
      },
      investidores:
        i.investidores?.map((inv) => ({
          id: inv.id,
          nome: inv.nome,
        })) || [],
    };
  }

  async createInvestimento(data: Partial<Investimento>) {
    const { administrador } = data;

    const admin = await this.usuarioRepo.findOne({
      where: { id: administrador?.id },
    });

    if (!admin) {
      throw new Error("Administrador não encontrado");
    }

    if (admin.role !== "admin") {
      throw new Error(
        "O usuário não possui credenciais para criar um investimento"
      );
    }

    const investimento = this.investimentoRepo.create({
      ...data,
      administrador: admin,
    });

    const saved = await this.investimentoRepo.save(investimento);

    return this.mapInvestimento(saved);
  }

  async getInvestimentos() {
    const items = await this.investimentoRepo.find();
    return items.map(this.mapInvestimento);
  }

  async getInvestimentoById(id: string) {
    const item = await this.investimentoRepo.findOne({ where: { id } });
    return item ? this.mapInvestimento(item) : null;
  }

  async updateStatusInvestimento(id: string, status: string) {
    const investimento = await this.investimentoRepo.findOne({ where: { id } });

    if (!investimento) {
      throw new Error("Investimento não encontrado");
    }

    investimento.status = status as any;

    const updated = await this.investimentoRepo.save(investimento);

    return this.mapInvestimento(updated);
  }

  async deleteInvestimento(id: string): Promise<void> {
    const investimento = await this.investimentoRepo.findOne({ where: { id } });

    if (!investimento) {
      throw new Error("Investimento não encontrado");
    }

    await this.investimentoRepo.remove(investimento);
  }
}
