import axios from 'axios';
import Config from 'react-native-config';

// Declare mockAxiosInstance in wider scope so it's available to all tests
let mockAxiosInstance;

jest.mock('axios', () => {
	mockAxiosInstance = {
		get: jest.fn(),
		post: jest.fn(),
		put: jest.fn(),
		delete: jest.fn(),
		interceptors: {
			request: {
				use: jest.fn((successFn, errorFn) => {
					mockAxiosInstance.interceptors.request.successHandler =
						successFn;
					mockAxiosInstance.interceptors.request.errorHandler =
						errorFn;
				}),
			},
			response: {
				use: jest.fn((successFn, errorFn) => {
					mockAxiosInstance.interceptors.response.successHandler =
						successFn;
					mockAxiosInstance.interceptors.response.errorHandler =
						errorFn;
				}),
			},
		},
	};

	return {
		create: jest.fn(() => mockAxiosInstance),
		interceptors: {
			request: {use: jest.fn()},
			response: {use: jest.fn()},
		},
	};
});

// Import taskService after setting up mocks
const {taskService} = require('../taskApi');

describe('taskService', () => {
	beforeEach(() => {
		// Clear all mock implementations and calls between tests
		jest.clearAllMocks();
		mockAxiosInstance.get.mockReset();
		mockAxiosInstance.post.mockReset();
		mockAxiosInstance.put.mockReset();
		mockAxiosInstance.delete.mockReset();
	});

	it('should fetch tasks for a user', async () => {
		const mockResponse = {data: []};
		mockAxiosInstance.get.mockResolvedValue(mockResponse);

		const userId = '123';
		const response = await taskService.getTasks(userId);

		expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/tasks/${userId}`);
		expect(response.data).toEqual([]);
	});

	it('should create a task for user', async () => {
		const mockResponse = {data: {}};
		mockAxiosInstance.post.mockResolvedValue(mockResponse);

		const task = {
			title: 'Test Task',
			description: 'This is a test task',
			completed: false,
		};
		const response = await taskService.createTask(task);

		expect(mockAxiosInstance.post).toHaveBeenCalledWith(`/tasks/add`, task);
		expect(response.data).toEqual({});
	});

	it('should delete a task for user', async () => {
		const mockResponse = {data: {message: 'Task deleted'}};
		mockAxiosInstance.delete.mockResolvedValue(mockResponse);

		const taskId = '123';
		const response = await taskService.deleteTask(taskId);

		expect(mockAxiosInstance.delete).toHaveBeenCalledWith(`/tasks/123`);
		expect(response.data).toEqual({message: 'Task deleted'});
	});

	it('should update a task for user', async () => {
		const newTaskData = {
			title: 'Test Task updated',
			description: 'This is a test task updated',
			completed: true,
		};
		const mockResponse = {data: {newTaskData}};
		mockAxiosInstance.put.mockResolvedValue(mockResponse);

		const task = {
			title: 'Test Task',
			description: 'This is a test task',
			completed: false,
		};

		const taskId = '123';

		const response = await taskService.updateTask(taskId, task);

		expect(mockAxiosInstance.put).toHaveBeenCalledWith(`/tasks/123`, task);
		expect(response.data).toEqual({newTaskData});
	});

	it('should delete all tasks for user', async () => {
		const mockResponse = {data: {message: 'All tasks deleted'}};
		mockAxiosInstance.delete.mockResolvedValue(mockResponse);

		const userId = '123';

		const response = await taskService.deleteAllTasks(userId);

		expect(mockAxiosInstance.delete).toHaveBeenCalledWith(`/tasks/all/123`);
		expect(response.data).toEqual({message: 'All tasks deleted'});
	});
});

describe('API Interceptors', () => {
	beforeEach(() => {
		// Clear console mocks before each test
		console.log = jest.fn();
		console.error = jest.fn();
	});

	test('request interceptor should log and return config', () => {
		const mockConfig = {
			url: '/test',
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
		};

		const result =
			mockAxiosInstance.interceptors.request.successHandler(mockConfig);

		// Verify console.log was called with the config
		expect(console.log).toHaveBeenCalledWith('API Request:', mockConfig);

		// Verify the config is returned unchanged
		expect(result).toBe(mockConfig);
	});

	test('request error interceptor should log and reject error', async () => {
		const mockError = new Error('Request failed');

		// Test that the error handler rejects with the same error
		await expect(
			mockAxiosInstance.interceptors.request.errorHandler(mockError),
		).rejects.toBe(mockError);

		// Verify console.error was called with the error
		expect(console.error).toHaveBeenCalledWith(
			'API Request Error:',
			mockError,
		);
	});
});

describe('Response Interceptors', () => {
	beforeEach(() => {
		// Clear console mocks before each test
		console.log = jest.fn();
		console.error = jest.fn();
	});

	test('response interceptor should log and return response', () => {
		const mockResponse = {
			data: {id: 1, name: 'Test'},
			status: 200,
			statusText: 'OK',
			headers: {'content-type': 'application/json'},
		};

		const result =
			mockAxiosInstance.interceptors.response.successHandler(
				mockResponse,
			);

		// Verify console.log was called with the response
		expect(console.log).toHaveBeenCalledWith('API Response:', mockResponse);

		// Verify the response is returned unchanged
		expect(result).toBe(mockResponse);
	});

	test('response error interceptor should log and reject error', async () => {
		const mockError = new Error('Network Error');

		// Test that the error handler rejects with the same error
		await expect(
			mockAxiosInstance.interceptors.response.errorHandler(mockError),
		).rejects.toBe(mockError);

		// Verify console.error was called with the error
		expect(console.error).toHaveBeenCalledWith(
			'API Response Error:',
			mockError,
		);
	});
});
