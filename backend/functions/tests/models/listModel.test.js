const List = require('../../models/listModel');

// Create chainable mock functions
const mockDoc = {
	id: 'list123',
	set: jest.fn().mockResolvedValue(),
	get: jest.fn().mockResolvedValue({
		id: 'list123',
		data: () => ({ name: 'Test List' }),
	}),
	update: jest.fn().mockResolvedValue(),
	delete: jest.fn().mockResolvedValue(),
};

const mockWhere = {
	get: jest.fn().mockResolvedValue({
		docs: [
			{
				id: 'list123',
				data: () => ({ name: 'Test List' }),
			},
		],
	}),
	where: jest.fn().mockReturnThis(),
};

const mockCollection = {
	doc: jest.fn(() => mockDoc),
	where: jest.fn(() => mockWhere),
};

const mockTransaction = {
	get: jest.fn().mockResolvedValue({
		exists: true,
		data: () => ({ name: 'Test List' }),
	}),
	update: jest.fn(),
	set: jest.fn(),
};

// Mock Firebase
jest.mock('../../config/firebase', () => ({
	db: {
		collection: jest.fn(() => mockCollection),
		runTransaction: jest.fn(async (callback) => {
			return callback(mockTransaction);
		}),
	},
}));

const { db } = require('../../config/firebase');

describe('List Model', () => {
	const mockListData = {
		name: 'Test List',
		ownerId: 'user123',
		sharedWith: [],
		tasks: [],
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('Constructor and Validation', () => {
		test('should create a valid list instance', () => {
			const list = new List(mockListData);
			expect(list.name).toBe(mockListData.name);
			expect(list.ownerId).toBe(mockListData.ownerId);
			expect(list.sharedWith).toEqual(mockListData.sharedWith);
		});

		test('should throw error for missing required fields', () => {
			const invalidData = { ownerId: 'user123' };
			const list = new List(invalidData);
			expect(() => list.validate()).toThrow('Name is required');
		});

		test('should throw error for missing owner ID', () => {
			const invalidData = { name: 'Test List' };
			const list = new List(invalidData);
			expect(() => list.validate()).toThrow('Owner ID is required');
		});
	});

	describe('Database Operations', () => {
		test('should create list in database', async () => {
			const listId = await List.createList(mockListData);
			expect(listId).toBe('list123');
			expect(db.collection).toHaveBeenCalledWith('lists');
			expect(mockDoc.set).toHaveBeenCalledWith(
				expect.objectContaining({
					name: mockListData.name,
					ownerId: mockListData.ownerId,
				})
			);
		});

		test('should retrieve list from database', async () => {
			const listData = await List.getList('list123');
			expect(listData).toBeDefined();
			expect(db.collection).toHaveBeenCalledWith('lists');
			expect(mockCollection.doc).toHaveBeenCalledWith('list123');
		});

		test('should update list in database', async () => {
			await expect(
				List.updateList('list123', mockListData)
			).resolves.not.toThrow();
			expect(db.collection).toHaveBeenCalledWith('lists');
			expect(mockCollection.doc).toHaveBeenCalledWith('list123');
			expect(mockTransaction.update).toHaveBeenCalled();
		});

		test('should delete list from database', async () => {
			await expect(List.deleteList('list123')).resolves.not.toThrow();
			expect(db.collection).toHaveBeenCalledWith('lists');
			expect(mockCollection.doc).toHaveBeenCalledWith('list123');
			expect(mockDoc.delete).toHaveBeenCalled();
		});

		test('should get lists by owner', async () => {
			const lists = await List.getListsByOwnerId('user123');
			expect(lists).toBeDefined();
			expect(Array.isArray(lists)).toBe(true);
			expect(db.collection).toHaveBeenCalledWith('lists');
			expect(mockCollection.where).toHaveBeenCalledWith(
				'ownerId',
				'==',
				'user123'
			);
		});

		test('should get shared lists by user ID', async () => {
			const lists = await List.getSharedWithListsByUserId('user123');
			expect(lists).toBeDefined();
			expect(Array.isArray(lists)).toBe(true);
			expect(db.collection).toHaveBeenCalledWith('lists');
			expect(mockCollection.where).toHaveBeenCalledWith(
				'sharedWith',
				'array-contains',
				'user123'
			);
		});
	});
});
