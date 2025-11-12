import { Router } from "express";
import { createInvestimento, getInvestimentos, getInvestimentoById, updateStatusInvestimento, deleteInvestimentoById, } from "../controller/investimentoController.js";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Investimentos
 *   description: Endpoints para gerenciamento de investimentos
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Investimento:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "f1e7a2b4-913a-4f89-92bb-65b47c8912fa"
 *         idAdministrador:
 *           type: string
 *           description: ID do administrador responsável pelo investimento
 *           example: "c5f2d4b6-2f8a-4e1c-9f85-12ad1f5e59a0"
 *         status:
 *           type: string
 *           enum: [ "em andamento", "finalizado", "cancelado" ]
 *           example: "em andamento"
 *         prazo:
 *           type: integer
 *           description: Prazo do investimento em dias
 *           example: 180
 *         valor:
 *           type: number
 *           format: decimal
 *           example: 10000.00
 *         juros:
 *           type: number
 *           format: decimal
 *           example: 8.5
 *         dataInicio:
 *           type: string
 *           format: date-time
 *           example: "2025-01-15T00:00:00.000Z"
 *         dataFim:
 *           type: string
 *           format: date-time
 *           example: "2025-07-15T00:00:00.000Z"
 */
/**
 * @swagger
 * /investimentos:
 *   post:
 *     summary: Cria um novo investimento (apenas administradores)
 *     tags: [Investimentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idAdministrador
 *               - prazo
 *               - valor
 *               - juros
 *               - dataFim
 *             properties:
 *               idAdministrador:
 *                 type: string
 *                 example: "c5f2d4b6-2f8a-4e1c-9f85-12ad1f5e59a0"
 *               prazo:
 *                 type: integer
 *                 example: 365
 *               valor:
 *                 type: number
 *                 format: decimal
 *                 example: 5000.00
 *               juros:
 *                 type: number
 *                 format: decimal
 *                 example: 7.25
 *               dataFim:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-01-15T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Investimento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Investimento'
 *       400:
 *         description: Erro ao criar investimento (usuário não autorizado ou dados inválidos)
 */
router.post("/", createInvestimento);
/**
 * @swagger
 * /investimentos:
 *   get:
 *     summary: Lista todos os investimentos
 *     tags: [Investimentos]
 *     responses:
 *       200:
 *         description: Lista de investimentos cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Investimento'
 *       400:
 *         description: Erro ao listar investimentos
 */
router.get("/", getInvestimentos);
/**
 * @swagger
 * /investimentos/{id}:
 *   get:
 *     summary: Busca um investimento pelo ID
 *     tags: [Investimentos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do investimento
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Investimento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Investimento'
 *       404:
 *         description: Investimento não encontrado
 *       400:
 *         description: Erro na requisição
 */
router.get("/:id", getInvestimentoById);
/**
 * @swagger
 * /investimentos/{id}/status:
 *   put:
 *     summary: Atualiza o status de um investimento
 *     tags: [Investimentos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do investimento
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ "em andamento", "finalizado", "cancelado" ]
 *                 example: "finalizado"
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Investimento'
 *       400:
 *         description: Erro ao atualizar status
 */
router.put("/:id/status", updateStatusInvestimento);
/**
 * @swagger
 * /investimentos/{id}:
 *   delete:
 *     summary: Exclui um investimento pelo ID
 *     tags: [Investimentos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do investimento
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Investimento excluído com sucesso
 *       400:
 *         description: Erro ao excluir investimento
 */
router.delete("/:id", deleteInvestimentoById);
export default router;
