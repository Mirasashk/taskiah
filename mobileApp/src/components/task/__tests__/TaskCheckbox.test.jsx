import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TaskCheckbox from '../TaskCheckbox';

describe('TaskCheckbox', () => {
  it('renders unchecked state correctly', () => {
    const {getByTestId} = render(
      <TaskCheckbox checked={false} onPress={() => {}} />,
    );
    const checkbox = getByTestId('task-checkbox');
    expect(checkbox.props.icon).toBe('checkbox-blank-circle-outline');
  });

  it('renders checked state correctly', () => {
    const {getByTestId} = render(
      <TaskCheckbox checked={true} onPress={() => {}} />,
    );
    const checkbox = getByTestId('task-checkbox');
    expect(checkbox.props.icon).toBe('checkbox-marked-circle-outline');
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <TaskCheckbox checked={false} onPress={onPress} />,
    );
    fireEvent.press(getByTestId('task-checkbox'));
    expect(onPress).toHaveBeenCalled();
  });
});
