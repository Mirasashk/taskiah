import React from 'react';
import {View} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import {useTheme} from 'react-native-paper';

/**
 * A reusable form input component with error handling and styling
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Input label text
 * @param {string} props.value - Input value
 * @param {Function} props.onChangeText - Handler for text change events
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.secureTextEntry] - Whether to hide input text
 * @param {React.ReactNode} [props.rightIcon] - Icon to display on the right side
 * @param {Object} [props.props] - Additional props to pass to TextInput
 * @param {string} [props.testID] - Test ID for the input
 * @returns {React.ReactElement} FormInput component
 */
const FormInput = ({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry,
  rightIcon,
  testID,
  ...props
}) => {
  const theme = useTheme();

  const styles = {
    input: {
      borderWidth: 1,
      padding: 0,
      borderRadius: 5,
      marginBottom: 10,
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 12,
      marginBottom: 5,
    },
  };

  return (
    <View>
      <TextInput
        testID={testID}
        style={[styles.input, error && styles.inputError]}
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={!!error}
        secureTextEntry={secureTextEntry}
        right={rightIcon}
        autoCapitalize="none"
        {...props}
      />
      {error && (
        <Text style={styles.errorText} testID={`${testID}-error`}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default FormInput;
