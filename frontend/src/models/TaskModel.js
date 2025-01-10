import { db } from '../config/firebase';
import {
	doc,
	setDoc,
	addDoc,
	collection,
	query,
	where,
	onSnapshot,
	updateDoc,
	arrayUnion,
} from 'firebase/firestore';
import Notification from './NotificationModel';

/**
 * Represents a task in the system
 * @class Task
 * @method createTask
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
	 * @param {string} data.listId - The ID of the list the task belongs to
	 * @param {string} data.ownerId - The ID of the task owner
	 * @param {string[]} [data.sharedWith=[]] - Array of user IDs the task is shared with
	 * @param {Object} [data.notifications={}] - Notification settings for the task
	 * @param {string[]} [data.tags=[]] - Array of tag IDs the task is associated with
	 */
	constructor(data) {
		this.title = data.title;
		this.description = data.description;
		this.status = data.status || 'incomplete';
		this.category = data.category;
		this.priority = data.priority;
		this.dueDate = data.dueDate;
		this.listId = data.listId;
		this.tagIds = data.tags || [];
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

		if (!this.listId) {
			throw new Error('List ID is required');
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
			listId: this.listId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			tagIds: this.tagIds,
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
		await task.validate();

		const docRef = await addDoc(collection(db, 'tasks'), task.toJSON());
		// add task to list
		const listRef = doc(db, 'lists', task.listId);

		await updateDoc(listRef, {
			tasks: arrayUnion(docRef.id),
		});

		return docRef.id;
	}
}

export default Task;
