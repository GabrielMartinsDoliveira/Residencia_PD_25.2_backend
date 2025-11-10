import { Router } from "express";
import {
  createInvestimento,
  getInvestimentos,
  getInvestimentoById,
  updateStatusInvestimento,
  deleteInvestimentoById,
} from "../controller/investimentoController.js";

// import { verifyToken } from "../middleware/verifyMiddleware";

const router = Router();

router.post("/", createInvestimento);
router.get("/", getInvestimentos);
router.get("/:id", getInvestimentoById);
router.put("/:id/status", updateStatusInvestimento);
router.delete("/:id", deleteInvestimentoById);

export default router;