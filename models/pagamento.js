const mongoose = require("mongoose");

const pagamentoSchema = new mongoose.Schema({
  idEmprestimo: {
    type: Schema.Types.ObjectId,
    ref: "Emprestimo",
    require: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["em aberto", "em atraso", "pago"],
    require: true,
    unique: true,
    default: "em aberto",
  },
  metodo: { type: String, required: true, unique: true },
  valor: { type: Number, required: true, unique: true },
  multa: { type: Number, unique: true },
  saldoDevedor: { type: Number, required: true, unique: true },
  dataPagamento: { type: Date, required: true, unique: true },
  dataVencimento: { type: Date, required: true, unique: true },
});

const Emprestimo = mongoose.model("Emprestimo", emprestimoSchema);

module.exports = Emprestimo;
