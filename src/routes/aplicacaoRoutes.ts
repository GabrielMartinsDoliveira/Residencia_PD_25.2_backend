import { Router } from "express";
import {
  aplicarEmInvestimento,
  getAplicacoesPorInvestimento,
  getAplicacoesPorUsuario,
  getAplicacaoById,
} from "../controller/aplicacaoController.js";

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
 *         - valor
 *       properties:
 *         usuarioId:
 *           type: string
 *           format: uuid
 *           description: ID do usuário investidor
 *           example: "c5f2d4b6-2f8a-4e1c-9f85-12ad1f5e59a0"
 *         valor:
 *           type: number
 *           format: double
 *           description: Valor a ser aplicado no investimento
 *           example: 2500.00
 */

/**
 * @swagger
 * /investimentos/{investimentoId}/aplicar:
 *   post:
 *     summary: Aplicar um valor em um investimento
 *     tags: [Aplicações]
 *     parameters:
 *       - in: path
 *         name: investimentoId
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
 *             $ref: '#/components/schemas/AplicacaoCreate'
 *     responses:
 *       201:
 *         description: Aplicação realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aplicacao'
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Campos obrigatórios: usuarioId, valor"
 *       404:
 *         description: Recurso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Investimento não encontrado"
 *       409:
 *         description: Conflito na aplicação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Saldo insuficiente para realizar a aplicação"
 */
router.post("/investimentos/:investimentoId/aplicar", aplicarEmInvestimento);

/**
 * @swagger
 * /investimentos/{investimentoId}/aplicacoes:
 *   get:
 *     summary: Listar aplicações de um investimento
 *     tags: [Aplicações]
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
 *       400:
 *         description: Erro ao buscar aplicações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar aplicações do investimento"
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
router.get("/investimentos/:investimentoId/aplicacoes", getAplicacoesPorInvestimento);

/**
 * @swagger
 * /usuarios/{usuarioId}/aplicacoes:
 *   get:
 *     summary: Listar aplicações feitas por um usuário
 *     tags: [Aplicações]
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
 *       400:
 *         description: Erro ao buscar aplicações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar aplicações do usuário"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário não encontrado"
 */
router.get("/usuarios/:usuarioId/aplicacoes", getAplicacoesPorUsuario);

/**
 * @swagger
 * /aplicacoes/{id}:
 *   get:
 *     summary: Buscar aplicação pelo ID
 *     tags: [Aplicações]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aplicação não encontrada"
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
router.get("/aplicacoes/:id", getAplicacaoById);

export default router;