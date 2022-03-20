import jwt from 'jsonwebtoken';
import { log } from '../utils/logger';

/**
 * Check if the user have an authorized token
 * @augments x-auth-token should be in request header.
 */
const requireUser = async (req, res, next) => {
  const token: string = req.header('x-auth-token');
  log.info(`token: ${token}`);

  if (!token) {
    log.error('token not verified');
    return res.status(401).json({ message: 'User not authorized' });
  }
  log.info('token verified.');

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) {
      log.error('jwt not verified.');
      log.info(user);

      return res.status(400).json({ message: 'User not authorized' });
    }
    log.info('jwt verified.');
    next();
  });
};
export default requireUser;
