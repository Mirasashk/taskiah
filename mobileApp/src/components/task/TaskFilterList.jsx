import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {List, Icon, useTheme} from 'react-native-paper';
import TaskFilterItems from './TaskFilterItems';
import {useTaskContext} from '../../context/TaskContext';
import {useAuth} from '../../context/AuthContext';

const TaskFilterList = ({onDismiss}) => {
	const theme = useTheme();
	const {user} = useAuth();
	const {tasks, setFilter, setFilteredTasks, deletedTasks} = useTaskContext();

	const handleFilter = filter => {
		// If filter is a tag, filter tasks by tag
		if (filter.startsWith('Tag:')) {
			const tag = filter.split(':')[1].trim();
			const tasksWithTag = tasks.filter(task => task.tags === tag);
			setFilteredTasks(tasksWithTag);
			setFilter(tag);
		} else {
			switch (filter) {
				case 'all':
					setFilteredTasks([]);
					setFilter('All tasks');
					break;
				case 'today':
					setFilteredTasks(
						tasks.filter(
							task =>
								new Date(task.dueDate).toDateString() ===
								new Date().toDateString(),
						),
					);
					setFilter('Today');
					break;
				case 'important':
					setFilteredTasks(
						tasks.filter(task => task.priority === 'high'),
					);
					setFilter('Important');
					break;
				case 'deleted':
					setFilteredTasks(deletedTasks);
					setFilter('Deleted');
					break;
			}
		}
		onDismiss();
	};

	return (
		<View
			style={{
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<List.Section
				style={{
					width: '70%',
				}}>
				<TaskFilterItems
					count={tasks.length}
					title="All active tasks"
					icon="inbox-full"
					onPress={() => handleFilter('all')}
				/>
				<TaskFilterItems
					count={
						tasks.filter(
							task =>
								new Date(task.dueDate).toDateString() ===
								new Date().toDateString(),
						).length
					}
					title="Today"
					icon="calendar-month"
					onPress={() => handleFilter('today')}
				/>
				<TaskFilterItems
					count={
						tasks.filter(task => task.priority === 'high').length
					}
					title="Important"
					icon="star"
					onPress={() => handleFilter('important')}
				/>
				<TaskFilterItems
					count={deletedTasks.length}
					title="Deleted"
					icon="trash-can"
					onPress={() => handleFilter('deleted')}
				/>
				<TouchableOpacity>
					<List.Accordion
						title="Tags"
						titleStyle={{
							color: theme.colors.onSurface,
						}}
						left={() => (
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
								}}>
								<Icon source="tag" size={24} />
							</View>
						)}
						style={{
							paddingLeft: 15,
						}}>
						{Object.values(user?.tags || {}).map(tag => (
							<TaskFilterItems
								key={tag.name}
								count={
									tasks.filter(task => task.tags === tag.name)
										.length
								}
								title={tag.name}
								color={tag.color}
								onPress={() => handleFilter(`Tag: ${tag.name}`)}
							/>
						))}
					</List.Accordion>
				</TouchableOpacity>
			</List.Section>
		</View>
	);
};

export default TaskFilterList;
