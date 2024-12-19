// DateTimePicker.test.js
import React from 'react';
import {View} from 'react-native';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import DateTimePicker from '../DateTimePicker';

import {Provider as PaperProvider} from 'react-native-paper';

jest.mock('react-native-paper', () => {
  const RealReactNativePaper = jest.requireActual('react-native-paper');

  const Card = ({children, style}) => (
    <RealReactNativePaper.Card style={style} testID="card">
      {children}
    </RealReactNativePaper.Card>
  );

  Card.Content = ({children, style}) => (
    <RealReactNativePaper.Card.Content style={style} testID="card-content">
      {children}
    </RealReactNativePaper.Card.Content>
  );

  const Portal = ({children}) => (
    <RealReactNativePaper.Portal>{children}</RealReactNativePaper.Portal>
  );

  return {
    ...RealReactNativePaper,
    useTheme: jest.fn(() => ({colors: {primary: 'blue', onPrimary: 'white'}})),
    Card,
    Portal,
    Modal: ({children, visible, onDismiss, contentContainerStyle}) =>
      visible ? (
        <RealReactNativePaper.Modal
          visible={visible}
          onDismiss={onDismiss}
          contentContainerStyle={contentContainerStyle}
          testID="modal">
          {children}
        </RealReactNativePaper.Modal>
      ) : null,
    Button: ({children, onPress, testID, mode, textColor, style}) => (
      <RealReactNativePaper.Button
        onPress={onPress}
        testID={testID}
        mode={mode}
        textColor={textColor}
        style={style}>
        {children}
      </RealReactNativePaper.Button>
    ),
    Text: ({children}) => (
      <RealReactNativePaper.Text>{children}</RealReactNativePaper.Text>
    ),
    Dialog: Object.assign(
      ({children, visible, onDismiss}) =>
        visible ? (
          <RealReactNativePaper.Dialog visible={visible} onDismiss={onDismiss}>
            {children}
          </RealReactNativePaper.Dialog>
        ) : null,
      {
        Title: ({children}) => (
          <RealReactNativePaper.Dialog.Title>
            {children}
          </RealReactNativePaper.Dialog.Title>
        ),
        Content: ({children}) => (
          <RealReactNativePaper.Dialog.Content>
            {children}
          </RealReactNativePaper.Dialog.Content>
        ),
      },
    ),
  };
});

const mockCalendar = jest.fn(props => (
  <div
    testID="calendar"
    onClick={() => props.onDayPress({dateString: '2024-07-28'})}>
    Calendar
  </div>
));

jest.mock('react-native-calendars', () => ({
  Calendar: props => mockCalendar(props),
}));

jest.mock('../../../theme/calendarTheme', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

jest.mock('../styles/dateTimePicker.styles', () => ({
  __esModule: true,
  createStyles: jest.fn(() => ({
    modal: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
    card: {margin: 20},
    cardContent: {padding: 16},
    calendar: {height: 300},
    timePickerContainer: {marginTop: 16},
    buttonContainer: {marginTop: 16},
    confirmButton: {marginTop: 8},
  })),
}));

jest.mock('../TimePickerButton', () => {
  const RealReactNative = jest.requireActual('react-native');
  return {
    __esModule: true,
    default: ({onPress, time, testID}) => (
      <RealReactNative.View testID="time-picker-button" onPress={onPress}>
        <RealReactNative.Text testID="time-picker-button-text">
          {time ? `${time.hours}:${time.minutes}` : 'Select Time'}
        </RealReactNative.Text>
      </RealReactNative.View>
    ),
  };
});

jest.mock('react-native-paper-dates', () => {
  const RealReactNative = jest.requireActual('react-native');
  return {
    TimePickerModal: ({visible, onConfirm, onDismiss}) =>
      visible ? (
        <RealReactNative.View
          testID="time-picker-modal"
          onPress={() => {
            onConfirm({hours: '14', minutes: '30'});
            onDismiss();
          }}>
          <RealReactNative.Pressable
            testID="time-picker-confirm-button"
            onPress={() => {
              onConfirm({hours: '14', minutes: '30'});
              onDismiss();
            }}>
            <RealReactNative.Text>Confirm Time</RealReactNative.Text>
          </RealReactNative.Pressable>
        </RealReactNative.View>
      ) : null,
  };
});

describe('DateTimePicker', () => {
  const renderWithProvider = (ui, options) => {
    return render(ui, {
      wrapper: ({children}) => <PaperProvider>{children}</PaperProvider>,
      ...options,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    const mockOnDismiss = jest.fn();
    const mockOnDateChange = jest.fn();
    const initialDate = new Date('2024-07-27T10:00:00.000Z');

    renderWithProvider(
      <DateTimePicker
        visible={true}
        onDismiss={mockOnDismiss}
        date={initialDate}
        onDateChange={mockOnDateChange}
      />,
    );

    // Check if core components are present
    expect(screen.getByTestId('modal')).toBeVisible();
    expect(screen.getByTestId('card')).toBeVisible();
    expect(screen.getByTestId('calendar')).toBeVisible();
  });

  it('calls onDateChange with correct date and time', async () => {
    const mockOnDismiss = jest.fn();
    const mockOnDateChange = jest.fn(date => {
      console.log('onDateChange called with:', date);
    });
    const initialDate = new Date('2024-07-27T10:00:00.000Z');

    renderWithProvider(
      <DateTimePicker
        visible={true}
        onDismiss={mockOnDismiss}
        date={initialDate}
        onDateChange={mockOnDateChange}
      />,
    );

    // Step 1: Select date
    const calendar = screen.getByTestId('calendar');
    fireEvent.press(calendar);

    // Step 2: Open time picker
    const timePickerButton = screen.getByTestId('time-picker-button');
    fireEvent.press(timePickerButton);

    // Step 3: Select time in modal
    await waitFor(() => {
      const timePickerModal = screen.getByTestId('time-picker-modal');
      expect(timePickerModal).toBeVisible();
    });

    const confirmTimeButton = screen.getByTestId('time-picker-confirm-button');
    fireEvent.press(confirmTimeButton);

    // Step 4: Verify time was set
    await waitFor(() => {
      const timeText = screen.getByTestId('time-picker-button-text');
      expect(timeText).toHaveTextContent('14:30');
    });

    // Step 5: Confirm final selection
    const confirmButton = screen.getByTestId('confirm-button');
    fireEvent.press(confirmButton);

    // Verify the result
    await waitFor(() => {
      const expectedDate = new Date('2024-07-28T14:30:00.000Z');
      expect(mockOnDateChange).toHaveBeenCalledWith(expectedDate);
      expect(mockOnDismiss).toHaveBeenCalled();
    });
  });

  it('shows error dialog when confirming without selecting date and time', async () => {
    const mockOnDismiss = jest.fn();
    const mockOnDateChange = jest.fn();
    renderWithProvider(
      <DateTimePicker
        visible={true}
        onDismiss={mockOnDismiss}
        onDateChange={mockOnDateChange}
      />,
    );

    fireEvent.press(screen.getByTestId('confirm-button'));

    expect(screen.getByText('Please select a date and time')).toBeVisible();
  });
});
