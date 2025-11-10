import { Router } from "express";
import {
  createEmprestimo,
  getEmprestimos,
  getEmprestimoById,
  updateEmprestimo,
  deleteEmprestimo,
} from "../controller/emprestimoController.js";

// import { verifyToken } from "../middleware/verifyMiddleware.js";

const router = Router();

router.post("/", createEmprestimo);
router.get("/", getEmprestimos);
router.get("/:id", getEmprestimoById);
router.put("/:id", updateEmprestimo);
router.delete("/:id", deleteEmprestimo);

export default router;
