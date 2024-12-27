import {createContext, useContext, useState, useEffect} from 'react';
import {taskService} from '../services/taskApi';
import {AuthContext} from './AuthContext';
import {createTaskNotification} from '../utils/notifications';

/**
 * Context for managing tasks throughout the application
 * @type {React.Context}
 */
const TaskContext = createContext(null);

/**
 * Provider component for task management
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function TaskProvider({children}) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [filter, setFilter] = useState('All tasks');
  const [selectedTask, setSelectedTask] = useState(null);

  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getTasks();
    }
  }, [user]);

  useEffect(() => {
    filterTasks(filteredTasks, filter);
  }, [filteredTasks, filter]);

  /**
   * Adds a new task with notification
   * @param {Object} task - Task to add
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
   * Filters tasks based on the filter criteria
   * @param {Array} filteredTasks - Array of filtered tasks
   * @param {string} filter - Filter criteria
   */
  const filterTasks = (filteredTasks, filter) => {
    // sort filteredTasks by createdAt date
    const sortedFilteredTasks = filteredTasks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    setFilter(filter);
    setFilteredTasks(sortedFilteredTasks);
  };

  /**
   * Deletes a task
   * @param {Object} task - Task to delete
   */
  const deleteTask = async task => {
    if (task.status === 'deleted') {
      await taskService.deleteTask(task.id);
      setDeletedTasks(deletedTasks.filter(t => t.id !== task.id));
    } else {
      const deletedStatus = {
        status: 'deleted',
      };
      await taskService.updateTask(task.id, deletedStatus);
      await getTasks();
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
  };

  /**
   * Retrieves tasks
   */
  const getTasks = async () => {
    console.log('getTasks', user.id);

    const response = await taskService.getTasks(user.id);

    // sort tasks by createdAt date
    const deletedTasks = response.data.filter(
      task => task.status === 'deleted',
    );
    setDeletedTasks(deletedTasks);

    const filteredTasks = response.data.filter(
      task => task.status !== 'deleted',
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
    await taskService.updateTask(taskId, newTaskData);
    await getTasks();
  };

  const value = {
    tasks,
    filter,
    filteredTasks,
    deletedTasks,
    selectedTask,
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
