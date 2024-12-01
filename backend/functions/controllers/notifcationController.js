const { db } = require('../config/firebase');
const Notification = require('../models/notificationModel');
const { updateTask } = require('./taskController');
const addNotification = async (req, res) => {
    console.log('req.body', req.body);
    const notificationData = {
        message: req.body.notification.message,
        type: req.body.notification.type,
        status: req.body.notification.status,
        notifyOn: req.body.notification.notifyOn,
    };

    const task = req.body.task;

    const notification = new Notification(notificationData);

    try {
        const notificationObject = notification.toJSON();

        updateTask(req.params.taskId, {
            notifications: {
                ...task.notifications,
                [notificationObject.type]: notificationObject,
            },
        });

        console.log(
            `Notification added for task ${req.params.taskId}`
        );
        res.status(200).json({
            message: 'Notification added successfully',
            notification: notificationObject,
        });
    } catch (error) {
        console.error('Error adding notification:', error);
    }
};

const getNotifications = async (req, res) => {
    console.log('taskId', req.params.taskId);
    const notifications = await db
        .collection('tasks')
        .doc(req.params.taskId)
        .collection('notifications')
        .get();

    res.status(200).json(
        notifications.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
    );
};

module.exports = { addNotification, getNotifications };
