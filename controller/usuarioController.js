const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const createUsuario = async (req, res) => {
  try {
    const { nome, email, matricula, senha, role } = req.body;
    const verifyUsuario = await Usuario.find(matricula)
    const verifyUsuarioEmail = await Usuario.find(email)
    if (verifyUsuario || verifyUsuarioEmail){
      return res.status(404).json({message: "Credenciais já foram cadastradas!"})
    }
    const user = new Usuario({ nome, email, matricula, senha, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const users = await Usuario.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const user = await Usuario.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateSenhaUsuario = async (req, res) => {
  try {
    const  id = req.params.id;
    const { senha } = req.body;

    const updatedUsuario = await Usuario.findByIdAndUpdate(
      id,
      { senha},
      { new: true }
    );
    if (!updatedUsuario)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.status(200).json(updatedUsuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const updateSaldoUsuario = async (req, res) => {
  try {
    const  id = req.params.id;
    const { saldo } = req.body;

    const updatedUsuario = await Usuario.findByIdAndUpdate(
      id,
      { saldo},
      { new: true }
    );
    if (!updatedUsuario)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.status(200).json(updatedUsuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUsuarioById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const deletedUsuario = await Usuario.findByIdAndDelete(id);
    if (!deletedUsuario)
      return res.status(404).json({ message: "Usuário não encotrado" });

    res.status(200).json({ message: "Usuário excluído" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateSenhaUsuario,
  updateSaldoUsuario,
  deleteUsuarioById,
};
