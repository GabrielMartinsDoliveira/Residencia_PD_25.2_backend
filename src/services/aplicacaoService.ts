import { AppDataSource } from "../data-source.js";
import { Investimento } from "../models/Investimento.js";
import { Usuario } from "../models/Usuario.js";
import { Aplicacao } from "../models/Aplicacao.js";

export class AplicacaoService {
  async aplicar(usuarioId: string, investimentoId: string, valor: number) {
    // Mudar para receber number diretamente
    if (valor <= 0) throw new Error("Valor inválido");

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1 — Buscar investimento com lock
      const investimento = await queryRunner.manager.findOne(Investimento, {
        where: { id: investimentoId },
        lock: { mode: "pessimistic_write" },
      });

      if (!investimento) throw new Error("Investimento não encontrado");
      if (investimento.status !== "em andamento")
        throw new Error("Investimento não está disponível");

      // 2 — Buscar soma SEM LOCK (correção principal)
      const { total } = await queryRunner.manager
        .createQueryBuilder(Aplicacao, "a")
        .select("COALESCE(SUM(a.valor), 0)", "total")
        .where("a.investimentoId = :invId", { invId: investimentoId })
        .getRawOne(); // ← REMOVER setLock

      const somaAtual = parseFloat(total || "0");
      const limite = parseFloat(String(investimento.valor));

      if (somaAtual + valor > limite) {
        throw new Error("Valor excede o limite disponível do investimento");
      }

      // 3 — Buscar usuário com lock
      const usuario = await queryRunner.manager.findOne(Usuario, {
        where: { id: usuarioId },
        lock: { mode: "pessimistic_write" },
      });

      if (!usuario) throw new Error("Usuário não encontrado");

      const saldo = parseFloat(String(usuario.saldo || 0));
      if (saldo < valor) throw new Error("Saldo insuficiente");

      // 4 — Debitar saldo
      usuario.saldo = saldo - valor;
      await queryRunner.manager.save(usuario);

      // 5 — Criar aplicação
      const aplicacao = queryRunner.manager.create(Aplicacao, {
        usuario,
        investimento,
        valor,
      });
      await queryRunner.manager.save(aplicacao);

      // 6 — Atualizar total investido
      investimento.totalInvestido = somaAtual + valor;
      await queryRunner.manager.save(investimento);

      // 7 — Adicionar investidor
      await queryRunner.manager
        .createQueryBuilder()
        .relation(Investimento, "investidores")
        .of(investimento)
        .add(usuario.id);

      await queryRunner.commitTransaction();
      return aplicacao;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * LISTAGENS (não usam lock, não há problema)
   */

  async getAplicacoesPorInvestimento(investimentoId: string) {
    return await AppDataSource.getRepository(Aplicacao).find({
      where: { investimento: { id: investimentoId } },
      relations: ["usuario", "investimento"],
      order: { dataCriacao: "DESC" },
    });
  }

  async getAplicacoesPorUsuario(usuarioId: string) {
    return await AppDataSource.getRepository(Aplicacao).find({
      where: { usuario: { id: usuarioId } },
      relations: ["usuario", "investimento"],
      order: { dataCriacao: "DESC" },
    });
  }

  async getAplicacaoById(id: string) {
    return await AppDataSource.getRepository(Aplicacao).findOne({
      where: { id },
      relations: ["usuario", "investimento"],
    });
  }

  async getAllAplicacoes(): Promise<Aplicacao[]> {
    return await AppDataSource.getRepository(Aplicacao).find({
      relations: ["usuario", "investimento"],
      order: { dataCriacao: "DESC" },
    });
  }
}
