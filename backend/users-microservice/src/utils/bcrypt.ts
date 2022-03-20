import bcrypt from 'bcrypt';

const compare = async (p1, p2) => {
  return await bcrypt.compare(p1, p2);
};

export default compare;
