import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, Card, Icon, IconButton, Portal, List} from 'react-native-paper';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import {useTheme} from 'react-native-paper';
import {useTaskContext} from '../../context/TaskContext';
import TaskFilterModal from './TaskFilterModal';
import ScrollableRefresh from '../PullToRefresh';

const createStyles = theme =>
	StyleSheet.create({
		actionButtons: {
			flexDirection: 'row',
			paddingRight: 20,
		},
		actionButton: {
			marginHorizontal: 0,
			paddingHorizontal: 0,
		},
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

const ListActions = ({onFilterPress, onSortPress, styles}) => (
	<View style={styles.actionButtons}>
		<IconButton
			icon="sort"
			onPress={onSortPress}
			style={styles.actionButton}
		/>
		<IconButton
			icon="filter"
			onPress={onFilterPress}
			style={styles.actionButton}
		/>
	</View>
);

ListActions.propTypes = {
	onFilterPress: PropTypes.func.isRequired,
	onSortPress: PropTypes.func.isRequired,
};

const EmptyState = () => (
	<View style={styles.emptyContainer}>
		<Text variant="titleMedium">No tasks found</Text>
	</View>
);

const TaskList = () => {
	const theme = useTheme();
	const {tasks, filteredTasks, filter, getTasks} = useTaskContext();
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [expandTasksList, setExpandTasksList] = useState(true);
	const [expandCompletedList, setExpandCompletedList] = useState(false);
	const [completedTasksCount, setCompletedTasksCount] = useState(
		tasks.filter(task => task.status === 'completed').length,
	);
	const styles = createStyles(theme);

	const handleRefresh = async () => {
		await getTasks();
		await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
	};

	useEffect(() => {
		console.log('expandCompletedList', expandCompletedList);
	}, [expandCompletedList]);

	const handleToggleComplete = taskId => {
		console.log('taskId', taskId);
	};

	const handleDelete = taskId => {
		console.log('taskId', taskId);
	};

	const renderFilterModal = () => {
		console.log('renderFilterModal');
		setShowFilterModal(true);
	};

	const renderSortModal = () => {
		console.log('renderSortModal');
	};

	if (!tasks?.length) {
		return (
			<View style={styles.emptyContainer}>
				<Text variant="titleMedium">No tasks found</Text>
			</View>
		);
	}

	return (
		<ScrollableRefresh onRefresh={handleRefresh}>
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
							<ListActions
								onFilterPress={renderFilterModal}
								onSortPress={renderSortModal}
								styles={styles}
							/>
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
							tasks.map(
								task =>
									task.status === 'active' && (
										<TaskItem
											key={task.id}
											task={task}
											onToggleComplete={
												handleToggleComplete
											}
											onDelete={handleDelete}
										/>
									),
							)
						)}
					</Card.Content>
				</Card>
				<Card
					style={styles.card}
					onPress={() =>
						setExpandCompletedList(!expandCompletedList)
					}>
					<Card.Title
						title={`Completed Tasks (${completedTasksCount}) `}
						titleStyle={{
							paddingLeft: 10,
							paddingTop: 5,
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 20,
						}}
						onPress={() =>
							setExpandCompletedList(!expandCompletedList)
						}
					/>
					{expandCompletedList && (
						<Card.Content>
							{filteredTasks.length > 0 ? (
								<View>
									<Text variant="titleMedium">{filter}</Text>
									{filteredTasks.map(
										task =>
											task.status === 'completed' && (
												<TaskItem
													key={task.id}
													task={task}
													onToggleComplete={
														handleToggleComplete
													}
													onDelete={handleDelete}
												/>
											),
									)}
								</View>
							) : (
								tasks.map(
									task =>
										task.status === 'completed' && (
											<TaskItem
												key={task.id}
												task={task}
												onToggleComplete={
													handleToggleComplete
												}
												onDelete={handleDelete}
											/>
										),
								)
							)}
						</Card.Content>
					)}
				</Card>
				<TaskFilterModal
					visible={showFilterModal}
					onDismiss={() => setShowFilterModal(false)}
				/>
			</View>
		</ScrollableRefresh>
	);
};

export default TaskList;
