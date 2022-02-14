import Joi from 'joi';

export const registerSchema = Joi.object().keys({
  password: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string(),
  created: Joi.date(),
});

export const loginSchema = Joi.object().keys({
  password: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
});
