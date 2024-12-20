import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import PullToRefresh from '../PullToRefresh';
import {Text} from 'react-native';

describe('PullToRefresh', () => {
  const mockOnRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    const {getByText} = render(
      <PullToRefresh onRefresh={mockOnRefresh}>
        <Text>Test Content</Text>
      </PullToRefresh>,
    );

    expect(getByText('Test Content')).toBeTruthy();
  });

  it('handles refresh correctly', async () => {
    const {getByTestId} = render(
      <PullToRefresh onRefresh={mockOnRefresh}>
        <Text>Test Content</Text>
      </PullToRefresh>,
    );

    const scrollView = getByTestId('scroll-view');

    await act(async () => {
      fireEvent.scroll(scrollView, {
        nativeEvent: {
          contentOffset: {y: 0},
        },
      });
    });

    await act(async () => {
      fireEvent(scrollView, 'refresh');
    });

    expect(mockOnRefresh).toHaveBeenCalledTimes(1);
  });

  it('disables refresh when not at top', async () => {
    const {getByTestId} = render(
      <PullToRefresh onRefresh={mockOnRefresh}>
        <Text>Test Content</Text>
      </PullToRefresh>,
    );

    const scrollView = getByTestId('scroll-view');

    await act(async () => {
      fireEvent.scroll(scrollView, {
        nativeEvent: {
          contentOffset: {y: 100},
        },
      });
    });

    await act(async () => {
      fireEvent(scrollView, 'refresh');
    });

    expect(mockOnRefresh).not.toHaveBeenCalled();
  });
});
