import { Router } from "express";
import { login } from "../controller/authController.js";

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
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Credenciais inválidas"
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

export default router;