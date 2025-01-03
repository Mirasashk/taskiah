/**
 * List controller
 * @module controllers/listController
 */

const { db } = require('../config/firebase');
const List = require('../models/listModel');

/**
 * Adds a new notification to a task
 * @param {Object} listData - The list data
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The list data
 */
const addList = async (listData, res) => {
	const list = await List.createList(listData);
	res.status(200).json(list);
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

module.exports = { addList, getListByOwnerId };
