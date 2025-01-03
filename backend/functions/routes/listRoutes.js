/**
 * List routes
 * @module routes/listRoutes
 */

const express = require('express');
const router = express.Router();
const { addList, getListByOwnerId } = require('../controllers/listController');

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

module.exports = router;
