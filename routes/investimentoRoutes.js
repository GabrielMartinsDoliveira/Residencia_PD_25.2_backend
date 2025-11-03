const express = require("express");
const router = express.Router();
const {
  createInvestimento,
  getInvestimentos,
  getInvestimentoById,
  updateStatusInvestimento,
  deleteInvestimentoById,
} = require("../controller/investimentoController");

const verifyToken = require("../middleware/verifyMiddleware");

router.post("/", createInvestimento);

router.get("/", getInvestimentos);

router.get("/:id", getInvestimentoById);

router.put("/:id/status", updateStatusInvestimento);

router.delete("/:id", deleteInvestimentoById);

module.exports = router;
