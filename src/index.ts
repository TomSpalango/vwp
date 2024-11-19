import express from 'express';
import dotenv from 'dotenv';
import dbRoutes from './routes/index';
import userRoutes from './routes/users';
import eventsRoutes from './routes/events';
import attendanceRoutes from './routes/attendance';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', dbRoutes); // Routes in dbRoutes prefixed with /api
app.use('/api/users', userRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/attendance', attendanceRoutes);

app.get('/', (req, res) => {
  res.send('You have reached the VolunteerWithPurpose API.');
});

app.listen(PORT, () => {
  console.log(`[SERVER] Now running and listening on port ${PORT}`);
});

export default app;
