const { createToken } = require('../auth/authenticator');
const { userService } = require('../services');

const loginAuth = async (req, res) => {
  try {
    const data = req.body;

    const user = await userService.getUser(data);

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid fields' });
    }

    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = createToken(userWithoutPassword);

    res.status(200).json({ token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  loginAuth,
};