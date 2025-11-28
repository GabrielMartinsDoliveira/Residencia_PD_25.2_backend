import { Router } from "express";
import { login, logout } from "../controller/authController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para autenticação de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - matricula
 *         - senha
 *       properties:
 *         matricula:
 *           type: string
 *           description: Matrícula do usuário
 *           example: "2024001"
 *         senha:
 *           type: string
 *           description: Senha do usuário
 *           example: "senha123"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token para autenticação
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         usuario:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             nome:
 *               type: string
 *             email:
 *               type: string
 *             matricula:
 *               type: string
 *             role:
 *               type: string
 *               enum: [admin, tomador, investidor]
 *     LogoutResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Logout realizado com sucesso."
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Credenciais inválidas"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/login", login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Realiza logout do usuário
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 *       400:
 *         description: Token não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/logout", logout);

export default router;