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
 * /investimentos/{investimentoId}/aplicar:
 *   post:
 *     summary: Aplicar um valor em um investimento
 *     tags: [Aplicações]
 *     parameters:
 *       - in: path
 *         name: investimentoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do investimento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [usuarioId, valor]
 *             properties:
 *               usuarioId:
 *                 type: string
 *                 example: "123"
 *               valor:
 *                 type: number
 *                 example: 1000
 *     responses:
 *       201:
 *         description: Aplicação realizada com sucesso
 *       400:
 *         description: Erro na requisição
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
 *         schema:
 *           type: string
 *         description: ID do investimento
 *     responses:
 *       200:
 *         description: Lista de aplicações retornada com sucesso
 *       400:
 *         description: Erro ao buscar aplicações
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
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de aplicações retornada com sucesso
 *       400:
 *         description: Erro ao buscar aplicações
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
 *         schema:
 *           type: string
 *         description: ID da aplicação
 *     responses:
 *       200:
 *         description: Aplicação encontrada
 *       404:
 *         description: Aplicação não encontrada
 *       400:
 *         description: Erro na requisição
 */
router.get("/aplicacoes/:id", getAplicacaoById);

export default router;
