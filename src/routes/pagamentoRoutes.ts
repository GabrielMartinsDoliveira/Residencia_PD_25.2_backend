import { Router } from "express";
import { PagamentoController } from "../controller/pagamentoController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pagamentos
 *   description: Endpoints para gerenciamento de pagamentos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pagamento:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "8a3f95a2-2c77-4b9a-b4dc-8b913b3b04df"
 *         idEmprestimo:
 *           type: string
 *           description: ID do empréstimo ao qual o pagamento pertence
 *           example: "6b7a83b4-8f5a-4c99-9b77-05b6a4d09a41"
 *         status:
 *           type: string
 *           enum: ["em aberto", "em atraso", "pago"]
 *           example: "em aberto"
 *         metodo:
 *           type: string
 *           enum: ["pix", "boleto"]
 *           example: "pix"
 *         valor:
 *           type: number
 *           format: decimal
 *           example: 1200.50
 *         multa:
 *           type: number
 *           format: decimal
 *           nullable: true
 *           example: 50.00 *         
 *         dataPagamento:
 *           type: string
 *           format: date-time
 *           example: "2025-03-10T00:00:00.000Z"
 *         dataVencimento:
 *           type: string
 *           format: date-time
 *           example: "2025-03-05T00:00:00.000Z"
 */

/**
 * @swagger
 * /pagamentos:
 *   post:
 *     summary: Cria um novo pagamento vinculado a um empréstimo
 *     tags: [Pagamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idEmprestimo
 *               - metodo
 *               - valor
 *               - saldoDevedor
 *               - dataPagamento
 *               - dataVencimento
 *             properties:
 *               idEmprestimo:
 *                 type: string
 *                 example: "6b7a83b4-8f5a-4c99-9b77-05b6a4d09a41"
 *               metodo:
 *                 type: string
 *                 example: "boleto"
 *               valor:
 *                 type: number
 *                 format: decimal
 *                 example: 950.00
 *               multa:
 *                 type: number
 *                 format: decimal
 *                 example: 0.00
 *               saldoDevedor:
 *                 type: number
 *                 format: decimal
 *                 example: 2050.00
 *               dataPagamento:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-15T00:00:00.000Z"
 *               dataVencimento:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-10T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Pagamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pagamento'
 *       400:
 *         description: Erro ao criar pagamento
 */
router.post("/", PagamentoController.criar);

/**
 * @swagger
 * /pagamentos:
 *   get:
 *     summary: Lista todos os pagamentos cadastrados
 *     tags: [Pagamentos]
 *     responses:
 *       200:
 *         description: Lista de pagamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pagamento'
 *       400:
 *         description: Erro ao listar pagamentos
 */
router.get("/", PagamentoController.listar);

/**
 * @swagger
 * /pagamentos/{id}:
 *   get:
 *     summary: Busca um pagamento pelo ID
 *     tags: [Pagamentos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do pagamento
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Pagamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pagamento'
 *       404:
 *         description: Pagamento não encontrado
 *       400:
 *         description: Erro na requisição
 */
router.get("/:id", PagamentoController.buscarPorId);

/**
 * @swagger
 * /pagamentos/{id}/status:
 *   put:
 *     summary: Atualiza o status de um pagamento
 *     tags: [Pagamentos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do pagamento
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
 *                 enum: ["em aberto", "em atraso", "pago"]
 *                 example: "pago"
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pagamento'
 *       400:
 *         description: Erro ao atualizar status
 */
router.put("/:id/status", PagamentoController.atualizarStatus);

/**
 * @swagger
 * /pagamentos/{id}:
 *   delete:
 *     summary: Exclui um pagamento pelo ID
 *     tags: [Pagamentos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do pagamento
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Pagamento excluído com sucesso
 *       400:
 *         description: Erro ao excluir pagamento
 */
router.delete("/:id", PagamentoController.deletar);

export default router;
