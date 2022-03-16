import Joi from 'joi';

export const userSchema = Joi.object().keys({
  email: Joi.string().max(25).required(),
  password: Joi.string().required(),
  _id: Joi.string(),
  created_at: Joi.date(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().max(25).required(),
  password: Joi.string().required(),
});
