import React from 'react';
import {render} from '@testing-library/react-native';
import SplashScreen from '../SplashScreen';

describe('SplashScreen', () => {
  const mockNavigation = {
    replace: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    mockNavigation.replace.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const {getByTestId} = render(<SplashScreen navigation={mockNavigation} />);
    expect(getByTestId('splash-screen')).toBeTruthy();
  });

  it('navigates to Landing screen after delay', () => {
    render(<SplashScreen navigation={mockNavigation} />);

    // Fast-forward time
    jest.advanceTimersByTime(2000);

    expect(mockNavigation.replace).toHaveBeenCalledWith('Landing');
  });

  it('cleans up timer on unmount', () => {
    const {unmount} = render(<SplashScreen navigation={mockNavigation} />);

    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
