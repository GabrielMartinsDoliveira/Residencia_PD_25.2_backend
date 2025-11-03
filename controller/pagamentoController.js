const Pagamento = require("../models/pagamento");

const createPagamento = async (req, res) => {
  try {
    const {
      idEmprestimo,
      status,
      metodo,
      valor,
      multa,
      dataPagamento,
      dataVencimento,
    } = req.body;

    const pagamento = new Pagamento({
      idEmprestimo,
      status,
      metodo,
      valor,
      multa,
      dataPagamento,
      dataVencimento,
    });

    await pagamento.save();
    res.status(201).json(pagamento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPagamentos = async (req, res) => {
  try {
    const pagamentos = await Pagamento.find();
    res.status(200).json(pagamentos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPagamentoById = async (req, res) => {
  try {
    const pagamento = await Pagamento.findById(req.params.id);
    if (!pagamento) {
      return res.status(404).json({ message: "Pagmaneto não encontrado" });
    }
    res.status(200).json(pagamento);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateStatusPagamento = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const updatedStatus = await Pamganeto.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedStatus) {
      return res.status(404).json({ message: "Pagamento não encontrado" });
    }
    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

const deletePagamentoById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const deletedPagamento = await Pagamento.findByIdAndDelete(id);
    if (!deletedPagamento)
      return res.status(404).json({ message: "Pagamento não encotrado" });

    res.status(200).json({ message: "Pagamento excluído" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createPagamento,
  getPagamentos,
  getPagamentoById,
  updateStatusPagamento,
  deletePagamentoById,
};
