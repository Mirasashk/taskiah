import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';
import {AuthContext} from '../../context/AuthContext';
import {Provider as PaperProvider} from 'react-native-paper';

describe('LoginScreen', () => {
  const mockLogin = jest.fn();
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const wrapper = ({children}) => (
    <AuthContext.Provider value={{login: mockLogin}}>
      <PaperProvider>{children}</PaperProvider>
    </AuthContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginScreen navigation={mockNavigation} />,
      {wrapper},
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('shows error when fields are empty', async () => {
    const {getByText} = render(<LoginScreen navigation={mockNavigation} />, {
      wrapper,
    });

    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Please fill in all fields')).toBeTruthy();
    });
  });

  it('calls login function with correct credentials', async () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginScreen navigation={mockNavigation} />,
      {wrapper},
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });
});
