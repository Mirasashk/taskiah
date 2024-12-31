/**
 * Task controller
 * @module controllers/taskController
 */

const { db } = require('../config/firebase');
const Task = require('../models/taskModel');
const Notification = require('../models/notificationModel');

/**
 * Adds a new task to the database
 * @param {Object} task - The task data
 * @returns {Promise<Object>} The task data
 */
async function addTask(task) {
	const taskModel = new Task(task);
	taskModel.validate();
	const notificationModel = new Notification(
		Object.values(task.notifications)[0]
	);
	notificationModel.validate();
	console.log('taskModel', taskModel);
	taskModel.notifications = {
		[notificationModel.type]: notificationModel.toJSON(),
	};

	console.log('taskModel', taskModel);

	try {
		const docRef = await db.collection('tasks').add(taskModel.toJSON());
		console.log('Task added with ID:', docRef.id);
		return docRef.id;
	} catch (error) {
		console.error('Error adding task:', error);
	}
}

/**
 * Retrieves tasks from the database by owner ID
 * @param {string} userId - The ID of the owner to retrieve tasks for
 * @returns {Promise<Array<Object>>} The tasks data
 */
async function getTasks(userId) {
	try {
		const tasksSnapshot = await db
			.collection('tasks')
			.where('ownerId', '==', userId)
			.get();
		const tasks = tasksSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return tasks;
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
	console.log('taskId', taskId);
	console.log('newTaskData', newTaskData);

	try {
		await db.collection('tasks').doc(taskId).update(newTaskData);
		console.log('Task updated successfully.');
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
		console.log('Task deleted successfully.');
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
			console.log('No tasks found to delete.');
			return;
		}

		const deletePromises = querySnapshot.docs.map((doc) =>
			doc.ref.delete()
		);
		await Promise.all(deletePromises);

		console.log('All tasks deleted successfully.');
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
