const { jest } = require('@jest/globals');
const ActivityLog = require('../../models/activityLogModel');

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
					docs: [{ data: () => ({ action: 'created' }) }],
				})),
			})),
		})),
	},
}));

describe('ActivityLog Model', () => {
	const mockActivityLogData = {
		taskId: 'task123',
		userId: 'user123',
		action: 'created',
		timestamp: new Date().toISOString(),
	};

	describe('Constructor and Validation', () => {
		test('should create a valid activity log instance', () => {
			const activityLog = new ActivityLog(mockActivityLogData);
			expect(activityLog.taskId).toBe(mockActivityLogData.taskId);
			expect(activityLog.userId).toBe(mockActivityLogData.userId);
			expect(activityLog.action).toBe(mockActivityLogData.action);
		});

		test('should throw error for missing required fields', () => {
			const invalidData = { action: 'created' };
			const activityLog = new ActivityLog(invalidData);
			expect(() => activityLog.validate()).toThrow('Task ID is required');
		});
	});

	describe('Database Operations', () => {
		test('should create activity log in database', async () => {
			const logId = await ActivityLog.createActivityLog(
				mockActivityLogData
			);
			expect(logId).toBeDefined();
		});

		test('should retrieve activity log from database', async () => {
			const logData = await ActivityLog.getActivityLog('log123');
			expect(logData).toBeDefined();
		});

		test('should get activity logs by task ID', async () => {
			const logs = await ActivityLog.getActivityLogsByTaskId('task123');
			expect(Array.isArray(logs)).toBe(true);
			expect(logs.length).toBeGreaterThan(0);
		});

		test('should get activity logs by user ID', async () => {
			const logs = await ActivityLog.getActivityLogsByUserId('user123');
			expect(Array.isArray(logs)).toBe(true);
		});
	});
});
