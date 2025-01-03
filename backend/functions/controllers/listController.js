/**
 * List controller
 * @module controllers/listController
 */

const { db } = require('../config/firebase');
const List = require('../models/listModel');
const ListInvite = require('../models/listInvites');
/**
 * Adds a new notification to a task
 * @param {Object} listData - The list data
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The list data
 */
const addList = async (listData, res) => {
	const listId = await List.createList(listData);
	res.status(200).json({ listId });
};

/**
 * Gets a list by owner ID
 * @param {string} ownerId - The owner ID
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The list data
 */
const getListByOwnerId = async (ownerId, res) => {
	const list = await List.getListsByOwnerId(ownerId);
	res.status(200).json(list);
};

/**
 * Invites a user to a list
 * @param {Object} listInviteData - The list invite data
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The list invite data
 */
const inviteToList = async (listInviteData, res) => {
	const listInvite = await ListInvite.createListInvite(listInviteData);
	res.status(200).json(listInvite);
};

/**
 * Gets a list by shared with
 * @param {string} email - The email of the shared with
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The list data
 */
const getSharedWithListsByEmail = async (email, res) => {
	const list = await List.getSharedWithListsByEmail(email);
	res.status(200).json(list);
};

/**
 * Gets a list invite by email
 * @param {string} email - The email of the invitee
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The list invite data
 */
const getListInviteByEmail = async (email, res) => {
	const listInvite = await ListInvite.getListInviteByEmail(email);
	res.status(200).json(listInvite);
};

/**
 * Accepts a list invite
 * @param {string} id - The ID of the list invite
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The list invite data
 */
const acceptListInvite = async (id, listId, userId, res) => {
	const listInvite = await ListInvite.acceptListInvite(id, listId, userId);
	res.status(200).json(listInvite);
};

/**
 * Rejects a list invite
 * @param {string} id - The ID of the list invite
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The list invite data
 */
const rejectListInvite = async (id, res) => {
	const listInvite = await ListInvite.rejectListInvite(id);
	res.status(200).json(listInvite);
};

module.exports = {
	addList,
	getListByOwnerId,
	getSharedWithListsByEmail,
	inviteToList,
	getListInviteByEmail,
	acceptListInvite,
	rejectListInvite,
};
