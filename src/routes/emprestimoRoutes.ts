import { Router } from "express";
import {
  createEmprestimo,
  getEmprestimos,
  getEmprestimoById,
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
 *     PagamentoResumo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         valor:
 *           type: number
 *           format: double
 *         dataPagamento:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: ["pendente", "pago", "atrasado"]
 *     Emprestimo:
 *       type: object
 *       required:
 *         - tomador
 *         - prazo
 *         - montante
 *         - juros
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "e5bdf3c2-1234-4cde-89ab-7f21c4b5d678"
 *         tomador:
 *           $ref: '#/components/schemas/UsuarioResumo'
 *         pagamentos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PagamentoResumo'
 *         status:
 *           type: string
 *           enum: ["em analise", "aprovado", "negado", "quitado", "cancelado"]
 *           default: "em analise"
 *           example: "em analise"
 *         prazo:
 *           type: integer
 *           description: Prazo do empréstimo em dias
 *           example: 360
 *         montante:
 *           type: number
 *           format: double
 *           precision: 10
 *           scale: 2
 *           description: Valor total do empréstimo
 *           example: 5000.00
 *         juros:
 *           type: number
 *           format: double
 *           precision: 5
 *           scale: 2
 *           description: Taxa de juros mensal em porcentagem
 *           example: 2.5
 *         saldoDevedor:
 *           type: number
 *           format: double
 *           precision: 10
 *           scale: 2
 *           description: Saldo devedor atual
 *           example: 4500.00
 *         dataInicio:
 *           type: string
 *           format: date-time
 *           example: "2025-01-10T00:00:00.000Z"
 *         dataFim:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-12-10T00:00:00.000Z"
 *         codigoTransacao:
 *           type: integer
 *           nullable: true
 *           description: Código único da transação
 *           example: 123456
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
 *           description: Prazo do empréstimo em dias
 *           example: 360
 *         montante:
 *           type: number
 *           format: double
 *           example: 10000.00
 *         juros:
 *           type: number
 *           format: double
 *           example: 3.5
 *         dataFim:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2026-02-01T00:00:00.000Z"
 *     EmprestimoUpdate:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: ["em analise", "aprovado", "negado", "quitado", "cancelado"]
 *           example: "aprovado"
 *         prazo:
 *           type: integer
 *           example: 180
 *         montante:
 *           type: number
 *           format: double
 *           example: 12000.00
 *         juros:
 *           type: number
 *           format: double
 *           example: 2.8
 *         saldoDevedor:
 *           type: number
 *           format: double
 *           example: 8000.00
 *         dataFim:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T00:00:00.000Z"
 *         codigoTransacao:
 *           type: integer
 *           example: 654321
 */

/**
 * @swagger
 * /emprestimos:
 *   post:
 *     summary: Cria um novo empréstimo
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tomador não encontrado"
 *       403:
 *         description: Usuário não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Apenas usuários com role 'tomador' podem criar empréstimos"
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
 *         description: Lista de empréstimos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Emprestimo'
 *       400:
 *         description: Erro ao listar empréstimos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar empréstimos"
 */
router.get("/", getEmprestimos);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empréstimo não encontrado"
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ID inválido"
 */
router.get("/:id", getEmprestimoById);

/**
 * @swagger
 * /emprestimos/{id}:
 *   put:
 *     summary: Atualiza as informações de um empréstimo
 *     tags: [Empréstimos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do empréstimo a ser atualizado (UUID)
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Não é possível alterar empréstimo com status finalizado"
 *       404:
 *         description: Empréstimo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Empréstimo não encontrado"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Não é possível excluir empréstimo com pagamentos vinculados"
 *       404:
 *         description: Empréstimo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Empréstimo não encontrado"
 */
router.delete("/:id", deleteEmprestimo);

export default router;