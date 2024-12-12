import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Checkbox, IconButton} from 'react-native-paper';
import {format} from 'date-fns';

const TaskItem = ({task, onToggleComplete, onDelete}) => {
	const formatDueDate = dueDate => {
		if (!dueDate) return null;

		// Handle Firestore Timestamp
		if (dueDate.toDate) {
			return format(dueDate.toDate(), 'MMM d, yyyy');
		}

		// Handle regular Date object
		if (dueDate instanceof Date) {
			return format(dueDate, 'MMM d, yyyy');
		}

		// Handle timestamp number
		if (typeof dueDate === 'number') {
			return format(new Date(dueDate), 'MMM d, yyyy');
		}

		return null;
	};

	return (
		<View style={styles.cardContent}>
			<View style={styles.leftContent}>
				<Checkbox
					status={task.completed ? 'checked' : 'unchecked'}
					onPress={() => onToggleComplete(task.id)}
				/>
				<View style={styles.textContainer}>
					<Text
						variant="titleMedium"
						style={[
							styles.title,
							task.completed && styles.completedText,
						]}>
						{task.title}
					</Text>
					{task.dueDate && (
						<Text variant="bodySmall" style={styles.dueDate}>
							Due: {formatDueDate(task.dueDate)}
						</Text>
					)}
				</View>
			</View>
			<IconButton
				icon="delete"
				size={20}
				onPress={() => onDelete(task.id)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		marginVertical: 4,
		marginHorizontal: 8,
	},
	cardContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	leftContent: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	textContainer: {
		marginLeft: 8,
		flex: 1,
	},
	title: {
		marginBottom: 4,
	},
	completedText: {
		textDecorationLine: 'line-through',
		color: 'gray',
	},
	dueDate: {
		color: 'gray',
	},
});

export default TaskItem;
