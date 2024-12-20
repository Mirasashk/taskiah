export const SCREEN_NAMES = {
  TASKS_HOME: 'TasksHome',
  TASK_DETAIL: 'TaskDetail',
};

export const SCREEN_OPTIONS = {
  TASKS_HOME: {
    headerShown: false,
  },
  TASK_DETAIL: {
    title: 'Task Details',
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
