const { db } = require('../config/firebase');

/**
 * Represents an activity log entry in the system
 * @class ActivityLog
 */
class ActivityLog {
	/**
	 * Creates a new ActivityLog instance
	 * @param {Object} data - The activity log data
	 * @param {string} data.taskId - The ID of the task this activity is related to
	 * @param {string} data.userId - The ID of the user who performed the action
	 * @param {string} data.action - The action that was performed
	 * @param {string} data.timestamp - The timestamp of when the action occurred
	 */
	constructor(data) {
		this.taskId = data.taskId;
		this.userId = data.userId;
		this.action = data.action;
		this.timestamp = data.timestamp;
	}

	/**
	 * Validates the activity log data
	 * @throws {Error} If validation fails
	 */
	validate() {
		if (!this.taskId) throw new Error('Task ID is required');
		if (!this.userId) throw new Error('User ID is required');
		if (!this.action) throw new Error('Action is required');
		if (!this.timestamp) throw new Error('Timestamp is required');
	}

	/**
	 * Converts the activity log instance to a plain object
	 * @returns {Object} The activity log data as a plain object
	 */
	toJSON() {
		return {
			taskId: this.taskId,
			userId: this.userId,
			action: this.action,
			timestamp: this.timestamp,
		};
	}

	/**
	 * Creates a new activity log in the database
	 * @param {Object} activityLogData - The activity log data
	 * @returns {Promise<string>} The ID of the created activity log
	 */
	static async createActivityLog(activityLogData) {
		const activityLog = new ActivityLog(activityLogData);
		await activityLog.validate();
		const activityLogRef = db.collection('activityLogs').doc();
		await activityLogRef.set(activityLog.toJSON());
		return activityLogRef.id;
	}

	/**
	 * Retrieves an activity log from the database by its ID
	 * @param {string} activityLogId - The ID of the activity log to retrieve
	 * @returns {Promise<Object>} The activity log data
	 */
	static async getActivityLog(activityLogId) {
		const activityLogRef = db.collection('activityLogs').doc(activityLogId);
		const activityLog = await activityLogRef.get();
		return activityLog.data();
	}

	/**
	 * Updates an activity log in the database
	 * @param {string} activityLogId - The ID of the activity log to update
	 * @param {Object} activityLogData - The updated activity log data
	 * @returns {Promise<void>}
	 */
	static async updateActivityLog(activityLogId, activityLogData) {
		const activityLog = new ActivityLog(activityLogData);
		await activityLog.validate();
		const activityLogRef = db.collection('activityLogs').doc(activityLogId);
		await activityLogRef.update(activityLog.toJSON());
	}

	/**
	 * Deletes an activity log from the database
	 * @param {string} activityLogId - The ID of the activity log to delete
	 * @returns {Promise<void>}
	 */
	static async deleteActivityLog(activityLogId) {
		const activityLogRef = db.collection('activityLogs').doc(activityLogId);
		await activityLogRef.delete();
	}

	/**
	 * Retrieves activity logs from the database by task ID
	 * @param {string} taskId - The ID of the task to retrieve activity logs for
	 * @returns {Promise<Array<Object>>} The activity logs data
	 */
	static async getActivityLogsByTaskId(taskId) {
		const activityLogsRef = db
			.collection('activityLogs')
			.where('taskId', '==', taskId);
		const activityLogs = await activityLogsRef.get();
		return activityLogs.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves activity logs from the database by user ID
	 * @param {string} userId - The ID of the user to retrieve activity logs for
	 * @returns {Promise<Array<Object>>} The activity logs data
	 */
	static async getActivityLogsByUserId(userId) {
		const activityLogsRef = db
			.collection('activityLogs')
			.where('userId', '==', userId);
		const activityLogs = await activityLogsRef.get();
		return activityLogs.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves activity logs from the database by action
	 * @param {string} action - The action to retrieve activity logs for
	 * @returns {Promise<Array<Object>>} The activity logs data
	 */
	static async getActivityLogsByAction(action) {
		const activityLogsRef = db
			.collection('activityLogs')
			.where('action', '==', action);
		const activityLogs = await activityLogsRef.get();
		return activityLogs.docs.map((doc) => doc.data());
	}

	/**
	 * Retrieves activity logs from the database by timestamp
	 * @param {string} timestamp - The timestamp to retrieve activity logs for
	 * @returns {Promise<Array<Object>>} The activity logs data
	 */
	static async getActivityLogsByTimestamp(timestamp) {
		const activityLogsRef = db
			.collection('activityLogs')
			.where('timestamp', '==', timestamp);
		const activityLogs = await activityLogsRef.get();
		return activityLogs.docs.map((doc) => doc.data());
	}
}

module.exports = ActivityLog;
