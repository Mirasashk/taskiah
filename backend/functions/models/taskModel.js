const { db } = require('../config/firebase');
const Notification = require('./notificationModel');

/**
 * Represents a task in the system
 * @class Task
 */
class Task {
	/**
	 * Creates a new Task instance
	 * @param {Object} data - The task data
	 * @param {string} data.title - The title of the task
	 * @param {string} [data.description] - The description of the task
	 * @param {('active'|'completed')} [data.status='incomplete'] - The status of the task
	 * @param {string} [data.category] - The category of the task
	 * @param {('low'|'medium'|'high')} data.priority - The priority level of the task
	 * @param {string} [data.dueDate] - The due date of the task in ISO string format
	 * @param {string} data.ownerId - The ID of the task owner
	 * @param {string[]} [data.sharedWith=[]] - Array of user IDs the task is shared with
	 * @param {Object} [data.notifications={}] - Notification settings for the task
	 */
	constructor(data) {
		this.title = data.title;
		this.description = data.description;
		this.status = data.status || 'incomplete';
		this.category = data.category;
		this.priority = data.priority;
		this.dueDate = data.dueDate;
		this.createdAt = data.createdAt || new Date().toISOString();
		this.updatedAt = data.updatedAt || new Date().toISOString();
		this.ownerId = data.ownerId;
		this.sharedWith = data.sharedWith || [];
		this.notifications = data.notifications || {};
	}

	/**
	 * Validates the task data
	 * @throws {Error} If validation fails
	 * @returns {boolean} Returns true if validation passes
	 */
	validate() {
		// Required fields validation
		if (!this.title) throw new Error('Title is required');
		if (!this.ownerId) throw new Error('Owner ID is required');

		// Enum validations
		const validStatuses = ['active', 'completed'];
		const validPriorities = ['low', 'medium', 'high'];

		if (!validStatuses.includes(this.status)) {
			throw new Error('Invalid status value');
		}

		if (!validPriorities.includes(this.priority)) {
			throw new Error('Invalid priority value');
		}

		// Validate sharedWith array
		if (!Array.isArray(this.sharedWith)) {
			throw new Error('sharedWith must be an array');
		}

		return true;
	}

	/**
	 * Converts the task instance to a plain object
	 * @returns {Object} The task data as a plain object
	 */
	toJSON() {
		return {
			title: this.title,
			description: this.description,
			status: this.status,
			category: this.category,
			priority: this.priority,
			dueDate: this.dueDate,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			ownerId: this.ownerId,
			sharedWith: this.sharedWith,
			notifications: this.notifications,
		};
	}

	/**
	 * Creates a new task in the database
	 * @param {Object} taskData - The task data
	 * @returns {Promise<string>} The ID of the created task
	 */
	static async createTask(taskData) {
		const task = new Task(taskData);
		const notification = new Notification(
			Object.values(taskData.notifications)[0]
		);
		await notification.validate();
		task.notifications = {
			notification: notification.toJSON(),
		};
		await task.validate();
		const taskRef = db.collection('tasks').doc();
		await taskRef.set(task.toJSON());
		const taskDoc = await taskRef.get();
		return taskDoc.data();
	}

	/**
	 * Retrieves a task from the database by its ID
	 * @param {string} taskId - The ID of the task to retrieve
	 * @returns {Promise<Object>} The task data
	 */
	static async getTask(taskId) {
		const taskRef = db.collection('tasks').doc(taskId);
		const task = await taskRef.get();
		return task.data();
	}

	/**
	 * Updates a task in the database
	 * @param {string} taskId - The ID of the task to update
	 * @param {Object} taskData - The updated task data
	 * @returns {Promise<void>}
	 */
	static async updateTask(taskId, taskData) {
		const task = new Task(taskData);
		await task.validate();
		const taskRef = db.collection('tasks').doc(taskId);
		await taskRef.update(task.toJSON());
	}

	/**
	 * Deletes a task from the database
	 * @param {string} taskId - The ID of the task to delete
	 * @returns {Promise<void>}
	 */
	static async deleteTask(taskId) {
		const taskRef = db.collection('tasks').doc(taskId);
		await taskRef.delete();
	}

	/**
	 * Retrieves tasks from the database by owner ID
	 * @param {string} ownerId - The ID of the owner to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksByOwnerId(ownerId) {
		const tasksRef = db.collection('tasks').where('ownerId', '==', ownerId);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves tasks from the database by tag ID
	 * @param {string} tagId - The ID of the tag to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksByTagId(tagId) {
		const tasksRef = db.collection('tasks').where('tagId', '==', tagId);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves tasks from the database by shared with
	 * @param {string} sharedWith - The ID of the shared with to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksBySharedWith(sharedWith) {
		const tasksRef = db
			.collection('tasks')
			.where('sharedWith', '==', sharedWith);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves tasks from the database by notification
	 * @param {string} notification - The notification to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksByNotification(notification) {
		const tasksRef = db
			.collection('tasks')
			.where('notifications', '==', notification);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves tasks from the database by due date
	 * @param {string} dueDate - The due date to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksByDueDate(dueDate) {
		const tasksRef = db.collection('tasks').where('dueDate', '==', dueDate);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves tasks from the database by status
	 * @param {string} status - The status to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksByStatus(status) {
		const tasksRef = db.collection('tasks').where('status', '==', status);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves tasks from the database by category
	 * @param {string} category - The category to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksByCategory(category) {
		const tasksRef = db
			.collection('tasks')
			.where('category', '==', category);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves tasks from the database by priority
	 * @param {string} priority - The priority to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksByPriority(priority) {
		const tasksRef = db
			.collection('tasks')
			.where('priority', '==', priority);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves tasks from the database by title
	 * @param {string} title - The title to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksByTitle(title) {
		const tasksRef = db.collection('tasks').where('title', '==', title);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves tasks from the database by description
	 * @param {string} description - The description to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksByDescription(description) {
		const tasksRef = db
			.collection('tasks')
			.where('description', '==', description);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves tasks from the database by createdAt
	 * @param {string} createdAt - The createdAt to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksByCreatedAt(createdAt) {
		const tasksRef = db
			.collection('tasks')
			.where('createdAt', '==', createdAt);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves tasks from the database by updatedAt
	 * @param {string} updatedAt - The updatedAt to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksByUpdatedAt(updatedAt) {
		const tasksRef = db
			.collection('tasks')
			.where('updatedAt', '==', updatedAt);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves tasks from the database by owner ID and tag ID
	 * @param {string} ownerId - The ID of the owner to retrieve tasks for
	 * @param {string} tagId - The ID of the tag to retrieve tasks for
	 * @returns {Promise<Array<Object>>} The tasks data
	 */
	static async getTasksByOwnerIdAndTagId(ownerId, tagId) {
		const tasksRef = db
			.collection('tasks')
			.where('ownerId', '==', ownerId)
			.where('tagId', '==', tagId);
		const tasks = await tasksRef.get();
		return tasks.docs.map((doc) => doc.data());
	}
}

module.exports = Task;
