import { AppDataSource } from "../data-source.js";
import { Investimento } from "../models/Investimento.js";
import { Usuario } from "../models/Usuario.js";
import { Aplicacao } from "../models/Aplicacao.js";

export class AplicacaoService {
  async aplicar(usuarioId: string, investimentoId: string, valorStr: string) {
    const valor = parseFloat(valorStr);
    if (valor <= 0) throw new Error("Valor inválido");

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const investimento = await queryRunner.manager.findOne(Investimento, {
        where: { id: investimentoId },
        lock: { mode: "pessimistic_write" },
        relations: ["investidores"],
      });

      if (!investimento) throw new Error("Investimento não encontrado");
      if (investimento.status !== "em andamento")
        throw new Error("Investimento não está disponível");

      const { total } = await queryRunner.manager
        .createQueryBuilder(Aplicacao, "a")
        .select("COALESCE(SUM(a.valor), 0)", "total")
        .where("a.investimentoId = :invId", { invId: investimentoId })
        .getRawOne();

      const somaAtual = parseFloat(total || "0");

      const limite = parseFloat(String(investimento.valor));
      if (somaAtual + valor > limite) {
        throw new Error("Valor excede o limite disponível do investimento");
      }

      const usuario = await queryRunner.manager.findOne(Usuario, {
        where: { id: usuarioId },
        lock: { mode: "pessimistic_write" },
      });
      if (!usuario) throw new Error("Usuário não encontrado");

      const saldo = parseFloat(String(usuario.saldo || 0));
      if (saldo < valor) throw new Error("Saldo insuficiente");

      usuario.saldo = saldo - valor;
      await queryRunner.manager.save(usuario);

      const aplicacao = queryRunner.manager.create(Aplicacao, {
        usuario,
        investimento,
        valor,
      });
      await queryRunner.manager.save(aplicacao);

      if (investimento.totalInvestido !== undefined) {
        investimento.totalInvestido = somaAtual + valor;
        await queryRunner.manager.save(investimento);
      }

      if (!investimento.investidores?.find((inv) => inv.id === usuario.id)) {
        investimento.investidores.push(usuario);
        await queryRunner.manager.save(investimento);
      }

      await queryRunner.commitTransaction();
      return aplicacao;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getAplicacoesPorInvestimento(investimentoId: string) {
    const repo = AppDataSource.getRepository(Aplicacao);

    return await repo.find({
      where: { investimento: { id: investimentoId } },
      relations: ["usuario", "investimento"],
      order: { dataCriacao: "DESC" },
    });
  }

  async getAplicacoesPorUsuario(usuarioId: string) {
    const repo = AppDataSource.getRepository(Aplicacao);

    return await repo.find({
      where: { usuario: { id: usuarioId } },
      relations: ["usuario", "investimento"],
      order: { dataCriacao: "DESC" },
    });
  }

  async getAplicacaoById(id: string) {
    const repo = AppDataSource.getRepository(Aplicacao);

    return await repo.findOne({
      where: { id },
      relations: ["usuario", "investimento"],
    });
  }

  async getAllAplicacoes(): Promise<Aplicacao[]> {
    const repo = AppDataSource.getRepository(Aplicacao);

    return await repo.find({
      relations: ["usuario", "investimento"],
      order: { dataCriacao: "DESC" },
    });
  }
}