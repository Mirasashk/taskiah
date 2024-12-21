import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';

/**
 * A reusable form input component with error handling and consistent styling
 * @param {Object} props - Component props
 */
const FormInput = ({
  label = '',
  value,
  onChangeText,
  placeholder = '',
  error = '',
  secureTextEntry = false,
  rightIcon = null,
  testID = 'form-input',
  ...inputProps
}) => {
  const theme = useTheme();

  return (
    <View>
      <TextInput
        testID={testID}
        style={[
          styles.input,
          error && styles.inputError,
          {
            backgroundColor: theme.colors.surfaceContainerHigh,
          },
        ]}
        label={label}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        error={!!error}
        secureTextEntry={secureTextEntry}
        right={rightIcon}
        autoCapitalize="none"
        mode="outlined"
        {...inputProps}
      />
      {error && (
        <Text style={styles.errorText} testID={`${testID}-error`}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'error',
  },
  errorText: {
    color: 'error',
    fontSize: 12,
    marginBottom: 8,
  },
});

FormInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  rightIcon: PropTypes.node,
  testID: PropTypes.string,
};

export default FormInput;
