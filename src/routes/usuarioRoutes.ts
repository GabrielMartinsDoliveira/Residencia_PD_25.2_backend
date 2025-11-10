import { Router } from "express";
import { UsuarioController } from "../controller/usuarioController.js";
// import verifyToken from "../middleware/verifyMiddleware"; 

const router = Router();

router.post("/", UsuarioController.criar);
router.get("/", UsuarioController.listar);
router.get("/:id", UsuarioController.buscarPorId);
router.put("/:id/senha", UsuarioController.atualizarSenha);
router.put("/:id/saldo", UsuarioController.atualizarSaldo);
router.delete("/:id", UsuarioController.deletar);

export default router;