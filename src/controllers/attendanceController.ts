import { Request, Response, RequestHandler } from 'express';
import pool from '../models/db';
import { Attendance } from '../models/attendance.model';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET all attendance records
export const getAttendance: RequestHandler = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<Attendance[] & RowDataPacket[]>('SELECT * FROM Attendance');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
};

// GET an attendance record by ID
export const getAttendanceById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query<Attendance[] & RowDataPacket[]>('SELECT * FROM Attendance WHERE attendance_id = ?', [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Attendance record not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance record' });
  }
};

// POST a new attendance record
export const createAttendance: RequestHandler = async (req: Request, res: Response) => {
  const { user_id, event_id } = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO Attendance (user_id, event_id, signup_date) VALUES (?, ?, NOW())',
      [user_id, event_id]
    );
    res.status(201).json({ message: 'Attendance created', attendanceId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create attendance' });
  }
};

// PUT to update an attendance record
export const updateAttendance: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id, event_id } = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE Attendance SET user_id = ?, event_id = ? WHERE attendance_id = ?',
      [user_id, event_id, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Attendance record not found' });
    } else {
      res.json({ message: 'Attendance updated' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update attendance' });
  }
};

// DELETE an attendance record by ID
export const deleteAttendance: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM Attendance WHERE attendance_id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Attendance record not found' });
    } else {
      res.json({ message: 'Attendance deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete attendance' });
  }
};
