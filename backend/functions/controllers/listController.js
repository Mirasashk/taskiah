/**
 * Notification controller
 * @module controllers/notificationController
 */

const { db } = require('../config/firebase');
const List = require('../models/listModel');

/**
 * Adds a new notification to a task
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The notification data
 */
const addList = async (req, res) => {
	const list = await List.createList(req.body);
	res.status(200).json(list);
};

module.exports = { addList };
