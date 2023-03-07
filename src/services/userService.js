const { User } = require('../models');

const { validateNewUser } = require('./validations/userValidation');

const getUser = ({ email, password }) => User.findOne({ where: { email, password } });

const getAllUsers = async () => {
  const result = await User.findAll({ attributes: { exclude: 'password' } });
  return result;
};

const getUserById = async (userId) => { 
  const userFound = await User.findByPk(userId);
  if (!userFound) return { type: 'NOT_FOUND', message: 'User does not exist' };
  const user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: 'password' },
  });

  return { type: null, message: user };
};

const createUser = async (dataUser) => {
  const error = validateNewUser(dataUser);
  if (error.type) return error;
  
  const user = await User.findOne({ where: { email: dataUser.email } });
  
  if (user) return { type: 'CONFLICT', message: 'User already registered' };

  const userCreated = await User.create(dataUser);

  return { type: null, message: userCreated };
};

const removeUser = async (userId) => {
  const user = await User.findByPk(userId);
  
  if (!user) return { type: 'NOT_FOUND', message: 'Post does not exist' };

  await User.destroy({ where: { id: userId } });

  return { type: null, message: '' };
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  removeUser,
};