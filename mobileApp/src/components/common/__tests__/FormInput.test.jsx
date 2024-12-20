import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FormInput from '../FormInput';

// Mock react-native-paper
jest.mock('react-native-paper', () => ({
  TextInput: 'TextInput',
  Text: 'Text',
  useTheme: () => ({
    colors: {
      error: 'red',
    },
  }),
}));

describe('FormInput', () => {
  const defaultProps = {
    label: 'Test Input',
    value: '',
    onChangeText: jest.fn(),
    error: '',
    testID: 'form-input',
  };

  it('renders correctly', () => {
    const {getByTestId} = render(<FormInput {...defaultProps} />);
    expect(getByTestId('form-input')).toBeTruthy();
  });

  it('displays error message when error prop is provided', () => {
    const props = {
      ...defaultProps,
      error: 'This field is required',
    };
    const {getByText} = render(<FormInput {...props} />);
    expect(getByText('This field is required')).toBeTruthy();
  });

  it('calls onChangeText when text input changes', () => {
    const onChangeText = jest.fn();
    const {getByTestId} = render(
      <FormInput {...defaultProps} onChangeText={onChangeText} />,
    );

    fireEvent.changeText(getByTestId('form-input'), 'new value');
    expect(onChangeText).toHaveBeenCalledWith('new value');
  });
});
