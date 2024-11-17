import express from 'express';
import pool from '../models/db';

const router = express.Router();

router.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database connection error');
  }
});

export default router;
