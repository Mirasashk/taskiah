/**
 * Sorts notifications by createdAt date
 * @param {Array} notifications - The notifications to sort
 * @returns {Array} Sorted notifications
 */
export const sortNotifications = notifications => {
  const sortedNotifications = notifications.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  for (const notification of sortedNotifications) {
    notification.priority = setPriority(notification);
  }
  return sortedNotifications.sort((a, b) => b.priority - a.priority);
};

/**
 * Sets the priority of a notification
 * @param {Object} notification - The notification to set the priority for
 * @returns {Number} The priority of the notification
 */
export const setPriority = notification => {
  if (notification.type === 'important') {
    if (notification.status === 'unread') {
      return 10;
    }
    return 7;
  }
  if (notification.type === 'dueDate') {
    if (notification.status === 'unread') {
      return 10;
    }
    return 7;
  }
  if (notification.status === 'unread') {
    return 5;
  }

  return 0;
};
