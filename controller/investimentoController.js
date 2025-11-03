const Investimento = require("../models/investimento");

const createInvestimento = async (req, res) => {
  try {
    const {
      idAdministrador,
      status,
      prazo,
      valor,
      juros,
      dataInicio,
      dataFim,
    } = req.body;

    const investimento = new Investimento({
      idAdministrador,
      status,
      prazo,
      valor,
      juros,
      dataInicio,
      dataFim,
    });

    await investimento.save();
    res.status(201).json(investimento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getInvestimentos = async (req, res) => {
  try {
    const investimentos = await Investimento.find();
    res.status(200).json(investimentos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getInvestimentoById = async (req, res) => {
  try {
    const investimento = await Investimento.findById(req.params.id);
    if (!investimento) {
      return res.status(404).json({ message: "Investimento não encontrado" });
    }
    res.status(200).json(investimento);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateStatusInvestimento = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const updatedStatus = await Investimento.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedStatus) {
      return res.status(404).json({ message: "Investimento não encontrado" });
    }

    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

const deleteInvestimentoById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const deletedInvestimento = await Investimento.findByIdAndDelete(id);
    if (!deletedInvestimento)
      return res.status(404).json({ message: "Investimento não encotrado" });

    res.status(200).json({ message: "Investimento excluído" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createInvestimento,
  getInvestimentos,
  getInvestimentoById,
  updateStatusInvestimento,
  deleteInvestimentoById,
};
