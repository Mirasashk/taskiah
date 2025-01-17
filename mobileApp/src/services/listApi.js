import apiInstance from '../config/apiConfig';

const api = apiInstance();
export const listService = {
  getListsByUserId: userId => api.get(`/lists`, {params: {ownerId: userId}}),

  getSharedListsByUserId: userId =>
    api.get(`/lists/shared`, {params: {userId}}),

  createList: list => api.post('/lists', list),

  postSharedListInvite: (invite, listId) =>
    api.post(`/lists/${listId}/invites`, invite),

  deleteList: listId => api.delete(`/lists/${listId}`),

  updateList: (listId, newListData) => api.put(`/lists/${listId}`, newListData),

  getListInvitesByEmail: email => api.get(`/lists/invites`, {params: {email}}),

  acceptSharedListInvite: (invite, userId) =>
    api.put(`/lists/invites/${invite.id}/accept`, {
      userId,
      listId: invite.listId,
    }),

  removeSharedUser: (listId, userId) =>
    api.delete(`/lists/${listId}/shared/${userId}`),

  rejectSharedListInvite: id => api.put(`/lists/invites/${id}/reject`),

  createTag: tag => api.post('/tags', tag),

  deleteTag: tagId => api.delete(`/tags/${tagId}`),

  getTagsByUserId: userId => api.get(`/tags`, {params: {userId}}),
};
