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
router.post('/', async (req, res) => {
	await addUser(req.body, res);
});

router.get('/search', async (req, res) => {
	const query = req.query.query;
	await searchUsers(query, res);
});

router.post('/invites', async (req, res) => {
	const email = req.body.email;
	const message = req.body.message;
	await inviteUser(email, message, res);
});

router.post('/:id/biometric/keys', async (req, res) => {
	const userId = req.params.id;
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

router.get('/:id/devices/:deviceId', async (req, res) => {
	const deviceId = req.params.deviceId;
	const userId = req.params.id;
	await checkDevice(deviceId, userId, res);
});

router.get('/', async (req, res) => {
	const userIds = req.query.ids;
	await getUsersByUserIds(userIds, res);
});

router.get('/:id', async (req, res) => {
	await getUser(req.params.id, res);
});

router.put('/:id', async (req, res) => {
	const userId = req.params.id;
	const user = req.body;
	await updateUser(userId, user, res);
});

router.put('/:id/preferences', async (req, res) => {
	const userId = req.params.id;
	const preferences = req.body;
	await updateUserPreferences(userId, preferences, res);
});

module.exports = router;
