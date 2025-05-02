import express from 'express';
import taskRoutes from './routes/task.routes.js';
// import errorHandler from './utils/errorhandler.js';

const app = express();

app.use(express.json());
app.use('/api/tasks', taskRoutes);

// Centralized error handling middleware
// app.use(errorHandler);

export default app;
