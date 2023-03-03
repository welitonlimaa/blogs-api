const { User } = require('../models');

const { validateNewUser } = require('./validations/userValidation');

const getUser = ({ email, password }) => User.findOne({ where: { email, password } });

const createUser = async (dataUser) => {
  const error = validateNewUser(dataUser);
  if (error.type) return error;
  console.log(dataUser);
  const user = await User.findOne({ where: { email: dataUser.email } });
  console.log(user);
  if (user) return { type: 'CONFLICT', message: 'User already registered' };

  const userCreated = await User.create(dataUser);

  return { type: null, message: userCreated };
};

module.exports = {
  createUser,
  getUser,
};