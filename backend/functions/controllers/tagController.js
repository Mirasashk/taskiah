/**
 * Tag controller
 * @module controllers/tagController
 */

const Tag = require('../models/tagModel');

/**
 * Adds a new tag to a task
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The tag data
 */
const addTag = async (tag, res) => {
	const tagId = await Tag.createTag(tag);
	res.status(200).json({
		message: 'Tag added successfully',
		tagId: tagId,
	});
};

/**
 * Fetches tags for a user
 * @param {string} id - The ID of the user or the list
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The tags data
 */
const getTags = async (id, res) => {
	const tags = await Tag.getTagsByOwnerId(id);
	res.status(200).json(tags);
};

/**
 * Deletes a tag
 * @param {string} id - The ID of the tag
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The tag data
 */
const deleteTag = async (id, res) => {
	const tag = await Tag.deleteTag(id);
	res.status(200).json(tag);
};

module.exports = { addTag, getTags, deleteTag };
