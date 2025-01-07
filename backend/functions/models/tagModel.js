const { db } = require('../config/firebase');

/**
 * Represents a tag in the system
 * @class Tag
 * @method createTag
 * @method getTag
 * @method updateTag
 * @method deleteTag
 * @method getTagsByOwnerId
 */
class Tag {
	/**
	 * Creates a new Tag instance
	 * @param {Object} data - The tag data
	 * @param {string} data.name - The name of the tag
	 * @param {string} data.color - The color of the tag
	 * @param {number} data.priority - The priority level of the tag
	 * @param {string} data.ownerId - The ID of the tag owner
	 */
	constructor(data) {
		this.name = data.name;
		this.color = data.color;
		this.priority = data.priority;
		this.ownerId = data.ownerId;
	}

	/**
	 * Validates the tag data
	 * @throws {Error} If validation fails
	 */
	validate() {
		if (!this.name) throw new Error('Name is required');
		if (!this.color) throw new Error('Color is required');
		if (!this.priority) throw new Error('Priority is required');
		if (!this.ownerId) throw new Error('Owner ID is required');
	}

	/**
	 * Converts the tag instance to a plain object
	 * @returns {Object} The tag data as a plain object
	 */
	toJSON() {
		return {
			name: this.name,
			color: this.color,
			priority: this.priority,
			ownerId: this.ownerId,
		};
	}

	/**
	 * Creates a new tag in the database
	 * @param {Object} tagData - The tag data
	 * @returns {Promise<Object>} The created tag data
	 */
	static async createTag(tagData) {
		const tag = new Tag(tagData);
		await tag.validate();
		const tagRef = db.collection('tags').doc();

		return await db.runTransaction(async (transaction) => {
			const tagJson = tag.toJSON();
			transaction.set(tagRef, tagJson);
			return {
				id: tagRef.id,
				...tagJson,
			};
		});
	}

	/**
	 * Retrieves a tag from the database by its ID
	 * @param {string} tagId - The ID of the tag to retrieve
	 * @returns {Promise<Object>} The tag data
	 */
	static async getTag(tagId) {
		const tagRef = db.collection('tags').doc(tagId);
		const tag = await tagRef.get();
		return {
			id: tag.id,
			...tag.data(),
		};
	}

	/**
	 * Updates a tag in the database
	 * @param {string} tagId - The ID of the tag to update
	 * @param {Object} tagData - The updated tag data
	 * @returns {Promise<Object>} The updated tag data
	 */
	static async updateTag(tagId, tagData) {
		const tag = new Tag(tagData);
		await tag.validate();
		const tagRef = db.collection('tags').doc(tagId);

		return await db.runTransaction(async (transaction) => {
			const tagDoc = await transaction.get(tagRef);
			if (!tagDoc.exists) {
				throw new Error('Tag not found');
			}

			const updatedData = tag.toJSON();
			transaction.update(tagRef, updatedData);

			return {
				id: tagId,
				...updatedData,
			};
		});
	}

	/**
	 * Deletes a tag from the database
	 * @param {string} tagId - The ID of the tag to delete
	 * @returns {Promise<void>}
	 */
	static async deleteTag(tagId) {
		const tagRef = db.collection('tags').doc(tagId);
		await tagRef.delete();
		return tagRef.id;
	}

	/**
	 * Retrieves tags from the database by owner ID
	 * @param {string} ownerId - The ID of the owner to retrieve tags for
	 * @returns {Promise<Array<Object>>} The tags data
	 */
	static async getTagsByOwnerId(ownerId) {
		const tagsRef = db.collection('tags').where('ownerId', '==', ownerId);
		const tags = await tagsRef.get();
		return tags.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data(),
			};
		});
	}
}

module.exports = Tag;
