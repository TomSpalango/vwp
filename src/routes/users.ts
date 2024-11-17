import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usersController';

const router = express.Router();

// GET all users
router.get('/', getUsers);

// GET a user by ID
router.get('/:id', getUserById);

// POST a new user
router.post('/', createUser);

// PUT to update an existing user
router.put('/:id', updateUser);

// DELETE a user by ID
router.delete('/:id', deleteUser);

export default router;
