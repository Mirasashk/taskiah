import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TaskItem from '../TaskItem';

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

describe('TaskItem', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    status: 'pending',
  };

  it('renders correctly', () => {
    const {getByText} = render(
      <TaskItem
        task={mockTask}
        onToggleComplete={jest.fn()}
        onDelete={jest.fn()}
      />,
    );

    expect(getByText('Test Task')).toBeTruthy();
  });

  it('handles task completion toggle', () => {
    const onToggleComplete = jest.fn();
    const {getByTestId} = render(
      <TaskItem
        task={mockTask}
        onToggleComplete={onToggleComplete}
        onDelete={jest.fn()}
      />,
    );

    // Add testID to TaskCheckbox component first
    fireEvent.press(getByTestId('task-checkbox'));
    expect(onToggleComplete).toHaveBeenCalledWith(mockTask.id);
  });
});
