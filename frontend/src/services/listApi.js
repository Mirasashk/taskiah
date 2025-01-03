import axiosInstance from '../config/axios';

export const listService = {
	getListsByUserId: (userId) => axiosInstance.get(`/lists/${userId}`),

	getSharedListsByEmail: (email) =>
		axiosInstance.get(`/lists/shared/${email}`),
	createList: (list) => axiosInstance.post('/lists/add', list),

	postSharedListInvite: (invite) =>
		axiosInstance.post('/lists/invite', invite),

	deleteList: (listId) => axiosInstance.delete(`/lists/${listId}`),

	updateList: (listId, newListData) =>
		axiosInstance.put(`/lists/${listId}`, newListData),

	getListInvitesByEmail: (email) =>
		axiosInstance.get(`/lists/invite/${email}`),

	acceptSharedListInvite: (invite, userId) =>
		axiosInstance.put(`/lists/invite/${invite.id}/accept`, {
			userId,
			listId: invite.listId,
		}),

	rejectSharedListInvite: (id) =>
		axiosInstance.put(`/lists/invite/${id}/reject`),
};
