import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
	Card,
	Portal,
	Modal,
	useTheme,
	Button,
	Text,
	Dialog,
} from 'react-native-paper';
import {Calendar} from 'react-native-calendars';
import useCalendarTheme from '../../theme/calendarTheme';
import {TimePickerModal} from 'react-native-paper-dates';

const DateTimePicker = ({visible, onDismiss, date, onDateChange}) => {
	const theme = useTheme();
	const calendarTheme = useCalendarTheme();
	const [selectedDate, setSelectedDate] = useState(date);
	const [time, setTime] = useState();
	const [timePickerVisible, setTimePickerVisible] = useState(false);
	const [errorDialogVisible, setErrorDialogVisible] = useState(false);

	const handleTimeConfirm = ({hours, minutes}) => {
		setTime({hours, minutes});
		setTimePickerVisible(false);
	};

	const handleSubmit = () => {
		if (time && selectedDate) {
			const date = new Date(
				`${selectedDate}T${time.hours}:${time.minutes}`,
			);
			onDateChange(date);
			onDismiss();
		} else {
			setErrorDialogVisible(true);
		}
	};

	const renderErrorDialog = () => (
		<Dialog
			visible={errorDialogVisible}
			onDismiss={() => setErrorDialogVisible(false)}>
			<Dialog.Title>Error</Dialog.Title>
			<Dialog.Content>
				<Text>Please select a date and time</Text>
			</Dialog.Content>
		</Dialog>
	);

	const styles = StyleSheet.create({
		modal: {
			alignItems: 'center',
			justifyContent: 'center',
		},
		card: {
			width: '80%',
			paddingBottom: 20,
			backgroundColor: theme.colors.surface,
			paddingHorizontal: 0,
			paddingVertical: 0,
		},
		cardContent: {
			paddingHorizontal: 5,
			paddingVertical: 5,
		},
		timePicker: {
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
		},
		timeText: {
			color: theme.colors.onSurface,
			borderWidth: 1,
			borderColor: theme.colors.onSurface,
			borderRadius: 5,
			padding: 5,
		},
		confirmButton: {
			marginTop: 10,
			backgroundColor: theme.colors.primary,
			width: 100,
		},
	});

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={onDismiss}
				contentContainerStyle={styles.modal}>
				<Card style={styles.card}>
					<Card.Content style={styles.cardContent}>
						<Calendar
							onDayPress={day => setSelectedDate(day.dateString)}
							style={styles.calendar}
							theme={calendarTheme}
							markedDates={{
								[selectedDate]: {selected: true},
							}}
						/>
						<View>
							<View style={{alignItems: 'flex-start'}}>
								<Button
									onPress={() => setTimePickerVisible(true)}
									textColor={theme.colors.onSurface}
									mode="text"
									icon="clock-outline">
									{time ? (
										<Text style={styles.timeText}>
											{`${convertTo12HourFormat(
												time.hours,
											)}:${time.minutes} ${
												time.hours >= 12 ? 'PM' : 'AM'
											}`}
										</Text>
									) : (
										'Pick time'
									)}
								</Button>
							</View>
							<TimePickerModal
								visible={timePickerVisible}
								onDismiss={() => setTimePickerVisible(false)}
								onConfirm={handleTimeConfirm}
								hours={12}
								minutes={30}
								style={styles.timePicker}
							/>
							<View style={{alignItems: 'center'}}>
								<Button
									onPress={handleSubmit}
									icon="check"
									mode="text"
									textColor={theme.colors.onPrimary}
									style={styles.confirmButton}>
									Confirm
								</Button>
							</View>
						</View>
					</Card.Content>
				</Card>
			</Modal>
			{renderErrorDialog()}
		</Portal>
	);
};

const convertTo12HourFormat = hours => {
	return hours % 12 || 12;
};

export default DateTimePicker;
