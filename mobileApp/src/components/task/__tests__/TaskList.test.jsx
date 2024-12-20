import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TaskList from '../TaskList';
import {TaskContext} from '../../../context/TaskContext';
import {Provider as PaperProvider} from 'react-native-paper';

describe('TaskList', () => {
  const mockTasks = [
    {id: '1', title: 'Task 1', completed: false},
    {id: '2', title: 'Task 2', completed: true},
  ];

  const mockContext = {
    tasks: mockTasks,
    getTasks: jest.fn(),
  };

  const wrapper = ({children}) => (
    <PaperProvider>
      <TaskContext.Provider value={mockContext}>
        {children}
      </TaskContext.Provider>
    </PaperProvider>
  );

  it('renders correctly', () => {
    const {getByTestId} = render(<TaskList />, {wrapper});
    expect(getByTestId('task-list')).toBeTruthy();
  });

  it('shows empty state when no tasks', () => {
    const emptyContext = {
      tasks: [],
      getTasks: jest.fn(),
    };

    const {getByText} = render(
      <TaskContext.Provider value={emptyContext}>
        <TaskList />
      </TaskContext.Provider>,
      {wrapper},
    );

    expect(getByText('No tasks found')).toBeTruthy();
  });

  it('renders task items when tasks exist', () => {
    const {getByText} = render(<TaskList />, {wrapper});
    expect(getByText('Task 1')).toBeTruthy();
    expect(getByText('Task 2')).toBeTruthy();
  });
});
