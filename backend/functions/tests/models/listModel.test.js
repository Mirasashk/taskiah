const { jest } = require('@jest/globals');
const List = require('../../models/listModel');

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
					docs: [{ data: () => ({ name: 'Test List' }) }],
				})),
			})),
		})),
	},
}));

describe('List Model', () => {
	const mockListData = {
		name: 'Test List',
		ownerId: 'user123',
		sharedWith: ['user456'],
		tasks: ['task123'],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	describe('Constructor and Validation', () => {
		test('should create a valid list instance', () => {
			const list = new List(mockListData);
			expect(list.name).toBe(mockListData.name);
			expect(list.ownerId).toBe(mockListData.ownerId);
			expect(list.sharedWith).toEqual(mockListData.sharedWith);
		});

		test('should throw error for missing required fields', () => {
			const invalidData = { name: 'Test List' };
			const list = new List(invalidData);
			expect(() => list.validate()).toThrow('Owner ID is required');
		});
	});

	describe('Database Operations', () => {
		test('should create list in database', async () => {
			const listId = await List.createList(mockListData);
			expect(listId).toBeDefined();
		});

		test('should retrieve list from database', async () => {
			const listData = await List.getList('list123');
			expect(listData).toBeDefined();
		});

		test('should get lists by owner ID', async () => {
			const lists = await List.getListsByOwnerId('user123');
			expect(Array.isArray(lists)).toBe(true);
		});
	});
});
