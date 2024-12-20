import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Header from '../Header';
import {ThemeContext} from '../../../context/ThemeContext';
import {useAuth} from '../../../context/AuthContext';

// Mock the dependencies
jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

describe('Header', () => {
  const mockProps = {
    title: 'Test Title',
    openDrawer: jest.fn(),
  };

  const mockUser = {
    photoURL: 'https://example.com/photo.jpg',
    username: 'Test User',
    email: 'test@example.com',
  };

  const mockAuth = {
    user: mockUser,
    signOut: jest.fn(),
  };

  const mockTheme = {
    toggleTheme: jest.fn(),
  };

  beforeEach(() => {
    useAuth.mockImplementation(() => mockAuth);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with title', () => {
    const {getByText} = render(
      <ThemeContext.Provider value={mockTheme}>
        <Header {...mockProps} />
      </ThemeContext.Provider>,
    );

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('calls openDrawer when menu icon is pressed', () => {
    const {getByTestId} = render(
      <ThemeContext.Provider value={mockTheme}>
        <Header {...mockProps} />
      </ThemeContext.Provider>,
    );

    fireEvent.press(getByTestId('menu-button'));
    expect(mockProps.openDrawer).toHaveBeenCalled();
  });

  it('opens profile modal when avatar is pressed', () => {
    const {getByTestId} = render(
      <ThemeContext.Provider value={mockTheme}>
        <Header {...mockProps} />
      </ThemeContext.Provider>,
    );

    fireEvent.press(getByTestId('avatar-button'));
    expect(getByTestId('profile-modal')).toBeTruthy();
  });

  it('handles sign out correctly', async () => {
    const {getByTestId} = render(
      <ThemeContext.Provider value={mockTheme}>
        <Header {...mockProps} />
      </ThemeContext.Provider>,
    );

    fireEvent.press(getByTestId('avatar-button'));
    fireEvent.press(getByTestId('sign-out-button'));

    expect(mockAuth.signOut).toHaveBeenCalled();
  });
});
