import { AppDataSource } from "../data-source.js";
import { Usuario } from "../models/Usuario.js";
const usuarioRepository = AppDataSource.getRepository(Usuario);
export const UsuarioService = {
    async criarUsuario(dados) {
        const { email, matricula } = dados;
        const usuarioExistente = await usuarioRepository.findOne({
            where: [{ email }, { matricula }],
        });
        if (usuarioExistente) {
            throw new Error("Credenciais já foram cadastradas!");
        }
        const novoUsuario = usuarioRepository.create(dados);
        return await usuarioRepository.save(novoUsuario);
    },
    async listarUsuarios() {
        return await usuarioRepository.find();
    },
    async buscarPorId(id) {
        return await usuarioRepository.findOneBy({ id });
    },
    async atualizarSenha(id, senha) {
        const usuario = await usuarioRepository.findOneBy({ id });
        if (!usuario)
            throw new Error("Usuário não encontrado");
        usuario.senha = senha;
        return await usuarioRepository.save(usuario);
    },
    async atualizarSaldo(id, saldo) {
        const usuario = await usuarioRepository.findOneBy({ id });
        if (!usuario)
            throw new Error("Usuário não encontrado");
        usuario.saldo = saldo;
        return await usuarioRepository.save(usuario);
    },
    async deletarUsuario(id) {
        const usuario = await usuarioRepository.findOneBy({ id });
        if (!usuario)
            throw new Error("Usuário não encontrado");
        await usuarioRepository.remove(usuario);
    },
};
