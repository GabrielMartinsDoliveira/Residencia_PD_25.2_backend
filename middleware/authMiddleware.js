const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const authMiddleware = async (req, res, next) => {
  const { matricula, senha } = req.body;

  try {
    const user = await User.findOne({ matricula });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Usuário com essa matrícula não foi encontrado." });
    }

    const isMatch = await bcrypt(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    req.auth = {
      token,
      userId: user._id,
    };

    next();
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor." });
  }
};

module.exports = authMiddleware;
