const Joi = require('joi');

const dataLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  dataLoginSchema,
};