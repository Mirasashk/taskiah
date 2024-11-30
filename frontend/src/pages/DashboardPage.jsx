import React, { useState, useEffect } from 'react';
import {
    FiCheckSquare,
    FiClock,
    FiAlertTriangle,
} from 'react-icons/fi';
import StatsCard from '../components/dashboard/StatsCard';
import NotificationCard from '../components/dashboard/NotificationCard';
import TaskCalendar from '../components/dashboard/TaskCalendar';
import { useTaskContext } from '../context/TaskContext';

const DashboardPage = () => {
    const { tasks } = useTaskContext();
    const [notifications, setNotifications] = useState([]);

    // Mock notifications data
    useEffect(() => {
        setNotifications([
            {
                id: 1,
                type: 'due_date',
                title: 'Upcoming Due Date',
                message: 'Project proposal due in 2 days',
                time: '2 hours ago',
            },
            {
                id: 2,
                type: 'priority',
                title: 'High Priority Task',
                message: 'Client meeting preparation needs attention',
                time: '5 hours ago',
            },
            {
                id: 3,
                type: 'reminder',
                title: 'Task Reminder',
                message: 'Follow up on team feedback',
                time: '1 day ago',
            },
        ]);
    }, []);

    const activeTasks = tasks.filter(
        (task) => task.status === 'active'
    );
    const completedLastWeek = tasks.filter(
        (task) =>
            task.status === 'completed' &&
            new Date(task.completedAt) >
                new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
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
                    icon={
                        <FiClock className='h-6 w-6 text-blue-500' />
                    }
                    trend='up'
                    trendValue='12'
                />
                <StatsCard
                    title='Completed This Week'
                    value={completedLastWeek.length}
                    icon={
                        <FiCheckSquare className='h-6 w-6 text-green-500' />
                    }
                    trend='up'
                    trendValue='8'
                />
                <StatsCard
                    title='Overdue Tasks'
                    value={
                        activeTasks.filter(
                            (task) =>
                                new Date(task.dueDate) < new Date()
                        ).length
                    }
                    icon={
                        <FiAlertTriangle className='h-6 w-6 text-red-500' />
                    }
                    trend='down'
                    trendValue='5'
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
                    {notifications.map((notification) => (
                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                            onDismiss={handleDismissNotification}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
