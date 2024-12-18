// API service for making HTTP requests
import axios from 'axios';
import Config from 'react-native-config';

// Create axios instance with default config
const api = axios.create({
	baseURL: Config.API_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add request interceptor to handle errors
api.interceptors.request.use(
	config => {
		console.log('API Request:', config); // Add logging
		return config;
	},
	error => {
		console.error('API Request Error:', error);
		return Promise.reject(error);
	},
);

// Add response interceptor
api.interceptors.response.use(
	response => {
		console.log('API Response:', response); // Add logging
		return response;
	},
	error => {
		console.error('API Response Error:', error);
		return Promise.reject(error);
	},
);

// Define taskService with API calls
export const taskService = {
	getTasks: userId => api.get(`/tasks/${userId}`),
	createTask: task => api.post('/tasks/add', task),
	deleteTask: taskId => api.delete(`/tasks/${taskId}`),
	updateTask: (taskId, newTaskData) =>
		api.put(`/tasks/${taskId}`, newTaskData),
	deleteAllTasks: userId => api.delete(`/tasks/all/${userId}`),
};

export default taskService;
