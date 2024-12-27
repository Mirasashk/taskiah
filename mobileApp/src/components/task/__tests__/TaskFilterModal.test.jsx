import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TaskFilterModal from '../TaskFilterModal';

describe('TaskFilterModal', () => {
  const mockOnDismiss = jest.fn();

  beforeEach(() => {
    mockOnDismiss.mockClear();
  });

  it('renders correctly when visible', () => {
    const {getByText} = render(
      <TaskFilterModal visible={true} onDismiss={mockOnDismiss} />,
    );
    expect(getByText('Filter')).toBeTruthy();
  });

  it('calls onDismiss when backdrop is pressed', () => {
    const {getByTestId} = render(
      <TaskFilterModal visible={true} onDismiss={mockOnDismiss} />,
    );
    fireEvent.press(getByTestId('modal-backdrop'));
    expect(mockOnDismiss).toHaveBeenCalled();
  });
});
