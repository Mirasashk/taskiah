import React from 'react';
import {render} from '@testing-library/react-native';
import TabLabel from '../TabLabel';

describe('TabLabel', () => {
  const mockTheme = {
    colors: {
      primary: '#000',
      onSurface: '#fff',
    },
  };

  it('renders correctly with basic props', () => {
    const {getByText} = render(
      <TabLabel focused={false} label="Test" theme={mockTheme} />,
    );
    expect(getByText('Test')).toBeTruthy();
  });

  it('shows icon when showIcon is true', () => {
    const {getByTestId} = render(
      <TabLabel
        focused={false}
        label="Test"
        theme={mockTheme}
        showIcon={true}
      />,
    );
    expect(getByTestId('plus-icon')).toBeTruthy();
  });
});
