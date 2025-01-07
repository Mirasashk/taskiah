const Notification = require('../../models/notificationModel');

// Create chainable mock functions
const mockDoc = {
	id: 'notification123',
	set: jest.fn().mockResolvedValue(),
	get: jest.fn().mockResolvedValue({
		id: 'notification123',
		data: () => ({ message: 'Test Notification' }),
	}),
	update: jest.fn().mockResolvedValue(),
	delete: jest.fn().mockResolvedValue(),
};

const mockWhere = {
	get: jest.fn().mockResolvedValue({
		docs: [
			{
				id: 'notification123',
				data: () => ({ type: 'reminder' }),
			},
		],
	}),
	where: jest.fn().mockReturnThis(),
};

const mockCollection = {
	doc: jest.fn(() => mockDoc),
	where: jest.fn(() => mockWhere),
};

// Mock Firebase
jest.mock('../../config/firebase', () => ({
	db: {
		collection: jest.fn(() => mockCollection),
	},
}));

const { db } = require('../../config/firebase');

describe('Notification Model', () => {
	const mockNotificationData = {
		message: 'Test notification',
		type: 'reminder',
		status: 'unread',
		notifyOn: new Date().toISOString(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('Constructor and Validation', () => {
		test('should create a valid notification instance', () => {
			const notification = new Notification(mockNotificationData);
			expect(notification.message).toBe(mockNotificationData.message);
			expect(notification.type).toBe(mockNotificationData.type);
			expect(notification.status).toBe(mockNotificationData.status);
		});

		test('should throw error for missing required fields', () => {
			const invalidData = { status: 'unread' };
			const notification = new Notification(invalidData);
			expect(() => notification.validate()).toThrow(
				'Message is required'
			);
		});

		test('should throw error for invalid type', () => {
			const invalidData = {
				...mockNotificationData,
				type: 'invalid',
			};
			const notification = new Notification(invalidData);
			expect(() => notification.validate()).toThrow(
				'Type must be important, reminder, or dueDate'
			);
		});

		test('should throw error for invalid status', () => {
			const invalidData = {
				...mockNotificationData,
				status: 'invalid',
			};
			const notification = new Notification(invalidData);
			expect(() => notification.validate()).toThrow(
				'Status must be unread, read, or archived'
			);
		});
	});

	describe('Database Operations', () => {
		test('should create notification in database', async () => {
			const notificationId = await Notification.createNotification(
				mockNotificationData
			);
			expect(notificationId).toBe('notification123');
			expect(db.collection).toHaveBeenCalledWith('notifications');
			expect(mockDoc.set).toHaveBeenCalledWith(
				expect.objectContaining({
					message: mockNotificationData.message,
					type: mockNotificationData.type,
					status: mockNotificationData.status,
				})
			);
		});

		test('should retrieve notification from database', async () => {
			const notificationData = await Notification.getNotification(
				'notification123'
			);
			expect(notificationData).toBeDefined();
			expect(db.collection).toHaveBeenCalledWith('notifications');
			expect(mockCollection.doc).toHaveBeenCalledWith('notification123');
		});

		test('should update notification in database', async () => {
			await expect(
				Notification.updateNotification(
					'notification123',
					mockNotificationData
				)
			).resolves.not.toThrow();
			expect(db.collection).toHaveBeenCalledWith('notifications');
			expect(mockCollection.doc).toHaveBeenCalledWith('notification123');
			expect(mockDoc.update).toHaveBeenCalled();
		});

		test('should delete notification from database', async () => {
			await expect(
				Notification.deleteNotification('notification123')
			).resolves.not.toThrow();
			expect(db.collection).toHaveBeenCalledWith('notifications');
			expect(mockCollection.doc).toHaveBeenCalledWith('notification123');
			expect(mockDoc.delete).toHaveBeenCalled();
		});

		test('should get notifications by user', async () => {
			const notifications = await Notification.getNotificationsByUserId(
				'user123'
			);
			expect(notifications).toBeDefined();
			expect(Array.isArray(notifications)).toBe(true);
			expect(db.collection).toHaveBeenCalledWith('notifications');
			expect(mockCollection.where).toHaveBeenCalledWith(
				'userId',
				'==',
				'user123'
			);
		});
	});
});
