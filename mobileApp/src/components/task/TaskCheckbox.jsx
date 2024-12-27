import React from 'react';
import {IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';

/**
 * A checkbox component for tasks using an icon button
 * @component
 * @param {Object} props
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {Function} props.onPress - Callback function when checkbox is pressed
 * @returns {React.ReactElement} Checkbox component
 */
const TaskCheckbox = ({checked, onPress}) => (
  <IconButton
    testID="task-checkbox"
    icon={
      checked
        ? 'checkbox-marked-circle-outline'
        : 'checkbox-blank-circle-outline'
    }
    size={20}
    onPress={onPress}
    style={styles.checkbox}
  />
);

const styles = StyleSheet.create({
  checkbox: {
    // Add specific checkbox styles if needed
  },
});

export default TaskCheckbox;
