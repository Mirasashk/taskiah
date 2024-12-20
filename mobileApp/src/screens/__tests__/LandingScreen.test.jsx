import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ThemeContext} from '../../context/ThemeContext';
import LandingScreen from '../LandingScreen';

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

// Mock the theme context
const mockThemeContext = {
  isThemeDark: false,
  toggleTheme: jest.fn(),
};

describe('LandingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <LandingScreen navigation={mockNavigation} />
      </ThemeContext.Provider>,
    );

    expect(getByText('Organize Your Tasks')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('navigates to Login screen when Login button is pressed', () => {
    const {getByText} = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <LandingScreen navigation={mockNavigation} />
      </ThemeContext.Provider>,
    );

    fireEvent.press(getByText('Login'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('navigates to Signup screen when Sign Up button is pressed', () => {
    const {getByText} = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <LandingScreen navigation={mockNavigation} />
      </ThemeContext.Provider>,
    );

    fireEvent.press(getByText('Sign Up'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Signup');
  });
});
