import bcrypt from 'bcrypt';
import {
  insertUser,
  fetchUsers,
  fetchUserById,
  updateUserById,
  deleteUserById
} from '../services/user.service.js';

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, age, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await insertUser({
      name,
      email,
      password: hashedPassword,
      age,
      role
    });

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ message: 'Email already exists' });
      }
      throw error;
    }

    res.status(201).json(data[0]);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const { data, error } = await fetchUsers();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await fetchUserById(id);

    if (error || !data) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const { data, error } = await updateUserById(id, updateData);

    if (error || data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(data[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await deleteUserById(id);

    if (error) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
