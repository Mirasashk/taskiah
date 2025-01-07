const ActivityLog = require('../../models/activityLogModel');

// Create chainable mock functions
const mockDoc = {
	id: 'log123',
	set: jest.fn().mockResolvedValue(),
	get: jest.fn().mockResolvedValue({
		id: 'log123',
		data: () => ({ action: 'created' }),
	}),
	update: jest.fn().mockResolvedValue(),
	delete: jest.fn().mockResolvedValue(),
};

const mockWhere = {
	get: jest.fn().mockResolvedValue({
		docs: [
			{
				id: 'log123',
				data: () => ({ action: 'created' }),
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

describe('ActivityLog Model', () => {
	const mockActivityLogData = {
		taskId: 'task123',
		userId: 'user123',
		action: 'created',
		timestamp: new Date().toISOString(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('Constructor and Validation', () => {
		test('should create a valid activity log instance', () => {
			const log = new ActivityLog(mockActivityLogData);
			expect(log.taskId).toBe(mockActivityLogData.taskId);
			expect(log.userId).toBe(mockActivityLogData.userId);
			expect(log.action).toBe(mockActivityLogData.action);
			expect(log.timestamp).toBe(mockActivityLogData.timestamp);
		});

		test('should throw error for missing required fields', () => {
			const invalidData = { action: 'created' };
			const log = new ActivityLog(invalidData);
			expect(() => log.validate()).toThrow('Task ID is required');
		});

		test('should throw error for missing user ID', () => {
			const invalidData = {
				taskId: 'task123',
				action: 'created',
				timestamp: new Date().toISOString(),
			};
			const log = new ActivityLog(invalidData);
			expect(() => log.validate()).toThrow('User ID is required');
		});

		test('should throw error for missing action', () => {
			const invalidData = {
				taskId: 'task123',
				userId: 'user123',
				timestamp: new Date().toISOString(),
			};
			const log = new ActivityLog(invalidData);
			expect(() => log.validate()).toThrow('Action is required');
		});

		test('should throw error for missing timestamp', () => {
			const invalidData = {
				taskId: 'task123',
				userId: 'user123',
				action: 'created',
			};
			const log = new ActivityLog(invalidData);
			expect(() => log.validate()).toThrow('Timestamp is required');
		});
	});

	describe('Database Operations', () => {
		test('should create activity log in database', async () => {
			const logId = await ActivityLog.createActivityLog(
				mockActivityLogData
			);
			expect(logId).toBe('log123');
			expect(db.collection).toHaveBeenCalledWith('activityLogs');
			expect(mockDoc.set).toHaveBeenCalledWith(
				expect.objectContaining({
					taskId: mockActivityLogData.taskId,
					userId: mockActivityLogData.userId,
					action: mockActivityLogData.action,
				})
			);
		});

		test('should retrieve activity log from database', async () => {
			const logData = await ActivityLog.getActivityLog('log123');
			expect(logData).toBeDefined();
			expect(db.collection).toHaveBeenCalledWith('activityLogs');
			expect(mockCollection.doc).toHaveBeenCalledWith('log123');
		});

		test('should update activity log in database', async () => {
			await expect(
				ActivityLog.updateActivityLog('log123', mockActivityLogData)
			).resolves.not.toThrow();
			expect(db.collection).toHaveBeenCalledWith('activityLogs');
			expect(mockCollection.doc).toHaveBeenCalledWith('log123');
			expect(mockDoc.update).toHaveBeenCalled();
		});

		test('should delete activity log from database', async () => {
			await expect(
				ActivityLog.deleteActivityLog('log123')
			).resolves.not.toThrow();
			expect(db.collection).toHaveBeenCalledWith('activityLogs');
			expect(mockCollection.doc).toHaveBeenCalledWith('log123');
			expect(mockDoc.delete).toHaveBeenCalled();
		});

		test('should get activity logs by task ID', async () => {
			const logs = await ActivityLog.getActivityLogsByTaskId('task123');
			expect(logs).toBeDefined();
			expect(Array.isArray(logs)).toBe(true);
			expect(db.collection).toHaveBeenCalledWith('activityLogs');
			expect(mockCollection.where).toHaveBeenCalledWith(
				'taskId',
				'==',
				'task123'
			);
		});

		test('should get activity logs by user ID', async () => {
			const logs = await ActivityLog.getActivityLogsByUserId('user123');
			expect(logs).toBeDefined();
			expect(Array.isArray(logs)).toBe(true);
			expect(db.collection).toHaveBeenCalledWith('activityLogs');
			expect(mockCollection.where).toHaveBeenCalledWith(
				'userId',
				'==',
				'user123'
			);
		});

		test('should get activity logs by action', async () => {
			const logs = await ActivityLog.getActivityLogsByAction('created');
			expect(logs).toBeDefined();
			expect(Array.isArray(logs)).toBe(true);
			expect(db.collection).toHaveBeenCalledWith('activityLogs');
			expect(mockCollection.where).toHaveBeenCalledWith(
				'action',
				'==',
				'created'
			);
		});
	});
});
