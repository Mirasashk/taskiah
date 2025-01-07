import React, { useState, useEffect } from 'react';
import { FiCheckSquare, FiClock, FiAlertTriangle } from 'react-icons/fi';
import StatsCard from '../components/dashboard/StatsCard';
import NotificationCard from '../components/dashboard/NotificationCard';
import TaskCalendar from '../components/dashboard/TaskCalendar';
import { useTaskContext } from '../context/TaskContext';
import { useUser } from '../context/UserContext';
import { useNotificationContext } from '../context/NotificationContext';

const DashboardPage = () => {
	const { tasks } = useTaskContext();
	const { userData } = useUser();
	const {
		notifications,
		setNotifications,
		getNotifications,
		sharedListNotifications,
	} = useNotificationContext();

	useEffect(() => {
		getNotifications();
	}, [tasks]);

	const activeTasks = tasks.filter((task) => task.status === 'active');

	// Get the start of the current week (Monday)
	const now = new Date();
	const currentWeekStart = new Date(now);
	currentWeekStart.setDate(
		now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)
	); // Adjust to Monday
	currentWeekStart.setHours(0, 0, 0, 0);

	const completedThisWeek = tasks.filter(
		(task) =>
			task.status === 'completed' &&
			new Date(task.completedAt) >= currentWeekStart
	);

	const calculateTrend = (currentCount, previousCount) => {
		if (previousCount === 0) return { trend: 'up', value: 100 };
		const percentageChange =
			((currentCount - previousCount) / previousCount) * 100;
		return {
			trend: percentageChange >= 0 ? 'up' : 'down',
			value: Math.abs(Math.round(percentageChange)),
		};
	};

	const getTasksInTimeRange = (startDate, endDate) => {
		return tasks.filter((task) => {
			const createdAt = new Date(task.createdAt);
			return createdAt >= startDate && createdAt < endDate;
		});
	};

	const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
	const twoWeeksAgo = new Date(now - 14 * 24 * 60 * 60 * 1000);

	const currentWeekActiveTasks = getTasksInTimeRange(oneWeekAgo, now).filter(
		(task) => task.status === 'active'
	);
	const previousWeekActiveTasks = getTasksInTimeRange(
		twoWeeksAgo,
		oneWeekAgo
	).filter((task) => task.status === 'active');
	const activeTrendData = calculateTrend(
		currentWeekActiveTasks.length,
		previousWeekActiveTasks.length
	);

	const currentWeekCompletedTasks = getTasksInTimeRange(
		oneWeekAgo,
		now
	).filter((task) => task.status === 'completed');
	const previousWeekCompletedTasks = getTasksInTimeRange(
		twoWeeksAgo,
		oneWeekAgo
	).filter((task) => task.status === 'completed');
	const completedTrendData = calculateTrend(
		currentWeekCompletedTasks.length,
		previousWeekCompletedTasks.length
	);

	const currentOverdueTasks = activeTasks.filter(
		(task) => new Date(task.dueDate) < now
	).length;
	const previousOverdueTasks = activeTasks.filter((task) => {
		const dueDate = new Date(task.dueDate);
		return dueDate < oneWeekAgo && dueDate >= twoWeeksAgo;
	}).length;
	const overdueTrendData = calculateTrend(
		currentOverdueTasks,
		previousOverdueTasks
	);

	const handleDismissNotification = (id) => {
		setNotifications(notifications.filter((n) => n.id !== id));
	};

	return (
		<div className='container mx-auto p-6'>
			<h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
				Dashboard
			</h1>

			{/* Stats Section */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
				<StatsCard
					title='Active Tasks'
					value={activeTasks.length}
					icon={<FiClock className='h-6 w-6 text-blue-500' />}
					trend={activeTrendData.trend}
					trendValue={activeTrendData.value}
				/>
				<StatsCard
					title='Completed This Week'
					value={currentWeekCompletedTasks.length}
					icon={<FiCheckSquare className='h-6 w-6 text-green-500' />}
					trend={completedTrendData.trend}
					trendValue={completedTrendData.value}
				/>
				<StatsCard
					title='Overdue Tasks'
					value={currentOverdueTasks}
					icon={<FiAlertTriangle className='h-6 w-6 text-red-500' />}
					trend={overdueTrendData.trend}
					trendValue={overdueTrendData.value}
				/>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Calendar Section */}
				<div className='lg:col-span-2'>
					<TaskCalendar tasks={tasks} />
				</div>

				{/* Notifications Section */}
				<div className='space-y-4'>
					<h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
						Notifications
					</h2>
					{notifications
						.slice(0, 8) // Limit to 8 notifications
						.map((notification) => {
							const newNotification =
								Object.values(notification)[0];
							const thisNotification = {
								...newNotification,
							};

							return (
								<NotificationCard
									key={thisNotification.createdAt}
									notification={thisNotification}
									onDismiss={handleDismissNotification}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
