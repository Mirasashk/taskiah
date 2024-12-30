import React from 'react';
import {View} from 'react-native';
import {Dialog, List, Portal, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {startLocationOptions} from '../../constants/settings';

/**
 * Component for selecting the app's start location
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Controls dialog visibility
 * @param {string} props.currentLocation - Currently selected location
 * @param {Function} props.onDismiss - Callback when dialog is dismissed
 * @param {Function} props.onSelect - Callback when new location is selected
 */
const StartLocationPicker = ({
  visible,
  currentLocation,
  onDismiss,
  onSelect,
}) => {
  const theme = useTheme();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Choose Start Location</Dialog.Title>
        <Dialog.Content>
          {Object.entries(startLocationOptions).map(([key, option]) => (
            <List.Item
              key={key}
              title={option.label}
              left={props => <List.Icon {...props} icon={option.icon} />}
              onPress={() => onSelect(key)}
              selected={currentLocation === key}
            />
          ))}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

StartLocationPicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  currentLocation: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default StartLocationPicker;
