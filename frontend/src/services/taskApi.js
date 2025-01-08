import axiosInstance from '../config/axios';

export const taskService = {
	getTasks: (userId) => axiosInstance.get(`/tasks`, { params: { userId } }),

	createTask: (task) => axiosInstance.post('/tasks', task),

	deleteTask: (taskId) => axiosInstance.delete(`/tasks/${taskId}`),

	updateTask: (taskId, newTaskData) =>
		axiosInstance.put(`/tasks/${taskId}`, newTaskData),

	deleteAllTasks: (userId) =>
		axiosInstance.delete(`/tasks`, { params: { userId } }),
};
