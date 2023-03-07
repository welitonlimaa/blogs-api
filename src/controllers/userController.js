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

  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getUserById(Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  res.status(200).json(message);
};

const removeUser = async (req, res) => {
  const { id } = req.data;
  
  const { type, message } = await userService.removeUser(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).end();
};

module.exports = { 
  createUser,
  getUsers,
  getUserById,
  removeUser,
};