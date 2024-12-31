const { jest } = require('@jest/globals');
const Notification = require('../../models/notificationModel');

// Mock Firebase
jest.mock('../../config/firebase', () => ({
	db: {
		collection: jest.fn(() => ({
			doc: jest.fn(() => ({
				set: jest.fn(),
				get: jest.fn(),
				update: jest.fn(),
				delete: jest.fn(),
			})),
			where: jest.fn(() => ({
				get: jest.fn(() => ({
					docs: [{ data: () => ({ message: 'Test Notification' }) }],
				})),
			})),
		})),
	},
}));

describe('Notification Model', () => {
	const mockNotificationData = {
		message: 'Test notification',
		type: 'important',
		status: 'unread',
		notifyOn: new Date().toISOString(),
	};

	describe('Constructor and Validation', () => {
		test('should create a valid notification instance', () => {
			const notification = new Notification(mockNotificationData);
			expect(notification.message).toBe(mockNotificationData.message);
			expect(notification.type).toBe(mockNotificationData.type);
			expect(notification.status).toBe(mockNotificationData.status);
		});

		test('should throw error for missing required fields', () => {
			const invalidData = { type: 'important' };
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
			expect(notificationId).toBeDefined();
		});

		test('should retrieve notification from database', async () => {
			const notificationData = await Notification.getNotification(
				'notification123'
			);
			expect(notificationData).toBeDefined();
		});

		test('should get notifications by status', async () => {
			const notifications = await Notification.getNotificationsByStatus(
				'unread'
			);
			expect(Array.isArray(notifications)).toBe(true);
		});

		test('should get notifications by type', async () => {
			const notifications = await Notification.getNotificationsByType(
				'important'
			);
			expect(Array.isArray(notifications)).toBe(true);
		});
	});
});
