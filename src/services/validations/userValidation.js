const { dataUserSchema } = require('./schemas');

const validateNewUser = (data) => {
  const { error } = dataUserSchema.validate(data);

  if (error) {
    return { type: 'BAD_REQUEST', message: error.message };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateNewUser,
};