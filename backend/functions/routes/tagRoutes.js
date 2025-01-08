/**
 * Tag routes
 * @module routes/tagRoutes
 */

const express = require('express');
const router = express.Router();
const { addTag, getTags, deleteTag } = require('../controllers/tagController');

/**
 * Routes
 * @type {import('express').Router}
 */
router.post('/', async (req, res) => {
	await addTag(req.body, res);
});

router.get('/', async (req, res) => {
	await getTags(req.query.userId, res);
});

router.delete('/:id', async (req, res) => {
	await deleteTag(req.params.id, res);
});

module.exports = router;
