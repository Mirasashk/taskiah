import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Card, Icon, IconButton, Portal} from 'react-native-paper';
import TaskItem from './TaskItem';
import {useTheme} from 'react-native-paper';
import {useTaskContext} from '../../context/TaskContext';
import TaskFilterModal from './TaskFilterModal';

const TaskList = () => {
	const theme = useTheme();
	const {tasks, filteredTasks, filter} = useTaskContext();
	const [showFilterModal, setShowFilterModal] = useState(false);

	const handleToggleComplete = taskId => {
		console.log('taskId', taskId);
	};

	const handleDelete = taskId => {
		console.log('taskId', taskId);
	};

	useEffect(() => {
		console.log('tasks', tasks);
		console.log('filteredTasks', filteredTasks);
		console.log('filter', filter);
	}, [tasks, filteredTasks]);

	const renderFilterModal = () => {
		console.log('renderFilterModal');
		setShowFilterModal(true);
	};

	const renderSortModal = () => {
		console.log('renderSortModal');
	};

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
				<Card.Title
					title="Tasks"
					titleStyle={{
						paddingLeft: 10,
						paddingTop: 5,
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 20,
					}}
					right={() => (
						<View
							style={{
								flexDirection: 'row',
								paddingRight: 20,
							}}>
							<IconButton
								icon="sort"
								onPress={() => renderSortModal()}
								style={{
									marginHorizontal: 0,
									paddingHorizontal: 0,
								}}
							/>
							<IconButton
								icon="filter"
								onPress={() => renderFilterModal()}
								style={{
									marginHorizontal: 0,
									paddingHorizontal: 0,
								}}
							/>
						</View>
					)}
				/>
				<Card.Content>
					{filteredTasks.length > 0 ? (
						<View>
							<Text variant="titleMedium">{filter}</Text>
							{filteredTasks.map(task => (
								<TaskItem
									key={task.id}
									task={task}
									onToggleComplete={handleToggleComplete}
									onDelete={handleDelete}
								/>
							))}
						</View>
					) : (
						tasks.map(task => (
							<TaskItem
								key={task.id}
								task={task}
								onToggleComplete={handleToggleComplete}
								onDelete={handleDelete}
							/>
						))
					)}
				</Card.Content>
			</Card>

			<TaskFilterModal
				visible={showFilterModal}
				onDismiss={() => setShowFilterModal(false)}
			/>
		</View>
	);
};

export default TaskList;
