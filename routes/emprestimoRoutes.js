const express = require("express");
const router = express.Router();
const {
  createEmprestimo,
  getEmprestimos,
  getEmprestimoById,
  updateEmprestimo,
  deleteEmprestimoById,
} = require("../controller/emprestimoController");

const verifyToken = require("../middleware/verifyMiddleware");

router.post("/", createEmprestimo);

router.get("/", getEmprestimos);

router.get("/:id", getEmprestimoById);

router.put("/:id/status", updateEmprestimo);

router.delete("/:id", deleteEmprestimoById);

module.exports = router;
