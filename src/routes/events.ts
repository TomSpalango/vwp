import express from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventsController';

const router = express.Router();

// GET all events
router.get('/', getEvents);

// GET an event by ID
router.get('/:id', getEventById);

// POST a new event
router.post('/', createEvent);

// PUT to update an existing event
router.put('/:id', updateEvent);

// DELETE an event by ID
router.delete('/:id', deleteEvent);

export default router;