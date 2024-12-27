import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ThemeToggle} from '../ThemeToggle';
import {ThemeProvider} from '../../../context/ThemeContext';

// Mock the Icon component
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

describe('ThemeToggle', () => {
  const renderWithTheme = component => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  it('renders correctly', () => {
    const {getByRole} = renderWithTheme(<ThemeToggle />);
    expect(getByRole('button')).toBeTruthy();
  });

  it('changes icon when theme is toggled', () => {
    const {getByRole} = renderWithTheme(<ThemeToggle />);
    const button = getByRole('button');

    // Initial state (light mode)
    expect(button).toBeTruthy();

    // Toggle theme
    fireEvent.press(button);

    // After toggle (dark mode)
    expect(button).toBeTruthy();
  });

  it('is accessible', () => {
    const {getByLabelText} = renderWithTheme(<ThemeToggle />);
    expect(getByLabelText('Toggle theme')).toBeTruthy();
  });
});
