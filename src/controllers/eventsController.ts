import { Request, Response, RequestHandler } from 'express';
import pool from '../models/db';
import { Event } from '../models/event.model';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET all events
export const getEvents: RequestHandler = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<Event[] & RowDataPacket[]>('SELECT * FROM Events');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// GET an event by ID
export const getEventById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query<Event[] & RowDataPacket[]>('SELECT * FROM Events WHERE event_id = ?', [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// POST a new event
export const createEvent: RequestHandler = async (req: Request, res: Response) => {
  const { title, description, location, event_date } = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO Events (title, description, location, event_date) VALUES (?, ?, ?, ?)',
      [title, description, location, event_date]
    );
    res.status(201).json({ message: 'Event created', eventId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// PUT to update an existing event
export const updateEvent: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, location, event_date } = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE Events SET title = ?, description = ?, location = ?, event_date = ? WHERE event_id = ?',
      [title, description, location, event_date, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json({ message: 'Event updated' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// DELETE an event by ID
export const deleteEvent: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM Events WHERE event_id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json({ message: 'Event deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};