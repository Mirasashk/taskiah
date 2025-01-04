/**
 * Tag routes
 * @module routes/tagRoutes
 */

const express = require('express');
const router = express.Router();
const { addTag, getTags } = require('../controllers/tagController');

/**
 * Routes
 * @type {import('express').Router}
 */
router.post('/add', async (req, res) => {
	await addTag(req.body, res);
});
router.get('/:userId', async (req, res) => {
	await getTags(req.params.userId, res);
});

module.exports = router;
