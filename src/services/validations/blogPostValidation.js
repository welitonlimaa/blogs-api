const { Category } = require('../../models');

const { dataPostSchema, dataUpdatePostSchema } = require('./schemas');

const validateNewPost = (data) => {
  const { error } = dataPostSchema.validate(data);

  if (error) {
    return { type: 'BAD_REQUEST', message: 'Some required fields are missing' };
  }

  return { type: null, message: '' };
};

const validateCategoryId = async (categorys) => {
  const hasCategory = await Promise.all(categorys.map((id) =>
    Category.findByPk(id)));
  
  if (hasCategory.includes(null)) {
    return { type: 'BAD_REQUEST', message: 'one or more "categoryIds" not found' };
  }
  return { type: null, message: '' };
};

const validateUpdatePost = (data) => {
  const { error } = dataUpdatePostSchema.validate(data);

  if (error) {
    return { type: 'BAD_REQUEST', message: 'Some required fields are missing' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateNewPost,
  validateCategoryId,
  validateUpdatePost,
};