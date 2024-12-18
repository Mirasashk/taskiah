import {mockAxiosInstance} from '../../../jest/setupApiMocks';
import {userService} from '../userApi';

describe('userService', () => {
	beforeEach(() => {
		// Clear all mock implementations and calls between tests
		jest.clearAllMocks();
		mockAxiosInstance.get.mockReset();
		mockAxiosInstance.post.mockReset();
		mockAxiosInstance.put.mockReset();
		mockAxiosInstance.delete.mockReset();
	});

	it('should login a user', async () => {
		const mockResponse = {data: {user: {}}};
		mockAxiosInstance.post.mockResolvedValue(mockResponse);

		const email = 'test@test.com';
		const password = 'password';
		const response = await userService.login(email, password);

		expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/login', {
			email,
			password,
		});
		expect(response).toEqual(mockResponse.data);
	});

	// Update other test cases similarly...

	it('should create a user profile', async () => {
		const mockResponse = {data: {user: {}}};
		mockAxiosInstance.post.mockResolvedValue(mockResponse);

		const userData = {
			email: 'test@test.com',
			password: 'password',
		};
		const response = await userService.createProfile(userData);

		expect(mockAxiosInstance.post).toHaveBeenCalledWith(
			`/users/add`,
			userData,
		);
		expect(mockResponse.data).toEqual(response);
	});

	it('should get a user profile', async () => {
		const mockResponse = {data: {user: {}}};
		mockAxiosInstance.get.mockResolvedValue(mockResponse);

		const uid = '123';
		const response = await userService.getProfile(uid);

		expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/users/${uid}`);
		expect(mockResponse.data).toEqual(response);
	});

	it('should throw an error if the user profile is not found', async () => {
		const mockError = new Error('User profile not found');
		mockAxiosInstance.get.mockRejectedValue(mockError);

		const uid = '123';
		await expect(userService.getProfile(uid)).rejects.toThrow(mockError);
		expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/users/${uid}`);
		expect(mockError).toEqual(mockError);
	});

	it('should throw errror if the user could not be created', async () => {
		const mockError = new Error('User could not be created');
		mockAxiosInstance.post.mockRejectedValue(mockError);

		const userData = {
			email: 'test@test.com',
			password: 'password',
		};
		await expect(userService.createProfile(userData)).rejects.toThrow(
			mockError,
		);

		expect(mockAxiosInstance.post).toHaveBeenCalledWith(
			`/users/add`,
			userData,
		);
		expect(mockError).toEqual(mockError);
	});

	it('should throw an error if the user could not login', async () => {
		const mockError = new Error('User could not login');
		mockAxiosInstance.post.mockRejectedValue(mockError);

		const email = 'test@test.com';
		const password = 'password';
		await expect(userService.login(email, password)).rejects.toThrow(
			mockError,
		);
		expect(mockAxiosInstance.post).toHaveBeenCalledWith(`/auth/login`, {
			email: 'test@test.com',
			password: 'password',
		});
		expect(mockError).toEqual(mockError);
	});
});
