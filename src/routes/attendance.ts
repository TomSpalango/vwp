import express from 'express';
import { getAttendance, getAttendanceById, createAttendance, updateAttendance, deleteAttendance } from '../controllers/attendanceController';

const router = express.Router();

// GET all attendance records
router.get('/', getAttendance);

// GET an attendance record by ID
router.get('/:id', getAttendanceById);

// POST a new attendance record
router.post('/', createAttendance);

// PUT to update an attendance record
router.put('/:id', updateAttendance);

// DELETE an attendance record by ID
router.delete('/:id', deleteAttendance);

export default router;
