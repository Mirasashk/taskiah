/**
 * Utility functions for handling task notifications
 */

/**
 * Determines notification type based on task properties
 * @param {Object} task - Task object
 * @returns {string} Notification type
 */
const setNotificationType = task => {
  if (task.priority === 'high') return 'important';
  if (task.dueDate) return 'dueDate';
  return 'reminder';
};

/**
 * Generates notification message based on type and task
 * @param {Object} task - Task object
 * @param {string} type - Notification type
 * @returns {string} Notification message
 */
const setMessage = (task, type) => {
  const messages = {
    important: `${task.title} is a high priority task`,
    dueDate: `${task.title} is due on ${task.dueDate}`,
    reminder: `This is a reminder for ${task.title}`,
  };
  return messages[type] || messages.reminder;
};

/**
 * Calculates notification date based on task due date
 * @param {Object} task - Task object
 * @returns {string|null} ISO date string or null
 */
const setNotifyOn = task => {
  if (!task.dueDate) return null;

  const dueDate = new Date(task.dueDate);
  dueDate.setDate(dueDate.getDate() - 1);
  return dueDate.toISOString();
};

/**
 * Creates a notification object for a task
 * @param {Object} task - Task object
 * @returns {Object} Notification object
 */
export const createTaskNotification = task => {
  const type = setNotificationType(task);
  const message = setMessage(task, type);
  const notifyOn = setNotifyOn(task);

  return {
    message,
    type,
    notifyOn,
  };
};
