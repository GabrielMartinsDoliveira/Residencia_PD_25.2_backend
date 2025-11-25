import { Router } from "express";
import {
  aplicarEmInvestimento,
  getAplicacoesPorInvestimento,
  getAplicacoesPorUsuario,
  getAplicacaoById,
  getAllAplicacoes,
} from "../controller/aplicacaoController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Aplicações
 *   description: Gestão de aplicações em investimentos
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
 *     InvestimentoResumo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         valor:
 *           type: number
 *           format: double
 *         juros:
 *           type: number
 *           format: double
 *         status:
 *           type: string
 *           enum: ["em andamento", "finalizado", "cancelado"]
 *     Aplicacao:
 *       type: object
 *       required:
 *         - usuario
 *         - investimento
 *         - valor
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *         usuario:
 *           $ref: '#/components/schemas/UsuarioResumo'
 *         investimento:
 *           $ref: '#/components/schemas/InvestimentoResumo'
 *         valor:
 *           type: number
 *           format: double
 *           precision: 12
 *           scale: 2
 *           description: Valor aplicado no investimento
 *           example: 5000.00
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *           description: Data e hora da aplicação
 *           example: "2025-01-20T10:30:00.000Z"
 *     AplicacaoCreate:
 *       type: object
 *       required:
 *         - usuarioId
 *         - investimentoId
 *         - valor
 *       properties:
 *         usuarioId:
 *           type: string
 *           format: uuid
 *           description: ID do usuário investidor
 *           example: "c5f2d4b6-2f8a-4e1c-9f85-12ad1f5e59a0"
 *         investimentoId:
 *           type: string
 *           format: uuid
 *           description: ID do investimento
 *           example: "d6e7f8a9-3b4c-5d6e-7f8a-9b0c1d2e3f4a"
 *         valor:
 *           type: number
 *           format: double
 *           description: Valor a ser aplicado no investimento
 *           example: 2500.00
 */

/**
 * @swagger
 * /aplicacoes:
 *   get:
 *     summary: Listar todas as aplicações
 *     tags: [Aplicações]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Lista de aplicações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aplicacao'
 */
router.get("/", verifyToken, getAllAplicacoes);

/**
 * @swagger
 * /aplicacoes:
 *   post:
 *     summary: Criar uma nova aplicação
 *     tags: [Aplicações]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AplicacaoCreate'
 *     responses:
 *       201:
 *         description: Aplicação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aplicacao'
 *       400:
 *         description: Erro na requisição
 */
router.post("/:investimentoId", verifyToken, aplicarEmInvestimento);

/**
 * @swagger
 * /aplicacoes/{id}:
 *   get:
 *     summary: Buscar aplicação pelo ID
 *     tags: [Aplicações]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da aplicação (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Aplicação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aplicacao'
 *       404:
 *         description: Aplicação não encontrada
 */
router.get("/:id", verifyToken, getAplicacaoById);

/**
 * @swagger
 * /aplicacoes/investimento/{investimentoId}:
 *   get:
 *     summary: Listar aplicações de um investimento
 *     tags: [Aplicações]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: investimentoId
 *         required: true
 *         description: ID do investimento (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de aplicações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aplicacao'
 *       404:
 *         description: Investimento não encontrado
 */
router.get("/:investimentoId", verifyToken, getAplicacoesPorInvestimento);

/**
 * @swagger
 * /aplicacoes/usuario/{usuarioId}:
 *   get:
 *     summary: Listar aplicações feitas por um usuário
 *     tags: [Aplicações]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         description: ID do usuário (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de aplicações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aplicacao'
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:usuarioId", verifyToken, getAplicacoesPorUsuario);

export default router;
