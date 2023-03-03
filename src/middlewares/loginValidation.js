const { dataLoginSchema } = require('./schemas');

const loginValidation = (req, res, next) => {
  const data = req.body;
  const { error } = dataLoginSchema.validate(data);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  return next();
};

module.exports = {
  loginValidation,
};