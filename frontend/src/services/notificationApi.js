import axiosInstance from '../config/axios';

export const notificationService = {
	addNotification: (notification, taskId, task) =>
		axiosInstance.post(`/tasks/${taskId}/notifications`, {
			notification,
			task,
		}),

	getNotifications: (taskId) =>
		axiosInstance.get(`/tasks/${taskId}/notifications`),

	deleteNotification: (taskId) =>
		axiosInstance.delete(`/tasks/${taskId}/notifications`),
};
