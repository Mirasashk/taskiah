import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TaskEditDialog from '../TaskEditDialog';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Create a wrapper component with SafeAreaProvider
const renderWithProvider = component => {
  return render(
    <SafeAreaProvider
      initialMetrics={{
        frame: {x: 0, y: 0, width: 0, height: 0},
        insets: {top: 0, left: 0, right: 0, bottom: 0},
      }}>
      {component}
    </SafeAreaProvider>,
  );
};

describe('TaskEditDialog', () => {
  const mockProps = {
    title: 'Test Dialog',
    options: [
      {label: 'Option 1', value: '1'},
      {label: 'Option 2', value: '2'},
    ],
    onValueChange: jest.fn(),
    value: '1',
    visible: true,
    onDismiss: jest.fn(),
  };

  it('renders correctly', () => {
    const {getByTestId} = renderWithProvider(<TaskEditDialog {...mockProps} />);
    expect(getByTestId('task-edit-dialog')).toBeTruthy();
  });

  // Add more tests as needed
});
