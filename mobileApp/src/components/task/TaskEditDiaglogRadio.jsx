import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Dialog, RadioButton, useTheme} from 'react-native-paper';

const TaskEditDiaglog = ({
	title,
	options,
	onValueChange,
	value,
	visible,
	onDismiss,
}) => {
	const theme = useTheme();

	const styles = StyleSheet.create({
		dialog: {
			backgroundColor: theme.colors.surface,
			bottom: 150,
		},
	});

	return (
		<Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Content>
				<RadioButton.Group
					onValueChange={value => {
						console.log('Value: ', value);
						onValueChange(value);
					}}
					value={value}>
					{options.map(option => (
						<RadioButton.Item
							key={option.value}
							label={option.label}
							value={option.value}
						/>
					))}
				</RadioButton.Group>
			</Dialog.Content>
		</Dialog>
	);
};

export default TaskEditDiaglog;
