import { Router } from "express";
import {
  createEmprestimo,
  getEmprestimos,
  getEmprestimoById,
  updateEmprestimo,
  deleteEmprestimo,
} from "../controller/emprestimoController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Empréstimos
 *   description: Endpoints para gerenciamento de empréstimos
 */

/**
 * @swagger
 * /emprestimos:
 *   post:
 *     summary: Cria um novo empréstimo
 *     tags: [Empréstimos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmprestimoCreate'
 *     responses:
 *       201:
 *         description: Empréstimo criado com sucesso
 *       400:
 *         description: Erro ao criar empréstimo
 */
router.post("/", createEmprestimo);

/**
 * @swagger
 * /emprestimos:
 *   get:
 *     summary: Lista todos os empréstimos
 *     tags: [Empréstimos]
 */
router.get("/", getEmprestimos);

/**
 * @swagger
 * /emprestimos/{id}:
 *   get:
 *     summary: Busca um empréstimo pelo ID
 *     tags: [Empréstimos]
 */
router.get("/:id", getEmprestimoById);

/**
 * @swagger
 * /emprestimos/{id}:
 *   put:
 *     summary: Atualiza um empréstimo
 *     tags: [Empréstimos]
 */
router.put("/:id", updateEmprestimo);

/**
 * @swagger
 * /emprestimos/{id}:
 *   delete:
 *     summary: Exclui um empréstimo
 *     tags: [Empréstimos]
 */
router.delete("/:id", deleteEmprestimo);

export default router;
