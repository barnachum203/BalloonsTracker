import { Request, Response, NextFunction } from 'express';
import { checkToken } from '../services/users-service.service';

import { log } from '../utils/logger';

/**
 * Check if the user have an authorized token
 * @augments authorization should be in request header.
 */
export const requireUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  log.info(`token: ${token}`);

  if (!token) {
    log.error('token not verified');
    return res.status(401).json({ message: 'User not authorized' });
  }
  log.info('token verified.');

  try {
    const result = await checkToken(authHeader);
    const { error } = result;
    log.info(`jwt result: ${result}`);
    log.error(error);
    next();
  } catch (error) {
    log.error(error.message);
    return res
      .status(401)
      .json({ message: 'User not authorized.', errorMessage: error.message });
  }
};
export default requireUser;
