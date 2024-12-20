import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-paper';
import TasksScreen from '../screens/TasksScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import {SCREEN_NAMES, SCREEN_OPTIONS} from '../config/navigation';
import {getDefaultScreenOptions} from '../config/navigator.config';

const Stack = createNativeStackNavigator();

/**
 * TaskNavigator Component
 * Handles the navigation stack for task-related screens
 *
 * @component
 * @returns {React.ReactElement} A stack navigator for task-related screens
 */
const TaskNavigator = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator screenOptions={getDefaultScreenOptions(theme)}>
      <Stack.Screen
        name={SCREEN_NAMES.TASKS_HOME}
        component={TasksScreen}
        options={SCREEN_OPTIONS.TASKS_HOME}
      />
      <Stack.Screen
        name={SCREEN_NAMES.TASK_DETAIL}
        component={TaskDetailScreen}
        options={SCREEN_OPTIONS.TASK_DETAIL}
      />
    </Stack.Navigator>
  );
};

export default TaskNavigator;
