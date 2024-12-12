// mobileApp/src/screens/TaskDetailScreen.jsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Card, Button, TextInput, Icon} from 'react-native-paper';
import {useTaskContext} from '../context/TaskContext';
import {useRoute} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import {FAB} from 'react-native-paper';

const TaskDetailScreen = () => {
	const route = useRoute();
	const {task} = route.params;
	const {updateTask} = useTaskContext();
	const theme = useTheme();

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
	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<Card.Content>
					<TextInput
						mode="contained"
						value={task.title}
						activeUnderlineColor={theme.colors.primary}
						underlineColor={theme.colors.surface}
						contentStyle={{padding: 0, margin: 0}}
						onChangeText={text => setTask({...task, title: text})}
						style={[styles.input, {paddingLeft: 10, fontSize: 28}]}
					/>
					<TextInput
						mode="contained"
						value={task.description}
						activeUnderlineColor={theme.colors.primary}
						underlineColor={theme.colors.surface}
						numberOfLines={10}
						multiline={true}
						onChangeText={text =>
							setTask({...task, description: text})
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
		</View>
	);
};

export default TaskDetailScreen;
