import axiosInstance from '../config/axios';

export const listService = {
	getListsByUserId: (userId) => axiosInstance.get(`/lists/${userId}`),

	getSharedListsByUserId: (userId) =>
		axiosInstance.get(`/lists/shared/${userId}`),

	createList: (list) => axiosInstance.post('/lists/add', list),

	postSharedListInvite: (invite) =>
		axiosInstance.post('/lists/invite', invite),

	deleteList: (listId) => axiosInstance.delete(`/lists/${listId}`),

	updateList: (listId, newListData) =>
		axiosInstance.put(`/lists/${listId}/update`, newListData),

	getListInvitesByEmail: (email) =>
		axiosInstance.get(`/lists/invite/${email}`),

	acceptSharedListInvite: (invite, userId) =>
		axiosInstance.put(`/lists/invite/${invite.id}/accept`, {
			userId,
			listId: invite.listId,
		}),

	rejectSharedListInvite: (id) =>
		axiosInstance.put(`/lists/invite/${id}/reject`),

	createTag: (tag) => axiosInstance.post('/tags/add', tag),

	deleteTag: (tagId) => axiosInstance.delete(`/tags/${tagId}`),

	getTagsByUserId: (userId) => axiosInstance.get(`/tags/${userId}`),
};
