/**
 * Task controller
 * @module controllers/taskController
 */

const { db } = require('../config/firebase');
const Task = require('../models/taskModel');

/**
 * Adds a new task to the database
 * @param {Object} task - The task data
 * @returns {Promise<Object>} The task data
 */
async function addTask(task, res) {
	try {
		const taskData = await Task.createTask(task);
		return res.json(taskData);
	} catch (error) {
		console.error('Error adding task:', error);
	}
}

/**
 * Retrieves tasks from the database by owner ID
 * @param {string} userId - The ID of the owner to retrieve tasks for
 * @param {Object} res - The response object
 * @returns {Promise<Array<Object>>} The tasks data
 */
async function getTasks(userId, res) {
	try {
		const tasks = await Task.getAllTasksByUserId(userId);
		return res.json(tasks);
	} catch (error) {
		console.error('Error getting tasks:', error);
	}
}

/**
 * Updates a task in the database
 * @param {string} taskId - The ID of the task to update
 * @param {Object} newTaskData - The updated task data
 * @returns {Promise<void>}
 */
async function updateTask(taskId, newTaskData) {
	try {
		await db.collection('tasks').doc(taskId).update(newTaskData);
	} catch (error) {
		console.error('Error updating task:', error);
	}
}

/**
 * Deletes a task from the database
 * @param {string} taskId - The ID of the task to delete
 * @returns {Promise<void>}
 */
async function deleteTask(taskId) {
	try {
		await db.collection('tasks').doc(taskId).delete();
	} catch (error) {
		console.error('Error deleting task:', error);
	}
}

/**
 * Deletes all tasks from the database by owner ID
 * @param {string} userId - The ID of the owner to delete tasks for
 * @returns {Promise<void>}
 */
async function deleteAllTasks(userId) {
	try {
		const querySnapshot = await db
			.collection('tasks')
			.where('ownerId', '==', userId)
			.where('status', '==', 'deleted')
			.get();

		if (querySnapshot.empty) {
			return;
		}

		const deletePromises = querySnapshot.docs.map((doc) =>
			doc.ref.delete()
		);
		await Promise.all(deletePromises);
	} catch (error) {
		console.error('Error deleting all tasks:', error);
	}
}

module.exports = {
	addTask,
	getTasks,
	updateTask,
	deleteTask,
	deleteAllTasks,
};
