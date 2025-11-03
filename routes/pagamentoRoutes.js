const express = require("express");
const router = express.Router();
const {
  createPagamento,
  getPagamentos,
  getPagamentoById,
  updateStatusPagamento,
  deletePagamentoById,
} = require("../controller/pagamentoController");

const verifyToken = require("../middleware/verifyMiddleware");

router.post("/", createPagamento);

router.get("/", getPagamentos);

router.get("/:id", getPagamentoById);

router.put("/:id/status", updateStatusPagamento);

router.delete("/:id", deletePagamentoById);

module.exports = router;
