import apiInstance from '../config/apiConfig';

const api = apiInstance();

export const userService = {
	login: async (email, password) => {
		const response = await api.post('/auth/login', {email, password});
		return response.data;
	},

	createProfile: async userData => {
		const response = await api.post('/users/add', userData);
		return response.data;
	},

	getProfile: async uid => {
		const response = await api.get(`/users/${uid}`);
		return response.data;
	},
};

// Add named exports for individual functions
export const {login, createProfile, getProfile: getUserProfile} = userService;

export default userService;
