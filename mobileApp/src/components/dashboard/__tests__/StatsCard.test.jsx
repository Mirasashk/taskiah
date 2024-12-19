import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import StatsCard from '../StatsCard';

describe('StatsCard', () => {
  const mockProps = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    icon: 'star',
    onPress: jest.fn(),
  };

  it('renders correctly with all props', () => {
    const {getByText} = render(<StatsCard {...mockProps} />);

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Subtitle')).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    const {getByText} = render(<StatsCard {...mockProps} />);

    fireEvent.press(getByText('Test Title'));
    expect(mockProps.onPress).toHaveBeenCalled();
  });
});
