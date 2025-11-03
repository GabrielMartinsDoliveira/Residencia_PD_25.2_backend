const Emprestimo = require("../models/emprestimo");

const createEmprestimo = async (req, res) => {
  try {
    const {
      idTomador,
      status,
      prazo,
      montante,
      juros,
      saldoDevedor,
      dataInicio,
      dataFim,
    } = req.body;

    const verifyTomador = await Emprestimo.find(idTomador);

    if (verifyTomador) {
      return res
        .status(404)
        .json({ message: "Você possui um empréstimo em aberto" });
    }

    const emprestimo = new Emprestimo({
      idTomador,
      status,
      prazo,
      montante,
      juros,
      saldoDevedor,
      dataInicio,
      dataFim,
    });

    await emprestimo.save();
    res.status(201).json(emprestimo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEmprestimos = async (req, res) => {
  try {
    const emprestimos = await Emprestimo.find();
    res.status(201).json(emprestimos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEmprestimoById = async (req, res) => {
  try {
    const emprestimo = await Emprestimo.findById(req.params.id);
    if (!emprestimo) {
      return res.status(404).json({ message: "Empréstimo não encontrado" });
    }
    res.status(200).json(emprestimo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateEmprestimo = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, saldoDevedor } = req.body;

    const updatedEmprestimo = await Emprestimo.findByIdAndUpdate(
      id,
      { status, saldoDevedor },
      { new: true }
    );
    if (!updatedEmprestimo) {
      return res.status(404).json({ message: "Empréstimo não encontrado" });
    }

    res.status(200).json(updatedEmprestimo);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

const deleteEmprestimoById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const deletedEmprestimo = await Emprestimo.findByIdAndDelete(id);
    if (!deletedEmprestimo)
      return res.status(404).json({ message: "Empréstimo não encotrado" });

    res.status(200).json({ message: "Empréstimo excluído" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createEmprestimo,
  getEmprestimos,
  getEmprestimoById,
  updateEmprestimo,
  deleteEmprestimoById,
};
