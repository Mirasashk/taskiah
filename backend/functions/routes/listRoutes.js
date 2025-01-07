/**
 * List routes
 * @module routes/listRoutes
 */

const express = require('express');
const router = express.Router();
const {
	addList,
	getListByOwnerId,
	getSharedWithListsByUserId,
	inviteToList,
	getListInviteByEmail,
	acceptListInvite,
	rejectListInvite,
	deleteList,
	updateList,
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

router.get('/shared/:userId', async (req, res) => {
	await getSharedWithListsByUserId(req.params.userId, res);
});

router.post('/invite', async (req, res) => {
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
	await rejectListInvite(req.params.id, res);
});

router.put('/:id/update', async (req, res) => {
	await updateList(req.params.id, req.body, res);
});

router.delete('/:id', async (req, res) => {
	await deleteList(req.params.id, res);
});

module.exports = router;
