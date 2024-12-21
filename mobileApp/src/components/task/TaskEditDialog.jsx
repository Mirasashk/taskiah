import React from 'react';
import {Dialog, RadioButton, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {TaskEditDialogStyles} from './styles/TaskEditDialogStyles';
import {SafeAreaProvider} from 'react-native-safe-area-context';

/**
 * A dialog component that displays a list of radio button options
 * @param {Object} props
 * @param {string} props.title - The title of the dialog
 * @param {Array<{label: string, value: string}>} props.options - Array of options
 * @param {Function} props.onValueChange - Callback when value changes
 * @param {string} props.value - Currently selected value
 * @param {boolean} props.visible - Dialog visibility state
 * @param {Function} props.onDismiss - Callback when dialog is dismissed
 */
const TaskEditDialog = ({
  title,
  options,
  onValueChange,
  value,
  visible,
  onDismiss,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      visible={visible}
      testID="task-edit-dialog"
      onDismiss={onDismiss}
      style={{backgroundColor: theme.colors.surfaceContainerHigh}}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group onValueChange={onValueChange} value={value}>
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

TaskEditDialog.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default TaskEditDialog;
