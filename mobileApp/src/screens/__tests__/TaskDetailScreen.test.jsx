import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import TaskDetailScreen from '../TaskDetailScreen';
import {TaskContext} from '../../context/TaskContext';
import {AuthContext} from '../../context/AuthContext';

// Mock the required hooks and components
jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    params: {
      task: {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        status: 'active',
        priority: 'medium',
        category: null,
        tag: null,
        dueDate: null,
      },
    },
  }),
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

describe('TaskDetailScreen', () => {
  const mockUpdateTask = jest.fn();
  const mockUser = {
    categories: {},
    tags: {},
  };

  const wrapper = ({children}) => (
    <AuthContext.Provider value={{user: mockUser}}>
      <TaskContext.Provider value={{updateTask: mockUpdateTask}}>
        {children}
      </TaskContext.Provider>
    </AuthContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByTestId, getByText} = render(<TaskDetailScreen />, {wrapper});

    expect(getByTestId('task-detail-screen')).toBeTruthy();
    expect(getByText('Test Task')).toBeTruthy();
    expect(getByText('Update')).toBeTruthy();
  });

  it('updates task title', () => {
    const {getByDisplayValue} = render(<TaskDetailScreen />, {wrapper});

    const titleInput = getByDisplayValue('Test Task');
    fireEvent.changeText(titleInput, 'Updated Task');

    expect(getByDisplayValue('Updated Task')).toBeTruthy();
  });

  it('calls updateTask when update button is pressed', async () => {
    const {getByText} = render(<TaskDetailScreen />, {wrapper});

    await act(async () => {
      fireEvent.press(getByText('Update'));
    });

    expect(mockUpdateTask).toHaveBeenCalledTimes(1);
  });

  // Add more tests as needed
});
