import React, {useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Calendar from '../../utils/Calendar';
const DatePicker = () => {
	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

	const handleDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowDatePicker(false);
		setDate(currentDate);
	};

	return (
		<View>
			{/* Create a calendar component */}
			<Calendar
				date={date}
				onDateChange={handleDateChange}
				visible={showDatePicker}
			/>
			<Text>DatePicker</Text>
		</View>
	);
};

export default DatePicker;
