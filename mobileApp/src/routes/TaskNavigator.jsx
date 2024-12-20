import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-paper';
import TasksScreen from '../screens/TasksScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import {SCREEN_NAMES, SCREEN_OPTIONS} from '../config/navigation';

const Stack = createNativeStackNavigator();

const TaskNavigator = () => {
  const theme = useTheme();

  const defaultScreenOptions = {
    headerShown: false,
    contentStyle: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
  };

  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
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
