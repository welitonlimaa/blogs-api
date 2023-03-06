const { dataCategorySchema } = require('./schemas');

const validateNewCategory = (data) => {
  const { error } = dataCategorySchema.validate(data);

  if (error) {
    return { type: 'BAD_REQUEST', message: error.message };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateNewCategory,
};