const { createToken } = require('../auth/authenticator');
const { userService } = require('../services');

const errorMap = require('../utils/errorMap');

const createUser = async (req, res) => {
  try {
    const data = req.body;

    const { type, message } = await userService.createUser(data);

    const { password: _, ...userWithoutPassword } = message;

    const token = createToken(userWithoutPassword);
    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'erro interno', error });
  }
};

module.exports = { 
  createUser,
};