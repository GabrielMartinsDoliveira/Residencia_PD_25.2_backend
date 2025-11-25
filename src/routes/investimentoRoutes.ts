import { Router } from "express";
import {
  createInvestimento,
  getInvestimentos,
  getInvestimentoById,
  updateStatusInvestimento,
  deleteInvestimentoById,
} from "../controller/investimentoController.js";
import { verifyToken } from "../middleware/verifyToken.js";
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
 *     Investimento:
 *       type: object
 *       required:
 *         - administrador
 *         - prazo
 *         - valor
 *         - juros
 *         - dataFim
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "f1e7a2b4-913a-4f89-92bb-65b47c8912fa"
 *         administrador:
 *           $ref: '#/components/schemas/UsuarioResumo'
 *         investidores:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UsuarioResumo'
 *         status:
 *           type: string
 *           enum: ["em andamento", "finalizado", "cancelado"]
 *           default: "em andamento"
 *           example: "em andamento"
 *         prazo:
 *           type: integer
 *           description: Prazo do investimento em dias
 *           example: 180
 *         valor:
 *           type: number
 *           format: double
 *           precision: 10
 *           scale: 2
 *           example: 10000.00
 *         totalInvestido:
 *           type: number
 *           format: double
 *           precision: 12
 *           scale: 2
 *           default: 0
 *           example: 7500.50
 *         juros:
 *           type: number
 *           format: double
 *           precision: 5
 *           scale: 2
 *           example: 8.5
 *         dataInicio:
 *           type: string
 *           format: date-time
 *           example: "2025-01-15T00:00:00.000Z"
 *         dataFim:
 *           type: string
 *           format: date-time
 *           example: "2025-07-15T00:00:00.000Z"
 *     InvestimentoCreate:
 *       type: object
 *       required:
 *         - administradorId
 *         - prazo
 *         - valor
 *         - juros
 *         - dataFim
 *       properties:
 *         administradorId:
 *           type: string
 *           format: uuid
 *           description: ID do administrador responsável pelo investimento
 *           example: "c5f2d4b6-2f8a-4e1c-9f85-12ad1f5e59a0"
 *         prazo:
 *           type: integer
 *           description: Prazo do investimento em dias
 *           example: 365
 *         valor:
 *           type: number
 *           format: double
 *           example: 5000.00
 *         juros:
 *           type: number
 *           format: double
 *           example: 7.25
 *         dataFim:
 *           type: string
 *           format: date-time
 *           example: "2026-01-15T00:00:00.000Z"
 *     InvestimentoUpdateStatus:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: ["em andamento", "finalizado", "cancelado"]
 *           example: "finalizado"
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
 *             $ref: '#/components/schemas/InvestimentoCreate'
 *     responses:
 *       201:
 *         description: Investimento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Investimento'
 *       400:
 *         description: Erro ao criar investimento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Administrador não encontrado"
 *       403:
 *         description: Usuário não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Apenas administradores podem criar investimentos"
 */
router.post("/", verifyToken, createInvestimento);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar investimentos"
 */
router.get("/", verifyToken, getInvestimentos);

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
 *         description: ID do investimento (UUID)
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Investimento não encontrado"
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
router.get("/:id", verifyToken, getInvestimentoById);

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
 *         description: ID do investimento (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvestimentoUpdateStatus'
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               enum: ["em andamento", "finalizado", "cancelado"]
 *               example: "finalizado"
 *       400:
 *         description: Erro ao atualizar status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Status inválido"
 *       404:
 *         description: Investimento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Investimento não encontrado"
 */
router.put("/:id/status", verifyToken, updateStatusInvestimento);

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
 *         description: ID do investimento (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Investimento excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Investimento excluído com sucesso"
 *       400:
 *         description: Erro ao excluir investimento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Não é possível excluir investimento com investidores"
 *       404:
 *         description: Investimento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Investimento não encontrado"
 */
router.delete("/:id", verifyToken, deleteInvestimentoById);

export default router;
