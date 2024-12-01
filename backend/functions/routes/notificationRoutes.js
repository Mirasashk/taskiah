const express = require('express');
const router = express.Router();
const {
    addNotification,
    getNotifications,
} = require('../controllers/notifcationController');

// Routes
router.post('/add/:taskId', addNotification);
router.get('/:taskId', getNotifications);

module.exports = router;
