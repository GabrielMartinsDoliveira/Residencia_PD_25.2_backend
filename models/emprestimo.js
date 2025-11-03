const mongoose = require("mongoose");

const emprestimoSchema = new mongoose.Schema({
  idtomador: {
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
  montante: { type: Number, required: true, unique: true },
  juros: { type: Number, required: true, unique: true },
  saldoDevedor: { type: Number, required: true, unique: true },
  dataInicio: { type: Date, required: true, unique: true, default: Date.now() },
  dataFim: { type: Date, unique: true }
});

const Emprestimo = mongoose.model("Emprestimo", emprestimoSchema)

module.exports = Emprestimo