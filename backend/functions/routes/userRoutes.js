/**
 * User routes
 * @module routes/userRoutes
 */

const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/userController');

/**
 * Routes
 * @type {import('express').Router}
 */
router.post('/add', async (req, res) => {
	await addUser(req.body, res);
});

router.get('/search', async (req, res) => {
	const query = req.query.query;
	await searchUsers(query, res);
});

router.post('/invite', async (req, res) => {
	const email = req.body.email;
	const message = req.body.message;
	await inviteUser(email, message, res);
});

router.post('/biometric/public-key', async (req, res) => {
	const userId = req.body.userId;
	const deviceId = req.body.deviceId;
	const publicKey = req.body.publicKey;
	const userAgent = req.headers['user-agent'];
	await updateUserPublicKey(userId, deviceId, publicKey, userAgent, res);
});

router.post('/biometric/verify', async (req, res) => {
	const deviceId = req.body.deviceId;
	const signature = req.body.signature;
	const payload = req.body.payload;
	await verifyBiometricPublicKey(deviceId, signature, payload, res);
});

router.get('/biometric/challenge', async (req, res) => {
	await getBiometricChallenge(res);
});

router.get('/biometric/check-device/:deviceId/:userId', async (req, res) => {
	const deviceId = req.params.deviceId;
	const userId = req.params.userId;
	await checkDevice(deviceId, userId, res);
});

router.get('/getUsersByUserIds', async (req, res) => {
	const userIds = req.query.userIds;
	await getUsersByUserIds(userIds, res);
});

router.get('/:userId', async (req, res) => {
	await getUser(req.params.userId, res);
});

router.put('/:userId', async (req, res) => {
	const userId = req.params.userId;
	const user = req.body;
	await updateUser(userId, user, res);
});

router.put('/:userId/preferences', async (req, res) => {
	const userId = req.params.userId;
	const preferences = req.body;
	await updateUserPreferences(userId, preferences, res);
});

module.exports = router;
