const React = require('react');

function FormInput({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry,
  rightIcon,
  testID,
  ...props
}) {
  return React.createElement(
    'View',
    null,
    React.createElement('FormInput', {
      label,
      value,
      onChangeText,
      error,
      secureTextEntry,
      rightIcon,
      testID,
      ...props,
    }),
    error &&
      React.createElement(
        'Text',
        {
          testID: `${testID}-error`,
        },
        error,
      ),
  );
}

module.exports = FormInput;
