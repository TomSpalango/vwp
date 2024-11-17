import { Request, Response, RequestHandler } from 'express';
import pool from '../models/db';
import { User } from '../models/user.model';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET all users
export const getUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<User[] & RowDataPacket[]>('SELECT * FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// GET a user by ID
export const getUserById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query<User[] & RowDataPacket[]>('SELECT * FROM Users WHERE user_id = ?', [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// POST a new user
export const createUser: RequestHandler = async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>('INSERT INTO Users (name, email, role) VALUES (?, ?, ?)', [name, email, role]);
    res.status(201).json({ message: 'User created', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// PUT to update an existing user
export const updateUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>('UPDATE Users SET name = ?, email = ?, role = ? WHERE user_id = ?', [name, email, role, id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User updated' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// DELETE a user by ID
export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM Users WHERE user_id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
