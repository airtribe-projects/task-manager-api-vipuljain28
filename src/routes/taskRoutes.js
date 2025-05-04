const express = require('express');
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getTasksByPriority
} = require('../controllers/taskController');
const { validateTask, validateRequest } = require('../utils/validation'); // Import validation functions


const router = express.Router();

// Define routes for task management

function setRoutes(app) {
    router.post('/tasks', validateTask, validateRequest, createTask);
    router.get('/tasks', getTasks);
    router.get('/tasks/:id', getTaskById);
    router.put('/tasks/:id', updateTask);
    router.delete('/tasks/:id', deleteTask);
    router.get('/tasks/priority/:level', getTasksByPriority); // Retrieve tasks by priority level
    app.use('/api', router);
}

module.exports = setRoutes;