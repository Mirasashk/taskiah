import React from 'react';
import {render, act, fireEvent} from '@testing-library/react-native';
import DashboardScreen from '../DashboardScreen';
import {TaskContext} from '../../context/TaskContext';
import {AuthContext} from '../../context/AuthContext';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('DashboardScreen', () => {
  const mockTasks = [
    {id: 1, title: 'Task 1', completed: false, dueDate: new Date()},
    {id: 2, title: 'Task 2', completed: true, dueDate: new Date()},
    {
      id: 3,
      title: 'Task 3',
      completed: false,
      dueDate: new Date(Date.now() - 86400000),
    },
  ];

  const mockContextValue = {
    getTasks: jest.fn().mockResolvedValue(mockTasks),
  };

  const mockAuthValue = {
    user: {id: 1, name: 'Test User'},
  };

  it('renders correctly', async () => {
    const {getByText} = render(
      <AuthContext.Provider value={mockAuthValue}>
        <TaskContext.Provider value={mockContextValue}>
          <DashboardScreen />
        </TaskContext.Provider>
      </AuthContext.Provider>,
    );

    await act(async () => {
      // Wait for useEffect to complete
    });

    expect(getByText('Tasks')).toBeTruthy();
    expect(getByText('Notifications')).toBeTruthy();
  });

  it('displays correct task statistics', async () => {
    const {getByText} = render(
      <AuthContext.Provider value={mockAuthValue}>
        <TaskContext.Provider value={mockContextValue}>
          <DashboardScreen />
        </TaskContext.Provider>
      </AuthContext.Provider>,
    );

    await act(async () => {
      // Wait for useEffect to complete
    });

    expect(getByText('2')).toBeTruthy(); // Active tasks
    expect(getByText('1')).toBeTruthy(); // Completed tasks
    expect(getByText('1')).toBeTruthy(); // Overdue tasks
  });
});
