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
 *     Emprestimo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "e5bdf3c2-1234-4cde-89ab-7f21c4b5d678"
 *         valor:
 *           type: number
 *           example: 5000.00
 *         taxaJuros:
 *           type: number
 *           example: 2.5
 *         dataInicio:
 *           type: string
 *           format: date
 *           example: "2025-01-10"
 *         dataFim:
 *           type: string
 *           format: date
 *           example: "2025-12-10"
 *         status:
 *           type: string
 *           enum: [ "em analise", "aprovado", "negado", "quitado", "cancelado" ]
 *           default: "em analise"
 *           example: "cancelado"
 *         usuarioId:
 *           type: string
 *           description: ID do usuário que contratou o empréstimo
 *           example: "c5f2d4b6-2f8a-4e1c-9f85-12ad1f5e59a0"
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
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *                 example: 10000
 *               taxaJuros:
 *                 type: number
 *                 example: 3.5
 *               dataInicio:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-01"
 *               dataFim:
 *                 type: string
 *                 format: date
 *                 example: "2026-02-01"
 *               usuarioId:
 *                 type: string
 *                 example: "c5f2d4b6-2f8a-4e1c-9f85-12ad1f5e59a0"
 *     responses:
 *       201:
 *         description: Empréstimo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       400:
 *         description: Erro ao criar empréstimo
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
 *         description: ID do empréstimo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empréstimo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       404:
 *         description: Empréstimo não encontrado
 *       400:
 *         description: Erro na requisição
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
 *         description: ID do empréstimo a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *                 example: 12000
 *               taxaJuros:
 *                 type: number
 *                 example: 2.8
 *               dataFim:
 *                 type: string
 *                 format: date
 *                 example: "2026-05-01"
 *               status:
 *                 type: string
 *                 example: "finalizado"
 *     responses:
 *       200:
 *         description: Empréstimo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       400:
 *         description: Erro ao atualizar empréstimo
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
 *         description: ID do empréstimo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empréstimo excluído com sucesso
 *       400:
 *         description: Erro ao excluir empréstimo
 */
router.delete("/:id", deleteEmprestimo);

export default router;
