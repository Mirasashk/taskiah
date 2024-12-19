import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Text, useTheme} from 'react-native-paper';
import {formatTime} from '../../utils/dateTime';

/**
 * A button component that displays and handles time selection
 * @component
 * @param {Object} props
 * @param {Function} props.onPress - Callback function when button is pressed
 * @param {Object} [props.time] - Selected time object
 * @param {number} [props.time.hours] - Hours value (0-23)
 * @param {number} [props.time.minutes] - Minutes value (0-59)
 */
const TimePickerButton = ({onPress, time}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    timeText: {
      color: theme.colors.onSurface,
      borderWidth: 1,
      borderColor: theme.colors.onSurface,
      borderRadius: 5,
      padding: 5,
    },
  });

  return (
    <Button
      onPress={onPress}
      textColor={theme.colors.onSurface}
      mode="text"
      icon="clock-outline">
      {time ? (
        <Text style={styles.timeText}>
          {formatTime(time.hours, time.minutes)}
        </Text>
      ) : (
        'Pick time'
      )}
    </Button>
  );
};

TimePickerButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  time: PropTypes.shape({
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
  }),
};

export default TimePickerButton;
