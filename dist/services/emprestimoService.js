import { AppDataSource } from "../data-source.js";
import { Emprestimo } from "../models/Emprestimo.js";
import { Usuario } from "../models/Usuario.js";
export class EmprestimoService {
    constructor() {
        this.emprestimoRepo = AppDataSource.getRepository(Emprestimo);
        this.usuarioRepo = AppDataSource.getRepository(Usuario);
    }
    async createEmprestimo(data) {
        const { idTomador, montante, juros } = data;
        const tomador = await this.usuarioRepo.findOne({
            where: { id: idTomador },
        });
        if (!tomador) {
            throw new Error("Tomador não encontrado");
        }
        if (tomador.role == "investidor")
            throw new Error("Usuário não possui credenciais para solicitar empréstimo");
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
    async getEmprestimos() {
        return this.emprestimoRepo.find();
    }
    async getEmprestimoById(id) {
        return this.emprestimoRepo.findOne({ where: { id } });
    }
    async updateEmprestimo(id, updates) {
        const emprestimo = await this.getEmprestimoById(id);
        if (!emprestimo)
            throw new Error("Empréstimo não encontrado");
        Object.assign(emprestimo, updates);
        return this.emprestimoRepo.save(emprestimo);
    }
    async deleteEmprestimo(id) {
        const emprestimo = await this.getEmprestimoById(id);
        if (!emprestimo)
            throw new Error("Empréstimo não encontrado");
        await this.emprestimoRepo.remove(emprestimo);
    }
}
