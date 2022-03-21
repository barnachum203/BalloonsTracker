import { NextFunction, Response, Request } from 'express';
import { ValidationException } from '../exceptions/ValidationException';
import { logger } from '../utils/logger';

export default function joiMiddleware(schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const {balloon} = req.body;
    const { error } = schema.validate(balloon);
    const valid = error == null;

    logger.info('VALIDATION: ' + valid);

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      logger.error('error', message);
      let errorRes = new ValidationException(message);
      next(errorRes)
      // return res.status(422).json(`Error: ${errorRes.message}`);
    }
  };
}
