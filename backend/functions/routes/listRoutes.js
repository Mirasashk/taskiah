/**
 * List routes
 * @module routes/listRoutes
 */

const express = require('express');
const router = express.Router();
const { addList } = require('../controllers/listController');

/**
 * Routes
 * @type {import('express').Router}
 */
router.post('/add', async (req, res) => {
	await addList(req.body, res);
});

module.exports = router;
