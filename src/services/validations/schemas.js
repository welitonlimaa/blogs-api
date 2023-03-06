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

const dataPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.required(),
});

module.exports = {
  dataUserSchema,
  dataCategorySchema,
  dataPostSchema,
};