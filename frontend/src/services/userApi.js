import axiosInstance from '../config/axios';

export const userService = {
	createUser: (userData) => axiosInstance.post('/users/add', userData),
	getUser: (userId) => axiosInstance.get(`/users/${userId}`),
	updateUser: (userId, userData) =>
		axiosInstance.put(`/users/${userId}`, userData),
	searchUsers: (query) =>
		axiosInstance.get(`/users/search`, { params: { query } }),
	// Add other user-related API calls
	inviteUser: (email, message) =>
		axiosInstance.post(`/users/invite`, { email, message }),
	updateUserPreferences: (userId, preferences) =>
		axiosInstance.put(`/users/${userId}/preferences`, preferences),
	getUsersByUserIds: (userIds) =>
		axiosInstance.get(`/users/getUsersByUserIds`, {
			params: { userIds },
		}),
};
