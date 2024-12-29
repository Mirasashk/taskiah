import {createContext, useContext, useState, useEffect} from 'react';
import {taskService} from '../services/taskApi';
import {AuthContext} from './AuthContext';
import {createTaskNotification} from '../utils/notifications';

/**
 * Context for managing tasks throughout the application.
 * Provides task CRUD operations and filtering capabilities.
 */
const TaskContext = createContext(null);

/**
 * Provider component that manages task state and operations.
 *
 * @component
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function TaskProvider({children}) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [filter, setFilter] = useState('All tasks');
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getTasks();
    }
  }, [user]);

  useEffect(() => {
    console.log('filter', filter);
    filterTasks(filter);
  }, [filter]);

  /**
   * Adds a new task with associated notification.
   *
   * @async
   * @param {Object} task - Task to be added
   * @param {string} task.title - Title of the task
   * @param {string} [task.description] - Description of the task
   * @param {Date} [task.dueDate] - Due date of the task
   * @throws {Error} When task creation fails
   */
  const addTask = async task => {
    try {
      const notification = createTaskNotification(task);
      task.notifications = {[notification.type]: notification};

      const response = await taskService.createTask(task);
      const sortedTasks = [...tasks, response.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  /**
   * Filters tasks based on specified criteria.
   *
   * @param {string} filterCriteria - The filter to apply ('important'|'pastdue'|'all')
   */
  const filterTasks = filterCriteria => {
    const sortByDate = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

    let filtered = tasks;
    if (filterCriteria === 'important') {
      filtered = tasks.filter(task => task.priority === 'high');
    } else if (filterCriteria === 'pastdue') {
      filtered = tasks.filter(task => task.dueDate < new Date());
    }

    setFilter(filterCriteria);
    setFilteredTasks(filtered.sort(sortByDate));
  };

  /**
   * Deletes a task
   * @param {Object} task - Task to delete
   */
  const deleteTask = async task => {
    if (task.status === 'deleted') {
      console.log('deleteTask', task.id);
      await taskService.deleteTask(task.id).then(() => {
        getTasks();
      });
    } else {
      const deletedStatus = {
        status: 'deleted',
      };
      await taskService.updateTask(task.id, deletedStatus).then(() => {
        getTasks();
      });
    }
  };

  /**
   * Toggles a task's status
   * @param {string} taskId - Task ID
   * @param {Object} taskData - Task data
   */
  const toggleTask = async (taskId, taskData) => {
    setTasks(
      tasks.map(task => (task.id === taskId ? {...task, ...taskData} : task)),
    );
    await taskService.updateTask(taskId, taskData);
    await getTasks();
    setLoading(false);
  };

  /**
   * Retrieves tasks
   */
  const getTasks = async () => {
    const response = await taskService.getTasks(user.id);

    // sort tasks by createdAt date
    const deletedTasks = response.data.filter(
      task => task.status === 'deleted',
    );
    setDeletedTasks(deletedTasks);

    const completedTasks = response.data.filter(
      task => task.status === 'completed',
    );
    setCompletedTasks(completedTasks);

    const filteredTasks = response.data.filter(
      task => task.status !== 'deleted' && task.status !== 'completed',
    );

    const sortedTasks = filteredTasks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    setTasks(sortedTasks);
  };

  /**
   * Deletes all tasks for a user
   * @param {string} userId - User ID
   */
  const deleteAllTasks = async userId => {
    await taskService.deleteAllTasks(userId);
    await getTasks(userId);
  };

  /**
   * Updates a task
   * @param {string} taskId - Task ID
   * @param {Object} newTaskData - New task data
   */
  const updateTask = async (taskId, newTaskData) => {
    setLoading(true);
    await taskService.updateTask(taskId, newTaskData);
    await getTasks();
    setLoading(false);
  };

  const value = {
    tasks,
    filter,
    filteredTasks,
    deletedTasks,
    completedTasks,
    selectedTask,
    loading,
    setSelectedTask,
    setFilteredTasks,
    setFilter,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    getTasks,
    filterTasks,
    deleteAllTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

/**
 * Custom hook for accessing task context
 * @returns {Object} Task context value
 * @throws {Error} If used outside TaskProvider
 */
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
