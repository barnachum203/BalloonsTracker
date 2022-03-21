import { NextFunction, Response, Request } from 'express';
import { ValidationException } from '../exceptions/ValidationException';
import { logger } from '../utils/logger';

export default function joiMiddleware(schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const { error } = schema.validate(user);

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
    }
  };
}
