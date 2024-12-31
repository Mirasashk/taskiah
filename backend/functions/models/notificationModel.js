const { db } = require('../config/firebase');

/**
 * Represents a notification in the system
 * @class Notification
 */
class Notification {
	/**
	 * Creates a new Notification instance
	 * @param {Object} data - The notification data
	 * @param {string} data.message - The notification message
	 * @param {('important'|'reminder'|'dueDate')} data.type - The type of notification
	 * @param {('unread'|'read'|'archived')} [data.status='unread'] - The status of the notification
	 * @param {string} [data.createdAt] - Creation timestamp
	 * @param {string} [data.notifyOn] - When to send the notification
	 * @param {string} [data.updatedAt] - Last update timestamp
	 */
	constructor(data) {
		this.message = data.message;
		this.type = data.type;
		this.status = data.status || 'unread';
		this.createdAt = data.createdAt || new Date().toISOString();
		this.notifyOn = data.notifyOn || new Date().toISOString();
		this.updatedAt = data.updatedAt || new Date().toISOString();
	}

	/**
	 * Validates the notification data
	 * @throws {Error} If validation fails
	 */
	validate() {
		if (!this.message) throw new Error('Message is required');
		if (!['important', 'reminder', 'dueDate'].includes(this.type))
			throw new Error('Type must be important, reminder, or dueDate');
		if (!['unread', 'read', 'archived'].includes(this.status))
			throw new Error('Status must be unread, read, or archived');
	}

	/**
	 * Converts the notification instance to a plain object
	 * @returns {Object} The notification data as a plain object
	 */
	toJSON() {
		return {
			message: this.message,
			type: this.type,
			status: this.status,
			createdAt: this.createdAt,
			notifyOn: this.notifyOn,
			updatedAt: this.updatedAt,
		};
	}

	/**
	 * Creates a new notification in the database
	 * @param {Object} notificationData - The notification data
	 * @returns {Promise<string>} The ID of the created notification
	 */
	static async createNotification(notificationData) {
		const notification = new Notification(notificationData);
		await notification.validate();
		const notificationRef = db.collection('notifications').doc();
		await notificationRef.set(notification.toJSON());
		return notificationRef.id;
	}

	/**
	 * Retrieves a notification from the database by its ID
	 * @param {string} notificationId - The ID of the notification to retrieve
	 * @returns {Promise<Object>} The notification data
	 */
	static async getNotification(notificationId) {
		const notificationRef = db
			.collection('notifications')
			.doc(notificationId);
		const notification = await notificationRef.get();
		return notification.data();
	}

	/**
	 * Updates a notification in the database
	 * @param {string} notificationId - The ID of the notification to update
	 * @param {Object} notificationData - The updated notification data
	 * @returns {Promise<void>}
	 */
	static async updateNotification(notificationId, notificationData) {
		const notification = new Notification(notificationData);
		await notification.validate();
		const notificationRef = db
			.collection('notifications')
			.doc(notificationId);
		await notificationRef.update(notification.toJSON());
	}

	/**
	 * Deletes a notification from the database
	 * @param {string} notificationId - The ID of the notification to delete
	 * @returns {Promise<void>}
	 */
	static async deleteNotification(notificationId) {
		const notificationRef = db
			.collection('notifications')
			.doc(notificationId);
		await notificationRef.delete();
	}

	/**
	 * Retrieves notifications from the database by user ID
	 * @param {string} userId - The ID of the user to retrieve notifications for
	 * @returns {Promise<Array<Object>>} The notifications data
	 */
	static async getNotificationsByUserId(userId) {
		const notificationsRef = db
			.collection('notifications')
			.where('userId', '==', userId);
		const notifications = await notificationsRef.get();
		return notifications.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves notifications from the database by task ID
	 * @param {string} taskId - The ID of the task to retrieve notifications for
	 * @returns {Promise<Array<Object>>} The notifications data
	 */
	static async getNotificationsByTaskId(taskId) {
		const notificationsRef = db
			.collection('notifications')
			.where('taskId', '==', taskId);
		const notifications = await notificationsRef.get();
		return notifications.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves notifications from the database by type
	 * @param {string} type - The type of notification to retrieve
	 * @returns {Promise<Array<Object>>} The notifications data
	 */
	static async getNotificationsByType(type) {
		const notificationsRef = db
			.collection('notifications')
			.where('type', '==', type);
		const notifications = await notificationsRef.get();
		return notifications.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves notifications from the database by status
	 * @param {string} status - The status of the notification to retrieve
	 * @returns {Promise<Array<Object>>} The notifications data
	 */
	static async getNotificationsByStatus(status) {
		const notificationsRef = db
			.collection('notifications')
			.where('status', '==', status);
		const notifications = await notificationsRef.get();
		return notifications.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves notifications from the database by notifyOn
	 * @param {string} notifyOn - The notifyOn to retrieve notifications for
	 * @returns {Promise<Array<Object>>} The notifications data
	 */
	static async getNotificationsByNotifyOn(notifyOn) {
		const notificationsRef = db
			.collection('notifications')
			.where('notifyOn', '==', notifyOn);
		const notifications = await notificationsRef.get();
		return notifications.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves notifications from the database by createdAt
	 * @param {string} createdAt - The createdAt to retrieve notifications for
	 * @returns {Promise<Array<Object>>} The notifications data
	 */
	static async getNotificationsByCreatedAt(createdAt) {
		const notificationsRef = db
			.collection('notifications')
			.where('createdAt', '==', createdAt);
		const notifications = await notificationsRef.get();
		return notifications.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves notifications from the database by updatedAt
	 * @param {string} updatedAt - The updatedAt to retrieve notifications for
	 * @returns {Promise<Array<Object>>} The notifications data
	 */
	static async getNotificationsByUpdatedAt(updatedAt) {
		const notificationsRef = db
			.collection('notifications')
			.where('updatedAt', '==', updatedAt);
		const notifications = await notificationsRef.get();
		return notifications.docs.map((doc) => doc.data());
	}
}

module.exports = Notification;
