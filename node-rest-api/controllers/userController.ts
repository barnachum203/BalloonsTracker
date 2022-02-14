import { IUser } from '../model/user';
import * as userService from '../services/userService';

/**
 * Get all users:
 *
 * */
export const getAll = async (req, res) => {
  try {
    const users: IUser[] = await userService.getAllUsers();
    res.status(201).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Register new user:
 *
 * */
export const register = async (req, res) => {
  try {
    const result = await userService.register(req.body);

    if (!result) {
      console.log('User already exist');
      return res.status(400).json({ message: 'User already exist' });
    }

    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    // console.log(err);
    res.status(404).json({ message: err.message });
  }
};

/**
 * Update user:
 *
 * */
export const update = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  try {
    await userService.updateUser(user, id);
    res.status(201).json({ message: 'User updated.' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.login(email, password);
    res.status(201).json({ user: result.user, token: result.token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // const result =
    await userService.deleteUser(id);
    res.status(201).json({ message: 'User deleted.' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userService.getUserById(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
