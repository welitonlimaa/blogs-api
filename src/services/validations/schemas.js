const Joi = require('joi');

const dataUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const dataCategorySchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  dataUserSchema,
  dataCategorySchema,
};