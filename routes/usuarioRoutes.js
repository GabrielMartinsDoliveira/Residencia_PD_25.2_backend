const express = require("express");
const router = express.Router();
const {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateSenhaUsuario,
  updateSaldoUsuario,
  deleteUsuarioById,
} = require("../controller/usuarioController");
const verifyToken = require("../middleware/verifyMiddleware");

router.post("/", createUsuario);

router.get("/", getUsuarios);

router.get("/:id", getUsuarioById);

router.put("/:id/senha", updateSenhaUsuario);

router.put("/:id/saldo", updateSaldoUsuario);

router.delete("/:id", deleteUsuarioById);

module.exports = router;
