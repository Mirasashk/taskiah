import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {FAB, Portal, Modal, TextInput, Button, Text} from 'react-native-paper';
import TaskList from '../components/task/TaskList';
import {useTaskContext} from '../context/TaskContext';
const TasksScreen = () => {
	const {tasks, addTask, deleteTask} = useTaskContext();
	const [visible, setVisible] = useState(false);
	const [newTaskTitle, setNewTaskTitle] = useState('');

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const handleAddTask = () => {
		// Implement task creation logic
		hideModal();
		setNewTaskTitle('');
	};

	const handleToggleComplete = taskId => {
		// Implement toggle complete logic
	};

	const handleDeleteTask = taskId => {
		// Implement delete task logic
	};

	return (
		<View style={styles.container}>
			<TaskList
				tasks={tasks}
				onToggleComplete={handleToggleComplete}
				onDelete={handleDeleteTask}
			/>

			<Portal>
				<Modal
					visible={visible}
					onDismiss={hideModal}
					contentContainerStyle={styles.modalContainer}>
					<Text variant="titleLarge" style={styles.modalTitle}>
						Add New Task
					</Text>
					<TextInput
						label="Task Title"
						value={newTaskTitle}
						onChangeText={setNewTaskTitle}
						mode="outlined"
						style={styles.input}
					/>
					<View style={styles.buttonContainer}>
						<Button
							mode="outlined"
							onPress={hideModal}
							style={styles.button}>
							Cancel
						</Button>
						<Button
							mode="contained"
							onPress={handleAddTask}
							style={styles.button}>
							Add Task
						</Button>
					</View>
				</Modal>
			</Portal>

			<FAB icon="plus" style={styles.fab} onPress={showModal} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
	modalContainer: {
		backgroundColor: 'white',
		padding: 20,
		margin: 20,
		borderRadius: 8,
	},
	modalTitle: {
		marginBottom: 16,
	},
	input: {
		marginBottom: 16,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	button: {
		marginLeft: 8,
	},
});

export default TasksScreen;
