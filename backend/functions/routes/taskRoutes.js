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
router.post('/add', async (req, res) => {
	const task = req.body;
	const newTask = {
		id: await addTask(task),
		...task,
	};
	console.log('newTask', newTask);
	res.json(newTask);
});

router.get('/:userId', async (req, res) => {
	const userId = req.params.userId;
	const tasks = await getTasks(userId);
	res.json(tasks);
});

router.get('/:taskId', async (req, res) => {
	const taskId = req.params.taskId;
	const task = await getTaskById(taskId);
	res.json(task);
});

router.delete('/:taskId', async (req, res) => {
	const taskId = req.params.taskId;
	await deleteTask(taskId);
	res.send('Task deleted!');
});

router.put('/:taskId', async (req, res) => {
	const taskId = req.params.taskId;
	const newTaskData = req.body;
	console.log('newTaskData', newTaskData);
	await updateTask(taskId, newTaskData);
	res.send('Task updated!');
});

router.delete('/all/:userId', async (req, res) => {
	const userId = req.params.userId;
	await deleteAllTasks(userId);
	res.send('All tasks deleted!');
});

module.exports = router;
