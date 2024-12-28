import React, {createContext, useState, useEffect, useContext} from 'react';
import {useTaskContext} from './TaskContext';
import {sortNotifications} from '../utils/notificationUtils';
/**
 * Context for managing notifications throughout the application
 * @type {React.Context}
 */
const NotificationContext = createContext();

/**
 * Provider component for notification management
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const NotificationProvider = ({children}) => {
  const {tasks} = useTaskContext();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();
  }, [tasks]);

  const getNotifications = () => {
    const newNotifications = [];
    tasks.forEach(task => {
      if (task.notifications) {
        newNotifications.push(
          ...Object.values(task.notifications).map(notification => ({
            ...notification,
            taskId: task.id,
          })),
        );
      }
    });
    setNotifications(sortNotifications([...newNotifications]));
  };

  const addNotification = message => {
    setNotifications([...notifications, message]);
  };

  const removeNotification = index => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <NotificationContext.Provider
      value={{notifications, addNotification, removeNotification}}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Custom hook to use the NotificationContext
 * @returns {Object} Notification context
 */
export const useNotification = () => {
  return useContext(NotificationContext);
};
