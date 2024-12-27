import {mockAxiosInstance} from '../../../jest/setupApiMocks';
import {taskService} from '../taskApi';

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
