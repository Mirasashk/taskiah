// mobileApp/src/screens/TaskDetailScreen.jsx
import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
	Text,
	Card,
	Button,
	TextInput,
	Icon,
	Portal,
	useTheme,
	FAB,
} from 'react-native-paper';
import {useTaskContext} from '../context/TaskContext';
import {useRoute} from '@react-navigation/native';
import TaskEditDiaglogRadio from '../components/task/TaskEditDiaglogRadio';
import {AuthContext} from '../context/AuthContext';
import DateTimePicker from '../components/common/DateTimePicker';
import {useNavigation} from '@react-navigation/native';
const TaskDetailScreen = () => {
	const {updateTask} = useTaskContext();
	const theme = useTheme();
	const {user} = useContext(AuthContext);
	const route = useRoute();
	const navigation = useNavigation();
	const {task} = route.params;

	const [taskState, setTaskState] = useState(task);
	const [showStatus, setShowStatus] = useState(false);
	const [showPriority, setShowPriority] = useState(false);
	const [showCategory, setShowCategory] = useState(false);
	const [showTag, setShowTag] = useState(false);

	const [showDueDate, setShowDueDate] = useState(false);
	const [dueDate, setDueDate] = useState(
		task.dueDate ? new Date(task.dueDate) : null,
	);

	useEffect(() => {
		setTaskState(task);
		console.log('taskState: ', taskState);
	}, [task]);

	useEffect(() => {
		console.log('dueDate: ', dueDate);
		if (dueDate) {
			setTaskState({...taskState, dueDate: dueDate.toISOString()});
		}
	}, [dueDate]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 16,
		},
		card: {
			marginBottom: 16,
			backgroundColor: theme.colors.surface,
		},
		description: {
			marginVertical: 16,
		},
		status: {
			marginVertical: 8,
		},
		input: {
			marginVertical: 0,
			paddingVertical: 0,
			paddingHorizontal: 0,
			backgroundColor: theme.colors.surface,
		},
		fabLbel: {
			fontSize: 24,
		},
	});

	const STATUS_OPTIONS = [
		{label: 'Active', value: 'active'},
		{label: 'Completed', value: 'completed'},
		{label: 'Deleted', value: 'deleted'},
	];

	const CATEGORY_OPTIONS = user.categories
		? Object.values(user.tags).map(category => ({
				label: category.name,
				value: category.name,
		  }))
		: [
				{
					label: 'You do not have any categories click here to add one',
					value: 'none',
				},
		  ];

	const TAG_OPTIONS = user.tags
		? Object.values(user.tags).map(tag => ({
				label: tag.name,
				value: tag.name,
		  }))
		: [
				{
					label: 'You do not have any tags click here to add one',
					value: 'none',
				},
		  ];

	const PRIORITY_OPTIONS = [
		{label: 'Low', value: 'low'},
		{label: 'Medium', value: 'medium'},
		{label: 'High', value: 'high'},
	];

	const handleStatusChange = value => {
		setTaskState({...taskState, status: value});
		setShowStatus(false);
	};

	const handlePriorityChange = value => {
		setTaskState({...taskState, priority: value});
		setShowPriority(false);
	};

	const handleCategoryChange = value => {
		console.log(value);
		setTaskState({...taskState, category: value});
		setShowCategory(false);
	};

	const handleTagChange = value => {
		console.log(value);
		setTaskState({...taskState, tags: value});
		setShowTag(false);
	};

	const handleUpdate = () => {
		updateTask(task.id, taskState);
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<Card.Content>
					<TextInput
						mode="contained"
						value={taskState.title}
						activeUnderlineColor={theme.colors.primary}
						underlineColor={theme.colors.surface}
						contentStyle={{padding: 0, margin: 0}}
						onChangeText={text =>
							setTaskState({...taskState, title: text})
						}
						style={[styles.input, {paddingLeft: 10, fontSize: 28}]}
					/>
					<TextInput
						mode="contained"
						value={taskState.description}
						activeUnderlineColor={theme.colors.primary}
						underlineColor={theme.colors.surface}
						numberOfLines={10}
						multiline={true}
						onChangeText={text =>
							setTaskState({...taskState, description: text})
						}
						left={
							<TextInput.Icon
								icon="text"
								size={16}
								color={theme.colors.onSurface}
								style={{
									marginLeft: 0,
									paddingLeft: 0,
									position: 'absolute',

									right: 0,
									borderWidth: 0,
								}}
							/>
						}
						style={styles.input}
					/>

					<View style={{gap: 10}}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginTop: 10,
								gap: 10,
							}}
							onPress={() => setShowStatus(true)}>
							<Text style={{paddingLeft: 10}}>Status:</Text>
							<Text
								onPress={() => setShowStatus(true)}
								style={{}}>
								{taskState.status.charAt(0).toUpperCase() +
									taskState.status.slice(1)}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginTop: 10,
								gap: 10,
							}}
							onPress={() => setShowPriority(true)}>
							<Text style={{paddingLeft: 10}}>Priority:</Text>
							<Text
								onPress={() => setShowPriority(true)}
								style={{}}>
								{taskState.priority.charAt(0).toUpperCase() +
									taskState.priority.slice(1)}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								paddingTop: 10,
								gap: 10,
								paddingLeft: 10,
							}}>
							<Text>Category: </Text>
							<Text
								onPress={() => setShowCategory(true)}
								style={{color: theme.colors.primary}}>
								{taskState.category
									? taskState.category
									: 'Add category'}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								paddingTop: 10,
								gap: 10,
								paddingLeft: 10,
							}}>
							<Text>Tags: </Text>
							<Text
								onPress={() => setShowTag(true)}
								style={{color: theme.colors.primary}}>
								{taskState.tag ? taskState.tag : 'Add tag'}
							</Text>
						</View>
						<TouchableOpacity
							style={{
								flexDirection: 'row',
								gap: 10,
								marginTop: 10,
								paddingLeft: 10,
							}}
							onPress={() => setShowDueDate(true)}>
							<Icon
								source="calendar-clock"
								size={20}
								color={theme.colors.onSurface}
							/>
							<Text>
								{dueDate != null
									? `${dueDate.toLocaleDateString()} at ${dueDate.toLocaleTimeString()}`
									: 'Set Due Date'}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={{marginTop: 50}}>
						<Button
							mode="contained"
							onPress={handleUpdate}
							style={{width: '50%', alignSelf: 'center'}}>
							Update
						</Button>
					</View>
				</Card.Content>
			</Card>
			<FAB
				icon="check"
				size="small"
				label="Mark Complete"
				style={[
					{
						position: 'absolute',
						borderRadius: 100,
						bottom: 16,
						right: 16,
					},
				]}
			/>
			{showDueDate && (
				<DateTimePicker
					visible={showDueDate}
					onDismiss={() => setShowDueDate(false)}
					date={dueDate}
					onDateChange={setDueDate}
				/>
			)}
			<Portal>
				<TaskEditDiaglogRadio
					title="Status"
					options={STATUS_OPTIONS}
					onValueChange={handleStatusChange}
					value={taskState.status}
					visible={showStatus}
					onDismiss={() => setShowStatus(false)}
				/>
			</Portal>
			<Portal>
				<TaskEditDiaglogRadio
					title="Priority"
					options={PRIORITY_OPTIONS}
					onValueChange={handlePriorityChange}
					value={taskState.priority}
					visible={showPriority}
					onDismiss={() => setShowPriority(false)}
				/>
			</Portal>
			<Portal>
				<TaskEditDiaglogRadio
					title="Tags"
					options={TAG_OPTIONS}
					onValueChange={handleTagChange}
					value={taskState.tag}
					visible={showTag}
					onDismiss={() => setShowTag(false)}
				/>
			</Portal>
			<Portal>
				<TaskEditDiaglogRadio
					title="Category"
					options={CATEGORY_OPTIONS}
					onValueChange={handleCategoryChange}
					value={taskState.category}
					visible={showCategory}
					onDismiss={() => setShowCategory(false)}
				/>
			</Portal>
		</View>
	);
};

export default TaskDetailScreen;
