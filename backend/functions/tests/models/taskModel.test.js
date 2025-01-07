const Task = require('../../models/taskModel');

// Mock Firebase
jest.mock('../../config/firebase', () => ({
	db: {
		collection: jest.fn(() => ({
			doc: jest.fn(() => ({
				set: jest.fn().mockResolvedValue(),
				get: jest.fn().mockResolvedValue({
					id: 'task123',
					data: () => ({ title: 'Test Task' }),
				}),
				update: jest.fn().mockResolvedValue(),
				delete: jest.fn().mockResolvedValue(),
			})),
			where: jest.fn(() => ({
				get: jest.fn().mockResolvedValue({
					docs: [
						{
							id: 'task123',
							data: () => ({ title: 'Test Task' }),
						},
					],
				}),
			})),
		})),
		runTransaction: jest.fn(async (callback) => {
			const mockTransaction = {
				get: jest.fn().mockResolvedValue({
					exists: true,
					data: () => ({ tasks: [] }),
				}),
				update: jest.fn(),
				set: jest.fn(),
			};
			return callback(mockTransaction);
		}),
	},
}));

describe('Task Model', () => {
	const mockTaskData = {
		title: 'Test Task',
		description: 'Test Description',
		status: 'active',
		priority: 'medium',
		ownerId: 'user123',
		dueDate: '2024-03-20T00:00:00.000Z',
		notifications: {
			reminder: {
				message: 'Test Message',
				type: 'reminder',
				status: 'unread',
				notifyOn: '2024-03-20T00:00:00.000Z',
			},
		},
		listId: 'list123',
	};

	describe('Constructor and Validation', () => {
		test('should create a valid task instance', () => {
			const task = new Task(mockTaskData);
			expect(task.title).toBe(mockTaskData.title);
			expect(task.description).toBe(mockTaskData.description);
			expect(task.status).toBe(mockTaskData.status);
		});

		test('should throw error for missing required fields', () => {
			const invalidData = { description: 'Test' };
			const task = new Task(invalidData);
			expect(() => task.validate()).toThrow('Title is required');
		});

		test('should throw error for invalid status', () => {
			const invalidData = {
				...mockTaskData,
				status: 'invalid',
			};
			const task = new Task(invalidData);
			expect(() => task.validate()).toThrow('Invalid status value');
		});
	});

	describe('Database Operations', () => {
		test('should create task in database', async () => {
			const taskId = await Task.createTask(mockTaskData);
			expect(taskId).toBeDefined();
		});

		test('should retrieve task from database', async () => {
			const taskData = await Task.getTask('task123');
			expect(taskData).toBeDefined();
		});

		test('should update task in database', async () => {
			await expect(
				Task.updateTask('task123', mockTaskData)
			).resolves.not.toThrow();
		});

		test('should delete task from database', async () => {
			await expect(Task.deleteTask('task123')).resolves.not.toThrow();
		});
	});
});
