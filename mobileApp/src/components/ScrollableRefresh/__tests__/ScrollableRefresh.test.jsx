import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {ScrollView} from 'react-native';
import ScrollableRefresh from '../ScrollableRefresh';

describe('ScrollableRefresh', () => {
  const mockOnRefresh = jest.fn();

  beforeEach(() => {
    mockOnRefresh.mockClear();
  });

  it('renders correctly with default props', () => {
    const {getByTestId} = render(
      <ScrollableRefresh onRefresh={mockOnRefresh}>
        <ScrollView testID="scroll-view" />
      </ScrollableRefresh>,
    );

    expect(getByTestId('scroll-view')).toBeTruthy();
  });

  it('handles refresh correctly', async () => {
    const {getByTestId} = render(
      <ScrollableRefresh onRefresh={mockOnRefresh}>
        <ScrollView testID="scroll-view" />
      </ScrollableRefresh>,
    );

    const scrollView = getByTestId('scroll-view');

    await act(async () => {
      // Simulate pull to refresh
      fireEvent(scrollView, 'refresh');
    });

    expect(mockOnRefresh).toHaveBeenCalledTimes(1);
  });

  it('disables refresh control when isEnabled is false', () => {
    const {getByTestId} = render(
      <ScrollableRefresh onRefresh={mockOnRefresh} isEnabled={false}>
        <ScrollView testID="scroll-view" />
      </ScrollableRefresh>,
    );

    const scrollView = getByTestId('scroll-view');
    expect(scrollView.props.refreshControl).toBeUndefined();
  });

  it('applies custom styles correctly', () => {
    const customStyle = {backgroundColor: 'red'};
    const {getByTestId} = render(
      <ScrollableRefresh onRefresh={mockOnRefresh} style={customStyle}>
        <ScrollView testID="scroll-view" />
      </ScrollableRefresh>,
    );

    const scrollView = getByTestId('scroll-view');
    expect(scrollView.props.style).toMatchObject(customStyle);
  });
});
