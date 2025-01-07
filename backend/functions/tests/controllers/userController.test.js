const {
	addUser,
	getUser,
	updateUser,
	deleteUser,
} = require('../../controllers/userController');
const { db } = require('../../config/firebase');
const User = require('../../models/userModel');

const mockUserData = {
	id: 'user123',
	email: 'test@example.com',
	firstName: 'Test',
	lastName: 'User',
	username: 'testuser',
	role: 'user',
};

jest.mock('../../config/firebase', () => {
	const getMock = jest.fn().mockResolvedValue({
		exists: true,
		data: () => mockUserData,
	});

	const mockDoc = {
		get: getMock,
		update: jest.fn().mockResolvedValue(),
		delete: jest.fn().mockResolvedValue(),
	};

	const mockCollection = {
		doc: jest.fn(() => mockDoc),
	};

	return {
		db: {
			collection: jest.fn(() => mockCollection),
			runTransaction: jest.fn(async (callback) => {
				const mockTransaction = {
					get: jest.fn().mockResolvedValue({
						exists: true,
						data: () => mockUserData,
					}),
					update: jest.fn(),
					set: jest.fn(),
				};
				return callback(mockTransaction);
			}),
		},
	};
});

jest.mock('../../models/userModel', () => {
	return class User {
		constructor(data) {
			Object.assign(this, data);
		}
		validate() {
			return true;
		}
		toJSON() {
			return { ...this };
		}
		static async createUser(userData) {
			return { userId: 'user123', masterListId: 'list123' };
		}
		static async getUser(userId) {
			return mockUserData;
		}
		static async updateUser(userId, userData) {
			return { ...userData, id: userId };
		}
	};
});

jest.mock('firebase-admin', () => ({
	auth: jest.fn(() => ({
		updateUser: jest.fn().mockResolvedValue(),
	})),
}));

describe('User Controller', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('addUser', () => {
		it('should add a user to the database', async () => {
			const res = {
				json: jest.fn(),
			};
			await addUser(mockUserData, res);
			expect(res.json).toHaveBeenCalledWith({
				id: { userId: 'user123', masterListId: 'list123' },
			});
		});

		it('should handle errors when adding a user', async () => {
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			jest.spyOn(User, 'createUser').mockRejectedValue(new Error());
			await addUser(mockUserData, res);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				error: 'Failed to add user',
			});
		});
	});

	describe('getUser', () => {
		it('should retrieve a user from the database', async () => {
			const res = {
				json: jest.fn(),
			};
			await getUser('user123', res);
			expect(res.json).toHaveBeenCalledWith(mockUserData);
		});

		it('should handle errors when getting a user', async () => {
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			jest.spyOn(User, 'getUser').mockRejectedValue(
				new Error('Get user error')
			);
			await getUser('user123', res);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				error: 'Failed to get user',
			});
		});
	});

	describe('updateUser', () => {
		it('should update a user in the database', async () => {
			const userId = 'user123';
			const updates = {
				firstName: 'Updated',
				lastName: 'User',
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			await updateUser(userId, updates, res);
			expect(res.json).toHaveBeenCalledWith({
				...updates,
				id: userId,
			});
		});

		it('should handle errors when updating a user', async () => {
			const userId = 'user123';
			const updates = {
				firstName: 'Updated',
				lastName: 'User',
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			jest.spyOn(User, 'updateUser').mockRejectedValue(new Error());
			await updateUser(userId, updates, res);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				error: 'Failed to update user',
			});
		});
	});

	describe('deleteUser', () => {
		it('should delete a user from the database', async () => {
			const userId = 'user123';
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			await deleteUser(userId, res);
			expect(db.collection).toHaveBeenCalledWith('users');
			expect(db.collection().doc).toHaveBeenCalledWith(userId);
			expect(db.collection().doc().delete).toHaveBeenCalled();
			expect(res.json).toHaveBeenCalledWith({
				message: 'User deleted successfully',
			});
		});

		it('should handle errors when deleting a user', async () => {
			const userId = 'user123';
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			db.collection()
				.doc()
				.delete.mockRejectedValue(new Error('Delete user error'));
			await deleteUser(userId, res);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				error: 'Failed to delete user',
			});
		});
	});
});
