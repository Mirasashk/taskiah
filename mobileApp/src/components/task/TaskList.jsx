import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text, Card} from 'react-native-paper';
import TaskItem from './TaskItem';
import {useTheme} from 'react-native-paper';
import {useTaskContext} from '../../context/TaskContext';
const TaskList = () => {
	const theme = useTheme();
	const {tasks} = useTaskContext();

	const handleToggleComplete = taskId => {
		console.log('taskId', taskId);
	};

	const handleDelete = taskId => {
		console.log('taskId', taskId);
	};

	useEffect(() => {
		console.log('tasks', tasks);
	}, [tasks]);

	const styles = StyleSheet.create({
		listContainer: {
			paddingVertical: 8,
			flex: 1,
			paddingHorizontal: 20,
			backgroundColor: theme.colors.surfaceContainerHigh,
		},
		card: {
			marginBottom: 10,
			borderRadius: 10,

			backgroundColor: theme.colors.surfaceContainerLow,
		},
		emptyContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.colors.surfaceContainerHigh,
		},
	});

	if (!tasks?.length) {
		return (
			<View style={styles.emptyContainer}>
				<Text variant="titleMedium">No tasks found</Text>
			</View>
		);
	}

	return (
		<View style={styles.listContainer}>
			<Card style={styles.card}>
				<Card.Title title="Tasks" />
				<Card.Content>
					{tasks.map(task => (
						<TaskItem
							key={task.id}
							task={task}
							onToggleComplete={handleToggleComplete}
							onDelete={handleDelete}
						/>
					))}
				</Card.Content>
			</Card>
		</View>
	);
};

export default TaskList;
