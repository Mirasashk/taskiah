import axiosInstance from '../config/axios';

export const notificationService = {
	addNotification: (notification, taskId, task) =>
		axiosInstance.post(`/notifications/add/${taskId}`, {
			notification,
			task,
		}),
	getNotifications: (taskId) => axiosInstance.get(`/notifications/${taskId}`),
	deleteNotification: (taskId) =>
		axiosInstance.delete(`/notifications/${taskId}`),
};
