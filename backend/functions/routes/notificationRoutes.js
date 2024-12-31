/**
 * Notification routes
 * @module routes/notificationRoutes
 */

const express = require('express');
const router = express.Router();
const {
	addNotification,
	getNotifications,
} = require('../controllers/notifcationController');

/**
 * Routes
 * @type {import('express').Router}
 */
router.post('/add/:taskId', addNotification);
router.get('/:taskId', getNotifications);

module.exports = router;
