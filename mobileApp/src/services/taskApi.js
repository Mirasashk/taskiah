import apiInstance from '../config/apiConfig';

const api = apiInstance();

export const taskService = {
	getTasks: userId => api.get(`/tasks/${userId}`),
	createTask: task => api.post('/tasks/add', task),
	deleteTask: taskId => api.delete(`/tasks/${taskId}`),
	updateTask: (taskId, newTaskData) =>
		api.put(`/tasks/${taskId}`, newTaskData),
	deleteAllTasks: userId => api.delete(`/tasks/all/${userId}`),
};

export default taskService;
