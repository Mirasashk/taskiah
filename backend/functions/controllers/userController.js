/**
 * User controller
 * @module controllers/userController
 */

const User = require('../models/userModel');
const { db, storage, bucket } = require('../config/firebase');
const { auth } = require('firebase-admin');
const dotenvConfig = require('../config/dotenv.config');
const crypto = require('crypto');

/**
 * Adds a new user to the database
 * @param {Object} user - The user data
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The user data
 */
async function addUser(user, res) {
	const userId = await User.createUser(user);
	return res.json({ id: userId });
}

/**
 * Retrieves a user from the database by their ID
 * @param {string} userId - The ID of the user to retrieve
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The user data
 */
async function getUser(userId, res) {
	const userData = await User.getUser(userId);
	return res.json(userData);
}

/**
 * Updates a user in the database
 * @param {string} userId - The ID of the user to update
 * @param {Object} user - The updated user data
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The updated user data
 */
async function updateUser(userId, user, res) {
	try {
		// If email is being updated, update it in Firebase Auth first
		await auth().updateUser(userId, {
			email: user.email,
		});
		// Update user document in Firestore
		const updatedUser = await User.updateUser(userId, user);
		return res.json(updatedUser);
	} catch (error) {
		console.error('Error updating user:', error);
		return res.status(500).json({ error: 'Failed to update user' });
	}
}

/**
 * Updates a user's public key in the database
 * @param {string} userId - The ID of the user to update
 * @param {string} deviceId - The ID of the device to update
 * @param {string} publicKey - The public key to update
 * @param {string} userAgent - The user agent to update
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The updated user data
 */
async function updateUserPublicKey(
	userId,
	deviceId,
	publicKey,
	userAgent,
	res
) {
	const createDate = new Date();
	const lastUsedDate = new Date();

	try {
		const registration = await db
			.collection('deviceRegistration')
			.doc(deviceId)
			.get();

		if (registration.exists) {
			await db.collection('deviceRegistration').doc(deviceId).update({
				publicKey,
				createDate,
				lastUsedDate,
				userAgent,
				userId,
			});
			return res.json({ message: 'User public key updated' });
		} else {
			await db.collection('deviceRegistration').doc(deviceId).create({
				userId,
				publicKey,
				createDate,
				lastUsedDate,
				userAgent,
			});
		}
	} catch (error) {
		console.error('Error updating user public key:', error);
		return res
			.status(500)
			.json({ error: 'Failed to update user public key' });
	}
}

/**
 * Verifies a biometric public key
 * @param {string} deviceId - The ID of the device to verify
 * @param {string} signature - The signature to verify
 * @param {string} payload - The payload to verify
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The token
 */
async function verifyBiometricPublicKey(deviceId, signature, payload, res) {
	try {
		// Retrieve device registration
		const device = await db
			.collection('deviceRegistration')
			.doc(deviceId)
			.get();

		if (!device.exists) {
			return res.status(404).json({ error: 'Device not found' });
		}

		const publicKey = device.data().publicKey;

		// Convert the public key to PEM format
		const formattedPublicKey = formatPublicKey(publicKey);

		const verifier = crypto.createVerify('SHA256');
		verifier.update(payload);
		verifier.end();

		const isValid = verifier.verify(
			formattedPublicKey,
			signature,
			'base64'
		);

		if (isValid) {
			// Update device last used date and generate Firebase custom token
			await db
				.collection('deviceRegistration')
				.doc(deviceId)
				.update({ lastUsedDate: new Date() });

			const token = await auth().createCustomToken(device.data().userId);

			return res.json({ token });
		} else {
			return res.status(401).json({ error: 'Invalid signature' });
		}
	} catch (error) {
		console.error('Error verifying biometric key:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}

/**
 * Checks if a device is registered for a user
 * @param {string} deviceId - The ID of the device to check
 * @param {string} userId - The ID of the user to check
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The device status
 */
async function checkDevice(deviceId, userId, res) {
	try {
		const device = await db
			.collection('deviceRegistration')
			.doc(deviceId)
			.get();

		if (device.exists) {
			if (device.data().userId === userId) {
				return res.json({
					message: 'Device is registered',
					statusState: true,
				});
			} else {
				return res.json({
					message: 'Device is registered but not for this user',
					statusState: false,
				});
			}
		} else {
			return res.json({
				message: 'Device is not registered',
				statusState: false,
			});
		}
	} catch (error) {
		console.error('Error checking device:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}

/**
 * Retrieves a biometric challenge
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The challenge
 */
async function getBiometricChallenge(res) {
	const challenge = dotenvConfig.biometricChallenge;
	return res.json({ challenge });
}

/**
 * Formats a public key
 * @param {string} publicKey - The public key to format
 * @returns {string} The formatted public key
 */
function formatPublicKey(publicKey) {
	return `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
}

/**
 * Searches for users
 * @param {string} query - The query to search for
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The users
 */
async function searchUsers(query, res) {
	const users = await User.searchUsers(query);
	return res.json(users);
}

/**
 * Invites a user
 * @param {string} email - The email to invite
 * @param {string} message - The message to invite
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The invite
 * TODO: Implement this function
 */
async function inviteUser(email, message, res) {
	return res.json({ message: 'User invited' });
}

/**
 * Updates a user's preferences
 * @param {string} userId - The ID of the user to update
 * @param {Object} preferences - The preferences to update
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The updated user data
 */
async function updateUserPreferences(userId, preferences, res) {
	const user = await User.updateUserPreferences(userId, preferences);
	return res.json(user);
}

/**
 * Retrieves users by their IDs
 * @param {string} userIds - The IDs of the users to retrieve
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The users
 */
async function getUsersByUserIds(userIds, res) {
	const users = await User.getUsersByUserIds(userIds);
	return res.json(users);
}

module.exports = {
	addUser,
	getUser,
	updateUser,
	updateUserPublicKey,
	getBiometricChallenge,
	verifyBiometricPublicKey,
	checkDevice,
	searchUsers,
	inviteUser,
	updateUserPreferences,
	getUsersByUserIds,
};
