const { categoryService } = require('../services');

const errorMap = require('../utils/errorMap');

const createCategory = async (req, res) => {
  try {
    const data = req.body;

    const { type, message } = await categoryService.createCategory(data);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'erro interno', error });
  }
};

const getAllCategorys = async (_req, res) => {
  const categorys = await categoryService.getAllCategorys();

  res.status(200).json(categorys);
};

module.exports = {
  createCategory,
  getAllCategorys,
};
