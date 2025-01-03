import axiosInstance from '../config/axios';

export const listService = {
	getListsByUserId: (userId) => axiosInstance.get(`/lists/${userId}`),
	createList: (list) => axiosInstance.post('/lists/add', list),
	deleteList: (listId) => axiosInstance.delete(`/lists/${listId}`),
	updateList: (listId, newListData) =>
		axiosInstance.put(`/lists/${listId}`, newListData),
};
