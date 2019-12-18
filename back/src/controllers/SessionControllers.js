const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    if (!(await user.compareHash(password))) {
      return res.json({ error: "Senha inválida." });
    }

    const { _id, name, isAdmin } = user;

    return res.json({
      user: { _id, name, isAdmin, email },
      token: User.generateToken(user)
    });
  }
};