// NotificationContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { notificationService } from '../services/notificationApi';
import { useUser } from './UserContext';
import { useTaskContext } from './TaskContext';
import { listService } from '../services/listApi';
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);
	const { userData } = useUser();
	const { tasks } = useTaskContext();
	const [sharedListNotifications, setSharedListNotifications] = useState([]);

	useEffect(() => {
		getNotifications();
	}, [tasks]);

	useEffect(() => {
		getSharedListNotifications();
	}, [userData]);

	const getNotifications = async () => {
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

	const getSharedListNotifications = async () => {
		const response = await listService.getListInvitesByEmail(
			userData.email
		);
		setSharedListNotifications(response.data);
	};

	const deleteNotification = async (taskId) => {
		const res = await notificationService.deleteNotification(taskId);
		setNotifications(notifications.filter((n) => n.taskId !== taskId));
	};

	const refreshContext = async () => {
		await getSharedListNotifications();
		await getNotifications();
	};

	const value = {
		notifications,
		setNotifications,
		sharedListNotifications,
		setSharedListNotifications,
		getNotifications,
		deleteNotification,
		refreshContext,
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
