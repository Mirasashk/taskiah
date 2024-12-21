import React, {useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
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
import {TimePickerModal} from 'react-native-paper-dates';
import useCalendarTheme from '../../theme/calendarTheme';
import TimePickerButton from './TimePickerButton';
import {dateTimePickerStyles} from './styles/dateTimePickerStyles';

/**
 * A modal component that allows users to select both date and time
 * @component
 * @param {Object} props
 * @param {boolean} props.visible - Controls the visibility of the modal
 * @param {Function} props.onDismiss - Callback function when modal is dismissed
 * @param {Date} props.date - Initial date value
 * @param {Function} props.onDateChange - Callback function when date/time is selected
 */
const DateTimePicker = ({
  visible = false,
  onDismiss = () => {},
  date = new Date(),
  onDateChange = () => {},
}) => {
  const theme = useTheme();
  const calendarTheme = useCalendarTheme();
  const styles = dateTimePickerStyles(theme);

  const [selectedDate, setSelectedDate] = useState(date);
  const [time, setTime] = useState();
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);

  const handleTimeConfirm = ({hours, minutes}) => {
    setTime({hours, minutes});
    setTimePickerVisible(false);
  };

  const handleSubmit = () => {
    if (!time || !selectedDate) {
      setErrorDialogVisible(true);
      return;
    }

    const dateTime = new Date(`${selectedDate}T${time.hours}:${time.minutes}`);
    onDateChange(dateTime);
    onDismiss();
  };

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
              <View style={styles.timePickerContainer}>
                <TimePickerButton
                  onPress={() => setTimePickerVisible(true)}
                  time={time}
                />
              </View>
              <TimePickerModal
                visible={timePickerVisible}
                onDismiss={() => setTimePickerVisible(false)}
                onConfirm={handleTimeConfirm}
                testID="time-picker-modal"
                hours={12}
                minutes={30}
                style={styles.timePicker}
              />
              <View style={styles.buttonContainer}>
                <Button
                  onPress={handleSubmit}
                  icon="check"
                  testID="confirm-button"
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
      <Dialog
        visible={errorDialogVisible}
        onDismiss={() => setErrorDialogVisible(false)}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Text>Please select a date and time</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

DateTimePicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
};

export default DateTimePicker;
