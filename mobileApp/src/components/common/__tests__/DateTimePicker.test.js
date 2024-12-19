import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import DateTimePicker from '../DateTimePicker';

jest.mock('react-native-paper', () => ({
  Card: ({children}) => <div>{children}</div>,
  CardContent: ({children}) => <div>{children}</div>,
  Portal: 'Portal',
  Modal: 'Modal',
  Button: 'Button',
  Text: 'Text',
  Dialog: {
    Title: 'DialogTitle',
    Content: 'DialogContent',
  },
  useTheme: () => ({
    colors: {
      surface: '#ffffff',
      onSurface: '#000000',
      primary: '#6200ee',
      onPrimary: '#ffffff',
    },
  }),
}));

jest.mock('react-native-calendars', () => ({
  Calendar: 'Calendar',
}));

describe('DateTimePicker', () => {
  const defaultProps = {
    visible: true,
    onDismiss: jest.fn(),
    date: new Date('2024-03-14'),
    onDateChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    const {getByTestId} = render(<DateTimePicker {...defaultProps} />);
    expect(getByTestId('confirm-button')).toHaveTextContent('Confirm');
  });

  test('shows error dialog when confirming without selecting date and time', () => {
    const {getByText} = render(<DateTimePicker {...defaultProps} />);
    fireEvent.press(getByText('Confirm'));
    expect(getByText('Please select a date and time')).toBeTruthy();
  });
});
