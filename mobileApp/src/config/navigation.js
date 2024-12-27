export const SCREEN_NAMES = {
  TASKS_HOME: 'TasksHome',
  TASK_DETAIL: 'TaskDetail',
  TASK_ADD_NEW: 'TaskAddNew',
};

export const SCREEN_OPTIONS = {
  TASKS_HOME: {
    headerShown: false,
  },
  TASK_DETAIL: {
    title: 'Task Details',
  },
  TASK_ADD_NEW: {
    title: 'Create a new task',
  },
};

/**
 * Get configuration for tab navigator
 * @param {Object} theme - Theme object
 * @returns {Object} Tab navigator configuration
 */
export const getTabNavigatorConfig = theme => ({
  tabBarActiveTintColor: theme.colors.primary,
  tabBarInactiveTintColor: theme.colors.onSurface,
  tabBarIndicatorStyle: {
    backgroundColor: theme.colors.primary,
  },
  tabBarStyle: {
    backgroundColor: theme.colors.surfaceContainerHigh,
  },
  contentStyle: {
    backgroundColor: theme.colors.surfaceContainerHigh,
  },
});
