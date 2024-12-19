import React from 'react';
import {render} from '@testing-library/react-native';
import {StatusBarWrapper} from '../StatusBarWrapper';

describe('StatusBarWrapper', () => {
  const mockTheme = {
    colors: {
      surfaceContainerHigh: '#FFFFFF',
    },
    dark: false,
  };

  it('renders correctly with light theme', () => {
    const {getByTestId} = render(<StatusBarWrapper theme={mockTheme} />);
    // Add assertions based on your needs
  });

  it('renders correctly with dark theme', () => {
    const darkTheme = {
      ...mockTheme,
      dark: true,
    };
    const {getByTestId} = render(<StatusBarWrapper theme={darkTheme} />);
    // Add assertions based on your needs
  });
});
