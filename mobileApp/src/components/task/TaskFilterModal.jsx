import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Icon, Text, useTheme} from 'react-native-paper';
import Modal from 'react-native-modal';
import TaskFilterList from './TaskFilterList';

const TaskFilterModal = ({visible, onDismiss}) => {
	const theme = useTheme();

	const styles = StyleSheet.create({
		container: {
			width: '100%',
			height: '80%',
		},
		modalContainer: {
			backgroundColor: theme.colors.surface,
			width: '100%',
			height: '100%',
		},
		modalContent: {
			justifyContent: 'center',
			alignItems: 'center',
		},
	});

	return (
		<Modal
			isVisible={visible}
			onDismiss={onDismiss}
			animationIn="slideInUp"
			animationInTiming={500}
			animationOut="slideOutDown"
			animationOutTiming={500}
			avoidKeyboard={true}
			swipeDirection={['down', 'up']}
			swipeThreshold={200}
			coverScreen={false}
			onSwipeComplete={() => onDismiss()}
			onBackdropPress={() => onDismiss()}
			style={{
				margin: 0,
				borderTopLeftRadius: 20,
				borderTopRightRadius: 20,
			}}>
			<Card style={styles.modalContainer}>
				<Card.Title title="Filter" />
				<Card.Content>
					<TaskFilterList onDismiss={onDismiss} />
				</Card.Content>
			</Card>
		</Modal>
	);
};

export default TaskFilterModal;
