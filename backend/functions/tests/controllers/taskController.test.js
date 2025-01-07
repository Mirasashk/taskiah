const {
	addTask,
	getTasks,
	updateTask,
	deleteTask,
	deleteAllTasks,
} = require('../../controllers/taskController');
const { db } = require('../../config/firebase');
const Task = require('../../models/taskModel');

const taskCollection = [
	{
		id: 'task1',
		title: 'Test Task',
		ownerId: '123',
		notifications: {
			reminder: {
				createdAt: '2024-12-01T07:15:25.608Z',
				message: 'Test Message',
				notifyOn: '2024-12-01T07:15:25.609Z',
				status: 'unread',
				type: 'reminder',
				updatedAt: '2024-12-01T07:15:25.609Z',
			},
		},
		status: 'deleted',
	},
	{
		id: 'task2',
		title: 'Test Task 2',
		ownerId: '123',
		notifications: {
			reminder: {
				createdAt: '2024-12-01T07:15:25.608Z',
				message: 'Test Message',
				notifyOn: '2024-12-01T07:15:25.609Z',
				status: 'unread',
				type: 'reminder',
				updatedAt: '2024-12-01T07:15:25.609Z',
			},
		},
		status: 'active',
	},
];

jest.mock('../../config/firebase', () => {
	const getMock = jest.fn().mockResolvedValue({
		docs: taskCollection.map((task) => ({
			id: task.id,
			data: () => task,
		})),
	});

	const whereChain = {
		get: getMock,
		where: jest.fn().mockReturnThis(),
	};

	const mockDoc = {
		update: jest.fn().mockResolvedValue(),
		delete: jest.fn().mockResolvedValue(),
	};

	const mockCollection = {
		add: jest.fn().mockResolvedValue(taskCollection[0]),
		where: jest.fn().mockReturnValue(whereChain),
		doc: jest.fn(() => mockDoc),
	};

	return {
		db: {
			collection: jest.fn(() => mockCollection),
		},
	};
});

jest.mock('../../models/taskModel', () => {
	return class Task {
		constructor(data) {
			Object.assign(this, data);
		}
		validate() {
			return true;
		}
		toJSON() {
			const json = { ...this };
			if (json.notifications?.reminder) {
				json.notifications = json.notifications.reminder;
			}
			return json;
		}
		static async createTask(taskData) {
			return { id: 'task1', ...taskData };
		}
		static async getAllTasksByUserId(userId) {
			return taskCollection;
		}
	};
});

jest.mock('../../models/notificationModel', () => {
	return class Notification {
		constructor(data) {
			Object.assign(this, data);
		}
		validate() {
			return true;
		}
		toJSON() {
			return { ...this };
		}
	};
});

describe('Task Controller', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('addTask', () => {
		it('should add a task and return its ID', async () => {
			const task = taskCollection[0];
			const res = {
				json: jest.fn(),
			};
			await addTask(task, res);
			expect(res.json).toHaveBeenCalledWith({ id: 'task1', ...task });
		});

		it('should log an error if adding a task fails', async () => {
			const task = taskCollection[0];
			const consoleSpy = jest
				.spyOn(console, 'error')
				.mockImplementation();
			const res = {
				json: jest.fn(),
			};
			const error = new Error('Add task error');
			jest.spyOn(Task, 'createTask').mockRejectedValue(error);
			await addTask(task, res);
			expect(consoleSpy).toHaveBeenCalledWith(
				'Error adding task:',
				error
			);
		});
	});

	describe('getTasks', () => {
		it('should return tasks for a given user ID', async () => {
			const userId = '123';
			const res = {
				json: jest.fn(),
			};
			await getTasks(userId, res);
			expect(res.json).toHaveBeenCalledWith(taskCollection);
		});

		it('should log an error if getting tasks fails', async () => {
			const userId = '123';
			const consoleSpy = jest
				.spyOn(console, 'error')
				.mockImplementation();
			const res = {
				json: jest.fn(),
			};
			const error = new Error('Get tasks error');
			jest.spyOn(Task, 'getAllTasksByUserId').mockRejectedValue(error);
			await getTasks(userId, res);
			expect(consoleSpy).toHaveBeenCalledWith(
				'Error getting tasks:',
				error
			);
		});
	});

	describe('updateTask', () => {
		it('should update a task with the given updates', async () => {
			const taskId = 'task1';
			const updates = { title: 'Updated Task' };
			await updateTask(taskId, updates);
			expect(db.collection).toHaveBeenCalledWith('tasks');
			expect(db.collection().doc).toHaveBeenCalledWith(taskId);
			expect(db.collection().doc().update).toHaveBeenCalledWith(updates);
		});

		it('should log an error if updating a task fails', async () => {
			const taskId = 'task1';
			const updates = { title: 'Updated Task' };
			const consoleSpy = jest
				.spyOn(console, 'error')
				.mockImplementation();
			db.collection()
				.doc()
				.update.mockRejectedValue(new Error('Update task error'));
			await updateTask(taskId, updates);
			expect(consoleSpy).toHaveBeenCalledWith(
				'Error updating task:',
				expect.any(Error)
			);
		});
	});

	describe('deleteTask', () => {
		it('should delete a task by its ID', async () => {
			const taskId = 'task123';
			await deleteTask(taskId);
			expect(db.collection).toHaveBeenCalledWith('tasks');
			expect(db.collection().doc).toHaveBeenCalledWith(taskId);
			expect(db.collection().doc().delete).toHaveBeenCalled();
		});

		it('should log an error if deleting a task fails', async () => {
			const taskId = 'task123';
			const consoleSpy = jest
				.spyOn(console, 'error')
				.mockImplementation();
			db.collection()
				.doc()
				.delete.mockRejectedValue(new Error('Delete task error'));
			await deleteTask(taskId);
			expect(consoleSpy).toHaveBeenCalledWith(
				'Error deleting task:',
				expect.any(Error)
			);
		});
	});

	describe('deleteAllTasks', () => {
		it('should delete all tasks for a given user ID with status "deleted"', async () => {
			const userId = '123';
			await deleteAllTasks(userId);
			expect(db.collection).toHaveBeenCalledWith('tasks');
			expect(db.collection().where).toHaveBeenCalledWith(
				'ownerId',
				'==',
				userId
			);
			expect(db.collection().where().where).toHaveBeenCalledWith(
				'status',
				'==',
				'deleted'
			);
		});

		it('should do nothing if no tasks are found to delete', async () => {
			const userId = '123';
			db.collection().where().get.mockResolvedValue({
				empty: true,
				docs: [],
			});
			await deleteAllTasks(userId);
			expect(db.collection().doc().delete).not.toHaveBeenCalled();
		});

		it('should log an error if deleting tasks fails', async () => {
			const userId = '123';
			const consoleSpy = jest
				.spyOn(console, 'error')
				.mockImplementation();
			db.collection()
				.where()
				.get.mockRejectedValue(new Error('Delete tasks error'));
			await deleteAllTasks(userId);
			expect(consoleSpy).toHaveBeenCalledWith(
				'Error deleting all tasks:',
				expect.any(Error)
			);
		});
	});
});
