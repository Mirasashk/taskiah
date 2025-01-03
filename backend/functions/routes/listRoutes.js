/**
 * List routes
 * @module routes/listRoutes
 */

const express = require('express');
const router = express.Router();
const {
	addList,
	getListByOwnerId,
	getSharedWithListsByEmail,
	inviteToList,
	getListInviteByEmail,
	acceptListInvite,
	rejectListInvite,
} = require('../controllers/listController');

/**
 * Routes
 * @type {import('express').Router}
 */
router.post('/add', async (req, res) => {
	await addList(req.body, res);
});

router.get('/:ownerId', async (req, res) => {
	await getListByOwnerId(req.params.ownerId, res);
});

router.get('/shared/:email', async (req, res) => {
	await getSharedWithListsByEmail(req.params.email, res);
});

router.post('/invite', async (req, res) => {
	console.log('invite', req.body);
	await inviteToList(req.body, res);
});

router.get('/invite/:email', async (req, res) => {
	await getListInviteByEmail(req.params.email, res);
});

router.put('/invite/:id/accept', async (req, res) => {
	const body = req.body;
	await acceptListInvite(req.params.id, body.listId, body.userId, res);
});

router.put('/invite/:id/reject', async (req, res) => {
	console.log('id', req.params.id);
	await rejectListInvite(req.params.id, res);
});

module.exports = router;
