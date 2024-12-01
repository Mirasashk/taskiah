const {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
    deleteAllTasks,
} = require('../../controllers/taskController');
const { db } = require('../../config/firebase');

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
            const TaskModel = require('../../models/taskModel');
            const task = new TaskModel(taskCollection[0]);
            TaskModel.mockValidate = jest.fn().mockReturnValue();
            const result = await addTask(task);
            expect(db.collection).toHaveBeenCalledWith('tasks');
            expect(db.collection().add).toHaveBeenCalledWith(
                task.toJSON()
            );
            expect(result).toBe(task.id);
        });

        it('should log an error if adding a task fails', async () => {
            const task = taskCollection[0];
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation();
            db.collection().add.mockRejectedValue(
                new Error('Add task error')
            );
            const result = await addTask(task);
            expect(result).toBeUndefined();
            expect(consoleSpy).toHaveBeenCalledWith(
                'Error adding task:',
                expect.any(Error)
            );
        });
    });

    describe('getTasks', () => {
        it('should return tasks for a given user ID', async () => {
            const userId = '123';
            const result = await getTasks(userId);
            expect(db.collection).toHaveBeenCalledWith('tasks');
            expect(db.collection().where).toHaveBeenCalledWith(
                'ownerId',
                '==',
                userId
            );
            expect(db.collection().where().get).toHaveBeenCalled();
            expect(result).toEqual(taskCollection);
        });

        it('should log an error if getting tasks fails', async () => {
            const userId = '123';
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation();
            db.collection()
                .where()
                .get.mockRejectedValue(new Error('Get tasks error'));
            const result = await getTasks(userId);

            expect(result).toBeUndefined();
            expect(consoleSpy).toHaveBeenCalledWith(
                'Error getting tasks:',
                expect.any(Error)
            );
        });
    });

    describe('updateTask', () => {
        it('should update a task with the given updates', async () => {
            const taskId = 'task1';
            const updates = { title: 'Updated Task' };
            db.collection().doc().update.mockResolvedValue();
            const result = await updateTask(taskId, updates);
            expect(db.collection).toHaveBeenCalledWith('tasks');
            expect(db.collection().doc).toHaveBeenCalledWith(taskId);
            expect(db.collection().doc().update).toHaveBeenCalledWith(
                updates
            );
            expect(result).toBeUndefined();
        });

        it('should log an error if updating a task fails', async () => {
            const taskId = 'task1';
            const updates = { title: 'Updated Task' };
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation();
            db.collection()
                .doc()
                .update.mockRejectedValue(
                    new Error('Update task error')
                );
            const result = await updateTask(taskId, updates);
            expect(result).toBeUndefined();
            expect(consoleSpy).toHaveBeenCalledWith(
                'Error updating task:',
                expect.any(Error)
            );
        });
    });

    describe('deleteTask', () => {
        it('should delete a task by its ID', async () => {
            const taskId = 'task123';
            db.collection().doc().delete.mockResolvedValue();

            const result = await deleteTask(taskId);

            expect(db.collection).toHaveBeenCalledWith('tasks');
            expect(db.collection().doc).toHaveBeenCalledWith(taskId);
            expect(db.collection().doc().delete).toHaveBeenCalled();

            expect(result).toBeUndefined();
        });

        it('should log an error if deleting a task fails', async () => {
            const taskId = 'task123';
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation();
            db.collection()
                .doc()
                .delete.mockRejectedValue(
                    new Error('Delete task error')
                );
            const result = await deleteTask(taskId);
            expect(result).toBeUndefined();
            expect(consoleSpy).toHaveBeenCalledWith(
                'Error deleting task:',
                expect.any(Error)
            );
        });
    });

    describe('deleteAllTasks', () => {
        it('should delete all tasks for a given user ID with status "deleted"', async () => {
            const userId = '123';
            db.collection()
                .where()
                .get.mockResolvedValue({
                    docs: taskCollection.filter(
                        (task) => task.status === 'deleted'
                    ),
                });

            const result = await deleteAllTasks(userId);

            expect(result).toBeUndefined();
        });

        it('should log a message if no tasks are found to delete', async () => {
            const userId = '123';
            const consoleSpy = jest
                .spyOn(console, 'log')
                .mockImplementation();
            db.collection().where().get.mockResolvedValue({
                empty: true,
                docs: [],
            });
            await deleteAllTasks(userId);
            expect(consoleSpy).toHaveBeenCalledWith(
                'No tasks found to delete.'
            );
        });

        it('should log an error if deleting tasks fails', async () => {
            const userId = '123';
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation();
            db.collection()
                .where()
                .get.mockRejectedValue(
                    new Error('Delete tasks error')
                );
            await deleteAllTasks(userId);
            expect(consoleSpy).toHaveBeenCalledWith(
                'Error deleting all tasks:',
                expect.any(Error)
            );
        });
    });
});
