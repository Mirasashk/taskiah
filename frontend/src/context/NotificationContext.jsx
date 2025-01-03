// NotificationContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { notificationService } from '../services/notificationApi';
import { useUser } from './UserContext';
import { useTaskContext } from './TaskContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);
	const { userData } = useUser();
	const { tasks } = useTaskContext();

	useEffect(() => {
		getNotifications();
	}, [tasks]);

	const getNotifications = async () => {
		// get all notifications for the user by iterating through the tasks
		// filter out the ones that are not for the current task
		// sort them by notifyOn date
		// set the notifications
		const notifications = [];
		tasks.forEach((task) => {
			if (task.notifications) {
				notifications.push(task.notifications);
			}
		});
		notifications.sort(
			(a, b) => new Date(b.notifyOn) - new Date(a.notifyOn)
		);
		setNotifications(notifications);
	};

	const deleteNotification = async (taskId) => {
		const res = await notificationService.deleteNotification(taskId);
		setNotifications(notifications.filter((n) => n.taskId !== taskId));
	};

	const value = {
		notifications,
		setNotifications,
		getNotifications,
		deleteNotification,
	};

	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotificationContext = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error(
			'useNotificationContext must be used within a NotificationProvider'
		);
	}
	return context;
};
