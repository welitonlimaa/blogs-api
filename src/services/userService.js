const { User } = require('../models');

const getUser = ({ email, password }) => User.findOne({ where: { email, password } });

module.exports = {
  getUser,
};