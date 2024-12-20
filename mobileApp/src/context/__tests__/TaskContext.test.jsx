import {render, act} from '@testing-library/react-native';
import {TaskProvider, useTaskContext} from '../TaskContext';
import {AuthContext} from '../AuthContext';
import {taskService} from '../../services/taskApi';

// Mock dependencies
jest.mock('../../services/taskApi');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('TaskContext', () => {
  const mockUser = {id: 'user123'};
  const wrapper = ({children}) => (
    <AuthContext.Provider value={{user: mockUser}}>
      <TaskProvider>{children}</TaskProvider>
    </AuthContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load tasks on mount', async () => {
    const mockTasks = [
      {id: 1, title: 'Task 1', createdAt: new Date().toISOString()},
    ];

    taskService.getTasks.mockResolvedValueOnce({data: mockTasks});

    let result;
    const TestComponent = () => {
      result = useTaskContext();
      return null;
    };

    await act(async () => {
      render(<TestComponent />, {wrapper});
    });

    expect(result.tasks).toEqual(mockTasks);
  });

  // Add more tests for other functionality...
});
