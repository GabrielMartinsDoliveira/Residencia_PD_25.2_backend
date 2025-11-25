import { Router } from "express";
import { UsuarioController } from "../controller/usuarioController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciamento de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - matricula
 *         - senha
 *         - role
 *         - telefone
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "c5f2d4b6-2f8a-4e1c-9f85-12ad1f5e59a0"
 *         nome:
 *           type: string
 *           example: "Fulano Silva"
 *         email:
 *           type: string
 *           format: email
 *           example: "fulanosilva@email.com"
 *         matricula:
 *           type: string
 *           example: "20240001"
 *         contaBancaria:
 *           type: string
 *           nullable: true
 *           example: "12345-6"
 *         agenciaBancaria:
 *           type: string
 *           nullable: true
 *           example: "0001"
 *         senha:
 *           type: string
 *           format: password
 *           example: "123456"
 *         role:
 *           type: string
 *           enum: ["admin", "tomador", "investidor"]
 *           example: "investidor"
 *         saldo:
 *           type: number
 *           format: decimal
 *           example: 1500.75
 *         telefone:
 *           type: string
 *           example: "(11) 99999-9999"
 *     UsuarioCreate:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - matricula
 *         - senha
 *         - role
 *         - telefone
 *       properties:
 *         nome:
 *           type: string
 *           example: "Fulano Silva"
 *         email:
 *           type: string
 *           format: email
 *           example: "fulanosilva@email.com"
 *         matricula:
 *           type: string
 *           example: "20240001"
 *         contaBancaria:
 *           type: string
 *           nullable: true
 *           example: "12345-6"
 *         agenciaBancaria:
 *           type: string
 *           nullable: true
 *           example: "0001"
 *         senha:
 *           type: string
 *           format: password
 *           example: "123456"
 *         role:
 *           type: string
 *           enum: ["admin", "tomador", "investidor"]
 *           example: "investidor"
 *         telefone:
 *           type: string
 *           example: "(11) 99999-9999"
 *     UsuarioUpdateSenha:
 *       type: object
 *       required:
 *         - senha
 *       properties:
 *         senha:
 *           type: string
 *           format: password
 *           example: "novaSenha123"
 *     UsuarioUpdateSaldo:
 *       type: object
 *       required:
 *         - saldo
 *       properties:
 *         saldo:
 *           type: number
 *           format: decimal
 *           example: 2500.50
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCreate'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Erro ao criar usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email já cadastrado"
 */
router.post("/", UsuarioController.criar);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Erro ao listar usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar usuários"
 */
router.get("/", verifyToken, UsuarioController.listar);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário não encontrado"
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
router.get("/:id", verifyToken, UsuarioController.buscarPorId);

/**
 * @swagger
 * /usuarios/{id}/senha:
 *   put:
 *     summary: Atualiza a senha de um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioUpdateSenha'
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Erro ao atualizar senha
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Senha não fornecida"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário não encontrado"
 */
router.put("/:id/senha", verifyToken, UsuarioController.atualizarSenha);

/**
 * @swagger
 * /usuarios/{id}/saldo:
 *   put:
 *     summary: Atualiza o saldo de um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioUpdateSaldo'
 *     responses:
 *       200:
 *         description: Saldo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Erro ao atualizar saldo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Saldo inválido"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário não encontrado"
 */
router.put("/:id/saldo", verifyToken, UsuarioController.atualizarSaldo);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário excluído"
 *       400:
 *         description: Erro ao excluir usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao excluir usuário"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário não encontrado"
 */
router.delete("/:id", verifyToken, UsuarioController.deletar);

export default router;
