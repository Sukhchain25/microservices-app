import express from 'express';
import {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
} from '../controllers/task.controller.js';

const router = express.Router();

// Create a new task
router.post('/', createTask);

// Get all tasks
router.get('/', getAllTasks);

// Get a task by ID
router.get('/:id', getTaskById);

// Update task status
router.patch('/:id', updateTask);

// Delete a task
router.delete('/:id', deleteTask);

export default router;
