/**
 * Task routes
 * @module routes/taskRoutes
 */

const express = require('express');
const router = express.Router();
const {
	addTask,
	getTasks,
	getTaskById,
	deleteTask,
	updateTask,
	deleteAllTasks,
} = require('../controllers/taskController');

/**
 * Routes
 * @type {import('express').Router}
 */
router.post('/', async (req, res) => {
	await addTask(req.body, res);
});

router.get('/', async (req, res) => {
	const userId = req.query.userId;
	await getTasks(userId, res);
});

router.get('/:id', async (req, res) => {
	const taskId = req.params.id;
	const task = await getTaskById(taskId);
	res.json(task);
});

router.delete('/:id', async (req, res) => {
	const taskId = req.params.id;
	await deleteTask(taskId);
	res.send('Task deleted!');
});

router.put('/:id', async (req, res) => {
	const taskId = req.params.id;
	const newTaskData = req.body;
	await updateTask(taskId, newTaskData);
	res.send('Task updated!');
});

router.delete('/', async (req, res) => {
	const userId = req.query.userId;
	await deleteAllTasks(userId);
	res.send('All tasks deleted!');
});

module.exports = router;
