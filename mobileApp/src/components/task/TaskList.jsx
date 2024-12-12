import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text, Card} from 'react-native-paper';
import TaskItem from './TaskItem';
import {useTheme} from 'react-native-paper';

const TaskList = ({tasks, onToggleComplete, onDelete}) => {
	const theme = useTheme();

	const styles = StyleSheet.create({
		listContainer: {
			paddingVertical: 8,
			flex: 1,
			paddingHorizontal: 20,
		},
		card: {
			marginBottom: 10,
			backgroundColor: theme.colors.surfaceContainerHigh,
			borderRadius: 10,
			borderWidth: 1,
			borderColor: theme.colors.outline,
		},
		emptyContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
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
							onToggleComplete={onToggleComplete}
							onDelete={onDelete}
						/>
					))}
				</Card.Content>
			</Card>
		</View>
	);
};

export default TaskList;

// <FlatList
// 	data={tasks}
// 	keyExtractor={item => item.id}
// 	renderItem={({item}) => (
// 		<TaskItem
// 			task={item}
// 			onToggleComplete={onToggleComplete}
// 			onDelete={onDelete}
// 		/>
// 	)}
// 	contentContainerStyle={styles.listContainer}
// />
