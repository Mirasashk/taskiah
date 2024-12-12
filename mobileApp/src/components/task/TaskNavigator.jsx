import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TasksScreen from '../../screens/TasksScreen';
import TaskDetailScreen from '../../screens/TaskDetailScreen';
import {useTheme} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const TaskNavigator = () => {
	const theme = useTheme();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: theme.colors.surfaceContainerHigh,
				},
			}}>
			<Stack.Screen
				name="TasksHome"
				component={TasksScreen}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="TaskDetail"
				component={TaskDetailScreen}
				options={{title: 'Task Details'}}
			/>
		</Stack.Navigator>
	);
};

export default TaskNavigator;
