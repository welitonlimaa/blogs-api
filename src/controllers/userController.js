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

const getUsers = async (_req, res) => {
  const users = await userService.getAllUsers();

  if (!users) throw Error;

  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getUserById(Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  res.status(200).json(message);
};

module.exports = { 
  createUser,
  getUsers,
  getUserById,
};