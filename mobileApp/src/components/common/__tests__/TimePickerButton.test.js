import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TimePickerButton from '../TimePickerButton';

jest.mock('react-native-paper', () => ({
  Button: 'Button',
  Text: 'Text',
  useTheme: () => ({
    colors: {
      onSurface: '#000000',
    },
  }),
}));

describe('TimePickerButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders "Pick time" when no time is selected', () => {
    const {getByText} = render(<TimePickerButton onPress={mockOnPress} />);
    expect(getByText('Button').children).toBe(<Button>Pick time</Button>);
  });

  test('renders formatted time when time is provided', () => {
    const {getByText} = render(
      <TimePickerButton
        onPress={mockOnPress}
        time={{hours: 14, minutes: 30}}
      />,
    );
    expect(getByText('2:30 PM')).toBeTruthy();
  });

  test('calls onPress when button is pressed', () => {
    const {getByText} = render(<TimePickerButton onPress={mockOnPress} />);
    fireEvent.press(getByText('Pick time'));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
