import { EmprestimoService } from "../services/emprestimoService.js";
const service = new EmprestimoService();
export const createEmprestimo = async (req, res) => {
    try {
        const emprestimo = await service.createEmprestimo(req.body);
        res.status(201).json(emprestimo);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getEmprestimos = async (_req, res) => {
    try {
        const emprestimos = await service.getEmprestimos();
        res.status(200).json(emprestimos);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getEmprestimoById = async (req, res) => {
    try {
        const emprestimo = await service.getEmprestimoById(req.params.id);
        if (!emprestimo) {
            return res.status(404).json({ message: "Empréstimo não encontrado" });
        }
        res.status(200).json(emprestimo);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const updateEmprestimo = async (req, res) => {
    try {
        const emprestimo = await service.updateEmprestimo(req.params.id, req.body);
        res.status(200).json(emprestimo);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteEmprestimo = async (req, res) => {
    try {
        await service.deleteEmprestimo(req.params.id);
        res.status(200).json({ message: "Empréstimo excluído com sucesso" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
