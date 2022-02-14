import jwt from 'jsonwebtoken';

/**
 * Check if the user have an authorized token
 * @augments x-auth-token should be in request header.
 */
const requireUser = async (req, res, next) => {
  const token: string = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'User not authorized' });
  }
  console.log('token verified.');

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) {
      console.log('jwt not verified.');
      console.log(user.id);

      return res.status(400).json({ message: 'User not authorized' });
    }
    console.log('jwt verified.');

    next();
  });
};
export default requireUser;
