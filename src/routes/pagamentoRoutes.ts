import { Router } from "express";
import { PagamentoController } from "../controller/pagamentoController.js";
import { verifyToken } from "../middleware/verifyToken.js";
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
 *     EmprestimoResumo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         montante:
 *           type: number
 *           format: double
 *         saldoDevedor:
 *           type: number
 *           format: double
 *         status:
 *           type: string
 *           enum: ["em analise", "aprovado", "negado", "quitado", "cancelado"]
 *     Pagamento:
 *       type: object
 *       required:
 *         - emprestimo
 *         - metodo
 *         - valor
 *         - dataVencimento
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "8a3f95a2-2c77-4b9a-b4dc-8b913b3b04df"
 *         emprestimo:
 *           $ref: '#/components/schemas/EmprestimoResumo'
 *         status:
 *           type: string
 *           enum: ["em aberto", "em atraso", "pago"]
 *           default: "em aberto"
 *           example: "em aberto"
 *         metodo:
 *           type: string
 *           enum: ["pix", "boleto"]
 *           example: "pix"
 *         valor:
 *           type: number
 *           format: double
 *           precision: 10
 *           scale: 2
 *           example: 1200.50
 *         multa:
 *           type: number
 *           format: double
 *           precision: 10
 *           scale: 2
 *           nullable: true
 *           example: 50.00
 *         dataPagamento:
 *           type: string
 *           format: date-time
 *           example: "2025-03-10T00:00:00.000Z"
 *         dataVencimento:
 *           type: string
 *           format: date-time
 *           example: "2025-03-05T00:00:00.000Z"
 *     PagamentoCreate:
 *       type: object
 *       required:
 *         - emprestimoId
 *         - metodo
 *         - valor
 *         - dataVencimento
 *       properties:
 *         emprestimoId:
 *           type: string
 *           format: uuid
 *           description: ID do empréstimo ao qual o pagamento pertence
 *           example: "6b7a83b4-8f5a-4c99-9b77-05b6a4d09a41"
 *         metodo:
 *           type: string
 *           enum: ["pix", "boleto"]
 *           example: "boleto"
 *         valor:
 *           type: number
 *           format: double
 *           example: 950.00
 *         multa:
 *           type: number
 *           format: double
 *           nullable: true
 *           example: 0.00
 *         dataPagamento:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Data em que o pagamento foi realizado (preenchida automaticamente quando pago)
 *           example: "2025-05-15T00:00:00.000Z"
 *         dataVencimento:
 *           type: string
 *           format: date-time
 *           example: "2025-05-10T00:00:00.000Z"
 *     PagamentoUpdateStatus:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: ["em aberto", "em atraso", "pago"]
 *           example: "pago"
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
 *             $ref: '#/components/schemas/PagamentoCreate'
 *     responses:
 *       201:
 *         description: Pagamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pagamento'
 *       400:
 *         description: Erro ao criar pagamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empréstimo não encontrado"
 *       409:
 *         description: Conflito na criação do pagamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Já existe um pagamento em aberto para este empréstimo"
 */
router.post("/", verifyToken, PagamentoController.criar);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar pagamentos"
 */
router.get("/", verifyToken, PagamentoController.listar);

/**
 * @swagger
 * /pagamentos/emprestimo/{emprestimoId}:
 *   get:
 *     summary: Lista todos os pagamentos relacionados a um empréstimo
 *     tags: [Pagamentos]
 *     parameters:
 *       - in: path
 *         name: emprestimoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do empréstimo
 *     responses:
 *       200:
 *         description: Lista de pagamentos relacionados ao empréstimo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pagamento'
 *       400:
 *         description: Erro ao buscar pagamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.get(
  "/emprestimo/:emprestimoId",
  verifyToken,
  PagamentoController.listarPorEmprestimo
);

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
 *         description: ID do pagamento (UUID)
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pagamento não encontrado"
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID inválido"
 */
router.get("/:id", verifyToken, PagamentoController.buscarPorId);

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
 *         description: ID do pagamento (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PagamentoUpdateStatus'
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pagamento'
 *       400:
 *         description: Erro ao atualizar status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Status inválido"
 *       404:
 *         description: Pagamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pagamento não encontrado"
 *       409:
 *         description: Conflito na atualização
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Não é possível alterar status de pagamento já quitado"
 */
router.put("/:id/status", verifyToken, PagamentoController.atualizarStatus);

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
 *         description: ID do pagamento (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Pagamento excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pagamento excluído"
 *       400:
 *         description: Erro ao excluir pagamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Não é possível excluir pagamento com status pago"
 *       404:
 *         description: Pagamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pagamento não encontrado"
 */
router.delete("/:id", verifyToken, PagamentoController.deletar);

export default router;
