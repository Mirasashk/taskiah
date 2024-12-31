const { jest } = require('@jest/globals');
const Task = require('../../models/taskModel');

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
					docs: [{ data: () => ({ title: 'Test Task' }) }],
				})),
			})),
		})),
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
