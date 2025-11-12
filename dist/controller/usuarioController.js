import { UsuarioService } from "../services/usuarioService.js";
export const UsuarioController = {
    async criar(req, res) {
        try {
            const usuario = await UsuarioService.criarUsuario(req.body);
            res.status(201).json(usuario);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    async listar(req, res) {
        try {
            const usuarios = await UsuarioService.listarUsuarios();
            res.status(200).json(usuarios);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await UsuarioService.buscarPorId(id);
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    async atualizarSenha(req, res) {
        try {
            const { id } = req.params;
            const { senha } = req.body;
            const usuarioAtualizado = await UsuarioService.atualizarSenha(id, senha);
            res.status(200).json(usuarioAtualizado);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    async atualizarSaldo(req, res) {
        try {
            const { id } = req.params;
            const { saldo } = req.body;
            const usuarioAtualizado = await UsuarioService.atualizarSaldo(id, saldo);
            res.status(200).json(usuarioAtualizado);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    async deletar(req, res) {
        try {
            const { id } = req.params;
            await UsuarioService.deletarUsuario(id);
            res.status(200).json({ message: "Usuário excluído" });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};
