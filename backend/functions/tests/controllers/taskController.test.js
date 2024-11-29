const {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} = require('../../controllers/taskController');
const { db } = require('../../config/firebase');

jest.mock('../../config/firebase', () => {
    const getMock = jest.fn().mockResolvedValue({
        docs: [
            {
                id: 'task1',
                data: () => ({
                    title: 'Task 1',
                    ownerId: '123',
                }),
            },
            {
                id: 'task2',
                data: () => ({
                    title: 'Task 2',
                    ownerId: '123',
                }),
            },
        ],
    });
    const docRef = {
        update: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
    };
    const collectionRef = {
        add: jest.fn().mockResolvedValue({ id: 'task1' }),
        doc: jest.fn(() => docRef),
        where: jest.fn(() => ({
            get: getMock,
        })),
    };

    return {
        db: {
            collection: jest.fn(() => collectionRef),
        },
        _getMock: getMock,
    };
});

describe('Task Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('addTask', () => {
        it('should add a task and return its ID', async () => {
            const task = { title: 'Test Task', ownerId: '123' };
            const mockDocRef = { id: 'task123' };
            db.collection().add.mockResolvedValue(mockDocRef);

            const result = await addTask(task);

            expect(db.collection).toHaveBeenCalledWith('tasks');
            expect(db.collection().add).toHaveBeenCalledWith(task);
            expect(result).toBe(mockDocRef.id);
        });

        it('should log an error if adding a task fails', async () => {
            const task = { title: 'Test Task', ownerId: '123' };
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation();
            db.collection().add.mockRejectedValue(
                new Error('Add task error')
            );

            await addTask(task);

            expect(consoleSpy).toHaveBeenCalledWith(
                'Error adding task:',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });
    });

    describe('getTasks', () => {
        it('should return tasks for a given user ID', async () => {
            const userId = '123';
            const mockTasks = [
                { id: 'task1', title: 'Task 1', ownerId: '123' },
                { id: 'task2', title: 'Task 2', ownerId: '123' },
            ];
            const mockSnapshot = {
                docs: mockTasks.map((task) => ({
                    id: task.id,
                    data: () => task,
                })),
            };
            db.collection()
                .where()
                .get.mockResolvedValue(mockSnapshot);

            const result = await getTasks(userId);

            expect(db.collection).toHaveBeenCalledWith('tasks');
            expect(db.collection().where).toHaveBeenCalledWith(
                'ownerId',
                '==',
                userId
            );
            expect(result).toEqual(mockTasks);
        });

        it('should log an error if getting tasks fails', async () => {
            const userId = '123';
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation();
            db.collection()
                .where()
                .get.mockRejectedValue(new Error('Get tasks error'));

            await getTasks(userId);

            expect(consoleSpy).toHaveBeenCalledWith(
                'Error getting tasks:',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });
    });

    describe('updateTask', () => {
        it('should update a task with the given updates', async () => {
            const taskId = 'task1';
            const updates = { title: 'Updated Task' };

            await updateTask(taskId, updates);

            expect(db.collection).toHaveBeenCalledWith('tasks');
            expect(db.collection().doc).toHaveBeenCalledWith(taskId);
            expect(db.collection().doc().update).toHaveBeenCalledWith(
                updates
            );
        });

        it('should log an error if updating a task fails', async () => {
            const taskId = 'task123';
            const updates = { title: 'Updated Task' };
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation();
            db.collection()
                .doc()
                .update.mockRejectedValue(
                    new Error('Update task error')
                );

            await updateTask(taskId, updates);

            expect(consoleSpy).toHaveBeenCalledWith(
                'Error updating task:',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
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
                .delete.mockRejectedValue(
                    new Error('Delete task error')
                );

            await deleteTask(taskId);

            expect(consoleSpy).toHaveBeenCalledWith(
                'Error deleting task:',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });
    });
});
