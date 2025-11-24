import { Router } from "express";
import {
  createEmprestimo,
  getEmprestimos,
  getEmprestimoById,
  getEmprestimosPorTomador,
  updateEmprestimo,
  deleteEmprestimo,
} from "../controller/emprestimoController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Empréstimos
 *   description: Endpoints para gerenciamento de empréstimos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioResumo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: ["admin", "tomador", "investidor"]
 *     Pagamento:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         valor:
 *           type: number
 *         dataVencimento:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: ["pendente", "pago", "atrasado"]
 *     Emprestimo:
 *       type: object
 *       required:
 *         - tomadorId
 *         - prazo
 *         - montante
 *         - juros
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "f1e7a2b4-913a-4f89-92bb-65b47c8912fa"
 *         tomador:
 *           $ref: '#/components/schemas/UsuarioResumo'
 *         prazo:
 *           type: integer
 *           description: Prazo do empréstimo em meses
 *           example: 12
 *         montante:
 *           type: number
 *           format: double
 *           precision: 10
 *           scale: 2
 *           example: 10000.00
 *         saldoDevedor:
 *           type: number
 *           format: double
 *           precision: 10
 *           scale: 2
 *           example: 8500.00
 *         juros:
 *           type: number
 *           format: double
 *           precision: 5
 *           scale: 2
 *           example: 12.5
 *         dataInicio:
 *           type: string
 *           format: date-time
 *           example: "2025-01-15T00:00:00.000Z"
 *         dataFim:
 *           type: string
 *           format: date-time
 *           example: "2025-07-15T00:00:00.000Z"
 *         status:
 *           type: string
 *           enum: ["em analise", "aprovado", "negado", "quitado"]
 *           default: "em analise"
 *           example: "em analise"
 *         pagamentos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Pagamento'
 *     EmprestimoCreate:
 *       type: object
 *       required:
 *         - tomadorId
 *         - prazo
 *         - montante
 *         - juros
 *       properties:
 *         tomadorId:
 *           type: string
 *           format: uuid
 *           description: ID do tomador do empréstimo
 *           example: "c5f2d4b6-2f8a-4e1c-9f85-12ad1f5e59a0"
 *         prazo:
 *           type: integer
 *           description: Prazo do empréstimo em meses
 *           example: 12
 *         montante:
 *           type: number
 *           format: double
 *           example: 5000.00
 *         juros:
 *           type: number
 *           format: double
 *           example: 10.25
 *         dataFim:
 *           type: string
 *           format: date-time
 *           example: "2026-01-15T00:00:00.000Z"
 *     EmprestimoUpdate:
 *       type: object
 *       properties:
 *         prazo:
 *           type: integer
 *           example: 400
 *         montante:
 *           type: number
 *           example: 6000.00
 *         juros:
 *           type: number
 *           example: 11.5
 *         dataFim:
 *           type: string
 *           format: date-time
 *           example: "2026-02-15T00:00:00.000Z"
 *         status:
 *           type: string
 *           enum: ["em analise", "aprovado", "negado", "quitado"]
 *           example: "aprovado"
 */

/**
 * @swagger
 * /emprestimos:
 *   post:
 *     summary: Cria um novo empréstimo (apenas tomadores)
 *     tags: [Empréstimos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmprestimoCreate'
 *     responses:
 *       201:
 *         description: Empréstimo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       400:
 *         description: Erro ao criar empréstimo
 *       403:
 *         description: Usuário não autorizado
 *       422:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno no servidor
 */
router.post("/", createEmprestimo);

/**
 * @swagger
 * /emprestimos:
 *   get:
 *     summary: Lista todos os empréstimos
 *     tags: [Empréstimos]
 *     responses:
 *       200:
 *         description: Lista de empréstimos cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Emprestimo'
 *       500:
 *         description: Erro interno no servidor
 */
router.get("/", getEmprestimos);

/**
 * @swagger
 * /emprestimos/tomador/{tomadorId}:
 *   get:
 *     summary: Busca empréstimos por tomador
 *     tags: [Empréstimos]
 *     parameters:
 *       - name: tomadorId
 *         in: path
 *         required: true
 *         description: ID do tomador (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de empréstimos do tomador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Emprestimo'
 *       404:
 *         description: Tomador não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.get("/tomador/:tomadorId", getEmprestimosPorTomador);

/**
 * @swagger
 * /emprestimos/{id}:
 *   get:
 *     summary: Busca um empréstimo pelo ID
 *     tags: [Empréstimos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do empréstimo (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Empréstimo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       404:
 *         description: Empréstimo não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.get("/:id", getEmprestimoById);

/**
 * @swagger
 * /emprestimos/{id}:
 *   put:
 *     summary: Atualiza um empréstimo
 *     tags: [Empréstimos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do empréstimo (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmprestimoUpdate'
 *     responses:
 *       200:
 *         description: Empréstimo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       400:
 *         description: Erro ao atualizar empréstimo
 *       404:
 *         description: Empréstimo não encontrado
 *       422:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno no servidor
 */
router.put("/:id", updateEmprestimo);

/**
 * @swagger
 * /emprestimos/{id}:
 *   delete:
 *     summary: Exclui um empréstimo pelo ID
 *     tags: [Empréstimos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do empréstimo (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Empréstimo excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empréstimo excluído com sucesso"
 *       400:
 *         description: Erro ao excluir empréstimo
 *       404:
 *         description: Empréstimo não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.delete("/:id", deleteEmprestimo);

export default router;