import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TasksScreen from '../TasksScreen';
import {TaskContext} from '../../context/TaskContext';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';

describe('TasksScreen', () => {
  const mockTaskContext = {
    tasks: [],
    addTask: jest.fn(),
    deleteTask: jest.fn(),
    getTasks: jest.fn(),
  };

  const wrapper = ({children}) => (
    <NavigationContainer>
      <PaperProvider>
        <TaskContext.Provider value={mockTaskContext}>
          {children}
        </TaskContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );

  it('renders correctly', () => {
    const {getByTestId, getByText} = render(<TasksScreen />, {wrapper});

    expect(getByTestId('tasks-screen')).toBeTruthy();
    expect(getByText('Active')).toBeTruthy();
    expect(getByText('Add List')).toBeTruthy();
  });

  it('switches tabs correctly', () => {
    const {getByText} = render(<TasksScreen />, {wrapper});

    fireEvent.press(getByText('Add List'));
    expect(getByText('Add new list here')).toBeTruthy();
  });
});
