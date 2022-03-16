import Joi from 'joi';

export const balloonSchema = Joi.object().keys({
  name: Joi.string().max(25).required(),
  description: Joi.string().max(150).required(),
  point: Joi.object().required(),
  position: Joi.object(),
  color: Joi.string().required(),
  type: Joi.string().required(),
  _id: Joi.string(),
});
