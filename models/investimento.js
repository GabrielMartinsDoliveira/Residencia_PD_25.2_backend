const mongoose = require("mongoose");

const investimentoSchema = new mongoose.Schema({
  idAdministrador: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["em andamento", "finalizado", "cancelado"],
    require: true,
    unique: true,
    default: "em andamento",
  },
  prazo: { type: Number, required: true, unique: true },
  valor: { type: Number, required: true, unique: true },
  juros: { type: Number, required: true, unique: true },
  dataInicio: { type: Date, required: true, unique: true, default: Date.now() },
  dataFim: { type: Date, unique: true }
});

const Investimento = mongoose.model("Investimento", investimentoSchema)

module.exports = Investimento