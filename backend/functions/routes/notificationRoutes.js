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
router.post('/tasks/:taskId/notifications', addNotification);
router.get('/tasks/:taskId/notifications', getNotifications);

module.exports = router;
