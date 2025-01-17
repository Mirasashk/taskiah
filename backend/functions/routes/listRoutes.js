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
	deleteSharedWithList,
} = require('../controllers/listController');

/**
 * Routes
 * @type {import('express').Router}
 */
router.post('/', async (req, res) => {
	await addList(req.body, res);
});

router.get('/', async (req, res) => {
	await getListByOwnerId(req.query.ownerId, res);
});

router.get('/shared', async (req, res) => {
	await getSharedWithListsByUserId(req.query.userId, res);
});

router.post('/:id/invites', async (req, res) => {
	await inviteToList(req.body, res);
});

router.get('/invites', async (req, res) => {
	await getListInviteByEmail(req.query.email, res);
});

router.put('/invites/:id/accept', async (req, res) => {
	const body = req.body;
	await acceptListInvite(req.params.id, body.listId, body.userId, res);
});

router.put('/invites/:id/reject', async (req, res) => {
	await rejectListInvite(req.params.id, res);
});

router.put('/:id', async (req, res) => {
	await updateList(req.params.id, req.body, res);
});

router.delete('/:id', async (req, res) => {
	await deleteList(req.params.id, res);
});

router.delete('/:listId/shared/:userId', async (req, res) => {
	await deleteSharedWithList(req.params.listId, req.params.userId, res);
});

module.exports = router;
