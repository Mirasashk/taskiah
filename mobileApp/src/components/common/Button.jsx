import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';

/**
 * A reusable button component with loading state
 * @param {Object} props - Component props
 * @param {string} props.title - Button text
 * @param {function} props.onPress - Button press handler
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @returns {React.Component} Button component
 */
export const Button = ({title, onPress, loading, disabled}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: theme.colors.primary},
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={loading || disabled}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.7,
  },
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};
