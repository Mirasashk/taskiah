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
} = require('../controllers/userController');

router.post('/add', async (req, res) => {
	const user = req.body;
	await addUser(user);
	res.send('User added!');
});

router.get('/:userId', async (req, res) => {
	const userId = req.params.userId;
	const user = await getUser(userId);
	res.json(user);
});

router.put('/:userId', async (req, res) => {
	const userId = req.params.userId;
	const user = req.body;
	await updateUser(userId, user, res);
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

module.exports = router;
