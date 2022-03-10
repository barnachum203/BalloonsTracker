import Joi from 'joi';

export const createSchema = Joi.object().keys({
  name: Joi.string().max(25).required(),
  type: Joi.string().required(),
  age: Joi.number().required(),
  id: Joi.number(),
  created_at: Joi.date(),
});

export const updateSchema = Joi.object().keys({
  name: Joi.string().max(25).required(),
  age: Joi.number().required(),
  type: Joi.string().required(),
  id: Joi.number(),
  _id: Joi.string(),
  __v: Joi.number(),
  created_at: Joi.date(),
});
