import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Checkbox, IconButton} from 'react-native-paper';
import {format} from 'date-fns';
import RoundCheckbox from 'rn-round-checkbox';
import {useTheme} from 'react-native-paper';

const TaskItem = ({task, onToggleComplete, onDelete}) => {
	const [isChecked, setIsChecked] = useState();
	const theme = useTheme();

	useEffect(() => {
		console.log(task);
		if (task.status === 'completed') {
			setIsChecked(true);
		} else {
			setIsChecked(false);
		}
	}, [task]);

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

	const handleToggleComplete = () => {
		console.log('toggle complete');
		setIsChecked(!isChecked);
	};

	return (
		<View style={styles.cardContent}>
			<View style={styles.leftContent}>
				<IconButton
					icon={
						isChecked
							? 'checkbox-marked-circle-outline'
							: 'checkbox-blank-circle-outline'
					}
					size={20}
					onPress={handleToggleComplete}
				/>
				<View style={styles.textContainer}>
					<Text
						variant="titleMedium"
						style={[
							styles.title,
							isChecked && styles.completedText,
						]}>
						{task.title}
					</Text>
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
	checkboxItem: {
		borderRadius: 100,
	},
});

export default TaskItem;
