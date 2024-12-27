import apiInstance from '../apiConfig';
import axios from 'axios';
import Config from 'react-native-config';

// Mock axios and Config
jest.mock('axios');
jest.mock('react-native-config', () => ({
	API_URL: 'https://test-api.com',
}));

describe('apiConfig', () => {
	let api;
	let mockCreate;
	let mockRequestUse;
	let mockResponseUse;

	beforeEach(() => {
		// Clear all mocks
		jest.clearAllMocks();

		// Setup axios mock
		mockRequestUse = jest.fn();
		mockResponseUse = jest.fn();
		mockCreate = jest.fn(() => ({
			interceptors: {
				request: {use: mockRequestUse},
				response: {use: mockResponseUse},
			},
		}));
		axios.create = mockCreate;

		// Create new api instance for each test
		api = apiInstance();
	});

	it('should create axios instance with correct config', () => {
		expect(mockCreate).toHaveBeenCalledWith({
			baseURL: Config.API_URL,
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	});

	describe('request interceptor', () => {
		let successHandler;
		let errorHandler;

		beforeEach(() => {
			[[successHandler, errorHandler]] = mockRequestUse.mock.calls;
			console.log = jest.fn();
			console.error = jest.fn();
		});

		it('should log and return config on success', () => {
			const mockConfig = {test: 'config'};
			const result = successHandler(mockConfig);
			expect(console.log).toHaveBeenCalledWith(
				'API Request:',
				mockConfig,
			);
			expect(result).toBe(mockConfig);
		});

		it('should log and reject error on failure', async () => {
			const mockError = new Error('Request failed');
			await expect(errorHandler(mockError)).rejects.toThrow(mockError);
			expect(console.error).toHaveBeenCalledWith(
				'API Request Error:',
				mockError,
			);
		});
	});

	describe('response interceptor', () => {
		let successHandler;
		let errorHandler;

		beforeEach(() => {
			[[successHandler, errorHandler]] = mockResponseUse.mock.calls;
			console.log = jest.fn();
			console.error = jest.fn();
		});

		it('should log and return response on success', () => {
			const mockResponse = {test: 'response'};
			const result = successHandler(mockResponse);
			expect(console.log).toHaveBeenCalledWith(
				'API Response:',
				mockResponse,
			);
			expect(result).toBe(mockResponse);
		});

		it('should log and reject error on failure', async () => {
			const mockError = new Error('Response failed');
			await expect(errorHandler(mockError)).rejects.toThrow(mockError);
			expect(console.error).toHaveBeenCalledWith(
				'API Response Error:',
				mockError,
			);
		});
	});

	it('should return the configured axios instance', () => {
		expect(api).toBeDefined();
		expect(api.interceptors).toBeDefined();
		expect(api.interceptors.request).toBeDefined();
		expect(api.interceptors.response).toBeDefined();
	});
});
