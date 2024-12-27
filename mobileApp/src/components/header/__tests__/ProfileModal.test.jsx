import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ProfileModal from '../ProfileModal';

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

describe('ProfileModal', () => {
  const mockProps = {
    visible: true,
    onDismiss: jest.fn(),
    user: {
      photoURL: 'https://example.com/photo.jpg',
      username: 'Test User',
      email: 'test@example.com',
    },
    onSignOut: jest.fn(),
    onThemeToggle: jest.fn(),
    theme: {
      colors: {
        surfaceContainerHigh: '#ffffff',
      },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders user information correctly', () => {
    const {getByText} = render(<ProfileModal {...mockProps} />);

    expect(getByText('Test User')).toBeTruthy();
    expect(getByText('test@example.com')).toBeTruthy();
  });

  it('calls navigation functions when menu items are pressed', () => {
    const {getByText} = render(<ProfileModal {...mockProps} />);

    fireEvent.press(getByText('Settings'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Settings');

    fireEvent.press(getByText('Notifications'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Notifications');
  });

  it('calls onThemeToggle when theme option is pressed', () => {
    const {getByText} = render(<ProfileModal {...mockProps} />);

    fireEvent.press(getByText('Theme'));
    expect(mockProps.onThemeToggle).toHaveBeenCalled();
  });

  it('calls onSignOut when sign out option is pressed', () => {
    const {getByText} = render(<ProfileModal {...mockProps} />);

    fireEvent.press(getByText('Sign Out'));
    expect(mockProps.onSignOut).toHaveBeenCalled();
  });

  it('calls onDismiss when modal is dismissed', () => {
    const {getByTestId} = render(<ProfileModal {...mockProps} />);

    fireEvent(getByTestId('modal-backdrop'), 'dismiss');
    expect(mockProps.onDismiss).toHaveBeenCalled();
  });
});
