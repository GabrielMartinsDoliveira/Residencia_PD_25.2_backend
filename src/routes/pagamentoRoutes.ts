import { Router } from "express";
import { PagamentoController } from "../controller/pagamentoController.js";
// import verifyToken from "../middleware/verifyMiddleware";

const router = Router();

router.post("/", PagamentoController.criar);
router.get("/", PagamentoController.listar);
router.get("/:id", PagamentoController.buscarPorId);
router.put("/:id/status", PagamentoController.atualizarStatus);
router.delete("/:id", PagamentoController.deletar);

export default router;
