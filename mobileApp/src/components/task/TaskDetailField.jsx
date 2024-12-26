import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text, Icon, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';

/**
 * A reusable field component for task details
 * @component
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the field
 * @param {string} props.value - Value to display
 * @param {Function} props.onPress - Function to call when field is pressed
 * @param {boolean} props.isPrimary - Whether to show the value in primary color
 * @param {Object} props.icon - Icon configuration object
 * @returns {React.ReactElement}
 */
const TaskDetailField = ({label, value, onPress, isPrimary = false, icon}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.content}>
          <Text variant="labelMedium">{label}</Text>
          <Text variant="bodyMedium" style={{color: theme.colors.primary}}>
            {value}
          </Text>
          {icon && (
            <Icon source={icon.source} size={icon.size} color={icon.color} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
});

TaskDetailField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isPrimary: PropTypes.bool,
  icon: PropTypes.shape({
    source: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
  }),
};

export default TaskDetailField;
