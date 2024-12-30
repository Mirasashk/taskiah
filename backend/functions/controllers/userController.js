const User = require('../models/userModel');
const { db, storage, bucket } = require('../config/firebase');
const { auth } = require('firebase-admin');
const dotenvConfig = require('../config/dotenv.config');
const crypto = require('crypto');

async function addUser(user) {
	const userModel = new User(user);
	userModel.validate();
	await db.collection('users').doc(user.id).set(userModel.toJSON());
	return userModel.toJSON();
}

async function getUser(userId) {
	const user = await db.collection('users').doc(userId).get();
	return user.data();
}

async function updateUser(userId, user, res) {
	try {
		// If email is being updated, update it in Firebase Auth first
		if (user.email) {
			try {
				await auth().updateUser(userId, {
					email: user.email,
				});
			} catch (error) {
				console.error('Error updating email in Firebase Auth:', error);
				return res.status(400).json({
					error: 'Failed to update email. ' + error.message,
				});
			}
		}

		// Update user document in Firestore
		await db
			.collection('users')
			.doc(userId)
			.update({
				...user,
				updatedAt: new Date(),
			});

		// Get the updated user data
		const userDoc = await db.collection('users').doc(userId).get();

		if (!userDoc.exists) {
			return res.status(404).json({ error: 'User not found' });
		}

		return res.json({
			id: userDoc.id,
			...userDoc.data(),
		});
	} catch (error) {
		console.error('Error updating user:', error);
		return res.status(500).json({ error: 'Failed to update user' });
	}
}

async function updateUserPublicKey(
	userId,
	deviceId,
	publicKey,
	userAgent,
	res
) {
	console.log('userId', userId);
	console.log('deviceId', deviceId);
	console.log('publicKey', publicKey);
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

async function checkDevice(deviceId, userId, res) {
	console.log('deviceId', deviceId);
	console.log('userId', userId);
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

async function getBiometricChallenge(res) {
	const challenge = dotenvConfig.biometricChallenge;
	return res.json({ challenge });
}

// Helper function to format public key
function formatPublicKey(publicKey) {
	return `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
}

module.exports = {
	addUser,
	getUser,
	updateUser,
	updateUserPublicKey,
	getBiometricChallenge,
	verifyBiometricPublicKey,
	checkDevice,
};
