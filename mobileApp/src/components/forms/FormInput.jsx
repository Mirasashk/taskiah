import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';

/**
 * A reusable form input component with consistent styling
 * @param {Object} props - Component props
 * @param {string} props.value - Input value
 * @param {function} props.onChangeText - Function to handle text changes
 * @param {string} props.placeholder - Placeholder text
 * @param {Object} props.inputProps - Additional TextInput props
 * @returns {React.Component} FormInput component
 */
export const FormInput = ({
  value,
  onChangeText,
  placeholder,
  ...inputProps
}) => {
  const theme = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor: theme.colors.outline,
          color: theme.colors.onBackground,
        },
      ]}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.placeholder}
      value={value}
      onChangeText={onChangeText}
      {...inputProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
});

FormInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
