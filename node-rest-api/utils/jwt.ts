import jwt from 'jsonwebtoken';

const maxAge = 2 * 24 * 60 * 60; //2d

const creatToken = (id: string) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

export default creatToken;
