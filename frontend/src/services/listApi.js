import axiosInstance from '../config/axios';

export const listService = {
	getListsByUserId: (userId) =>
		axiosInstance.get(`/lists`, { params: { ownerId: userId } }),

	getSharedListsByUserId: (userId) =>
		axiosInstance.get(`/lists/shared`, { params: { userId } }),

	createList: (list) => axiosInstance.post('/lists', list),

	postSharedListInvite: (invite, listId) =>
		axiosInstance.post(`/lists/${listId}/invites`, invite),

	deleteList: (listId) => axiosInstance.delete(`/lists/${listId}`),

	updateList: (listId, newListData) =>
		axiosInstance.put(`/lists/${listId}`, newListData),

	getListInvitesByEmail: (email) =>
		axiosInstance.get(`/lists/invites`, { params: { email } }),

	acceptSharedListInvite: (invite, userId) =>
		axiosInstance.put(`/lists/invites/${invite.id}/accept`, {
			userId,
			listId: invite.listId,
		}),

	rejectSharedListInvite: (id) =>
		axiosInstance.put(`/lists/invites/${id}/reject`),

	createTag: (tag) => axiosInstance.post('/tags', tag),

	deleteTag: (tagId) => axiosInstance.delete(`/tags/${tagId}`),

	getTagsByUserId: (userId) =>
		axiosInstance.get(`/tags`, { params: { userId } }),
};
