const { Category } = require('../models');

const { validateNewCategory } = require('./validations/categoryValidation');

const createCategory = async (dataCategory) => {
  const error = validateNewCategory(dataCategory);
  if (error.type) return error;

  // const category = await Category.findOne({ where: { name: dataCategory.name } });

  // if (category) return { type: 'CONFLICT', message: 'category already registered' };

  const categoryCreated = await Category.create(dataCategory);

  return { type: null, message: categoryCreated };
};

const getAllCategorys = async () => {
  const result = await Category.findAll();
  return result;
};

module.exports = {
  createCategory,
  getAllCategorys,
};