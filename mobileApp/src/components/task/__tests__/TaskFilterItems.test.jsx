import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TaskFilterItems from '../TaskFilterItems';

describe('TaskFilterItems', () => {
  const mockProps = {
    count: 5,
    title: 'Test Item',
    icon: 'folder',
    onPress: jest.fn(),
    color: null,
  };

  it('renders correctly with icon', () => {
    const {getByText} = render(<TaskFilterItems {...mockProps} />);
    expect(getByText('Test Item')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  it('renders correctly with color', () => {
    const {getByText} = render(
      <TaskFilterItems {...mockProps} color="#FF0000" icon={null} />,
    );
    expect(getByText('Test Item')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const {getByText} = render(<TaskFilterItems {...mockProps} />);
    fireEvent.press(getByText('Test Item'));
    expect(mockProps.onPress).toHaveBeenCalled();
  });
});
