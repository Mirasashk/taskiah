import React from 'react';
import {render} from '@testing-library/react-native';
import {LoadingView} from '../LoadingView';

describe('LoadingView', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<LoadingView />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('uses theme color when provided', () => {
    const theme = {colors: {primary: '#FF0000'}};
    const {getByTestId} = render(<LoadingView theme={theme} />);
    const indicator = getByTestId('loading-indicator');
    expect(indicator.props.color).toBe('#FF0000');
  });
});
