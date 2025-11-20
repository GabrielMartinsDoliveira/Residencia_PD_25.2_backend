import { AppDataSource } from "../data-source.js";
import { Usuario } from "../models/Usuario.js";

const usuarioRepository = AppDataSource.getRepository(Usuario);

export const UsuarioService = {
  async criarUsuario(dados: Partial<Usuario>): Promise<Usuario> {
    const { email, matricula } = dados;

    const usuarioExistente = await usuarioRepository.findOne({
      where: [{ email }, { matricula }],
    });

    if (usuarioExistente) {
      throw new Error("Credenciais já foram cadastradas!");
    }

    if (
      dados.role !== "admin" &&
      (!dados.agenciaBancaria || !dados.contaBancaria)
    ) {
      throw new Error("Os dados bancários são obrigatórios");
    }

    const novoUsuario = usuarioRepository.create(dados);
    return await usuarioRepository.save(novoUsuario);
  },

  async listarUsuarios(): Promise<Usuario[]> {
    return await usuarioRepository.find();
  },

  async buscarPorId(id: string): Promise<Usuario | null> {
    return await usuarioRepository.findOneBy({ id });
  },

  async atualizarSenha(id: string, senha: string): Promise<Usuario> {
    const usuario = await usuarioRepository.findOneBy({ id });
    if (!usuario) throw new Error("Usuário não encontrado");

    usuario.senha = senha;
    return await usuarioRepository.save(usuario);
  },

  async atualizarSaldo(id: string, saldo: number): Promise<Usuario> {
    const usuario = await usuarioRepository.findOneBy({ id });
    if (!usuario) throw new Error("Usuário não encontrado");

    usuario.saldo = saldo;
    return await usuarioRepository.save(usuario);
  },

  async deletarUsuario(id: string): Promise<void> {
    const usuario = await usuarioRepository.findOneBy({ id });
    if (!usuario) throw new Error("Usuário não encontrado");

    await usuarioRepository.remove(usuario);
  },
};
