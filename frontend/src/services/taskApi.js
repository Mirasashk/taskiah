import axiosInstance from '../config/axios';

export const taskService = {
	getTasks: (userId) => axiosInstance.get(`/tasks/${userId}`),
	createTask: (task) => axiosInstance.post('/tasks/add', task),
	deleteTask: (taskId) => axiosInstance.delete(`/tasks/${taskId}`),
	updateTask: (taskId, newTaskData) =>
		axiosInstance.put(`/tasks/${taskId}`, newTaskData),
	deleteAllTasks: (userId) => axiosInstance.delete(`/tasks/all/${userId}`),

	// Add other task-related API calls
};
