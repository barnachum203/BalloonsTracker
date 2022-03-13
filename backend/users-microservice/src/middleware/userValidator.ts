import Joi from 'joi';

export const createSchema = Joi.object().keys({
  email: Joi.string().max(25).required(),
  password: Joi.string().required(),
  // age: Joi.number().required(),
  // id: Joi.number(),
  created_at: Joi.date(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().max(25).required(),
  password: Joi.string().required(),
  // type: Joi.string().required(),
  // id: Joi.number(),
  // _id: Joi.string(),
  // __v: Joi.number(),
  // created_at: Joi.date(),
});
