import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {db} from '../config/firebase';
import {taskService} from '../services/taskApi';
import {useAuth} from './AuthContext';
import {useListContext} from './ListContext';
import Task from '../models/TaskModel';
import {asyncStorage} from '../utils/secureStorage';
import {and} from '@react-native-firebase/firestore';

const TaskContext = createContext(null);

export function TaskProvider({children}) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useAuth();
  const {lists} = useListContext();
  const [selectedTask, setSelectedTask] = useState(null);

  const [selectedFilter, setSelectedFilter] = useState(() => {
    const savedFilter = asyncStorage.getItem('selectedFilter');
    return savedFilter || 'All Lists';
  });

  useEffect(() => {
    if (selectedFilter) {
      asyncStorage.setItem('selectedFilter', selectedFilter.toString());
    }
  }, [selectedFilter]);

  // Firestore Listener for getting tasks by listId
  useEffect(() => {
    // Reset tasks if no user data
    if (!user?.id) {
      setTasks([]);
      setIsLoading(false);
      return;
    }

    // If there are no lists, set empty tasks and return
    if (lists.length === 0) {
      setTasks([]);
      setIsLoading(false);
      return;
    }

    try {
      console.log('Getting tasks');
      setIsLoading(true);
      const validListIds = lists
        .filter(
          list =>
            list &&
            list.id &&
            (list.ownerId === user.id ||
              (list.sharedWith && list.sharedWith.includes(user.id))),
        )
        .map(list => list.id);
      console.log('validListIds', validListIds);
      // If there are no valid lists, return empty tasks
      if (validListIds.length === 0) {
        setTasks([]);
        setIsLoading(false);
        return;
      }

      // Create a query for active tasks
      const activeTasksQuery = db
        .collection('tasks')
        .where('listId', 'in', validListIds)
        .where('status', 'in', ['active', 'completed', 'pending']); // List all non-archived statuses

      // Combine results from both queries
      const unsubActive = activeTasksQuery.onSnapshot(
        activeSnapshot => {
          const activeTasks = [];

          activeSnapshot?.forEach(doc => {
            const data = doc.data();
            if (!data.ownerId || !data.listId) {
              console.warn(`Task ${doc.id} is missing required fields`);
              return;
            }
            activeTasks.push({
              id: doc.id,
              ...data,
              status: data.status,
              createdAt: data.createdAt || new Date().toISOString(),
            });
          });

          setTasks(activeTasks);
          setIsLoading(false);
        },
        error => {
          console.error('Firestore query error:', error);
          // If this is an index error, it will show in the error message
          if (error.code === 'failed-precondition') {
            console.log('Index needed:', error.message);
          }
          setError(error.message);
          setIsLoading(false);
        },
      );

      return () => unsubActive();
    } catch (error) {
      console.error('Error setting up tasks query:', error);
      setError(error.message);
      setIsLoading(false);
    }
  }, [user?.id, lists]);

  const addTaskToFirestore = async task => {
    try {
      const notification = await addNotification(task);
      task.notifications = {
        [notification.type]: notification,
      };
      await Task.createTask(task);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTask = useCallback(async task => {
    try {
      await taskService.updateTask(task.id, {status: 'deleted'});
    } catch (error) {
      setError(error.message);
    }
  });

  const toggleTask = useCallback(async (taskId, taskData) => {
    try {
      setTasks(prev =>
        prev.map(task => (task.id === taskId ? {...task, ...taskData} : task)),
      );
      await taskService.updateTask(taskId, taskData);
    } catch (error) {
      setError(error.message);
    }
  });

  const updateTask = useCallback(async (taskId, newTaskData) => {
    try {
      await taskService.updateTask(taskId, newTaskData);
    } catch (error) {
      setError(error.message);
    }
  });

  const value = {
    tasks,
    isLoading,
    error,
    selectedTask,
    setSelectedTask,
    selectedFilter,
    setSelectedFilter,
    addTaskToFirestore,
    deleteTask,
    toggleTask,
    updateTask,
  };

  if (error) {
    console.error('TaskContext Error:', error);
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

const addNotification = async task => {
  const setNotificationType = task => {
    if (task.priority === 'high') {
      return 'important';
    } else if (task.dueDate) {
      return 'dueDate';
    } else {
      return 'reminder';
    }
  };

  const setMessage = task => {
    switch (type) {
      case 'important':
        return `${task.title} is a high priority task`;
      case 'dueDate':
        return `${task.title} is due on ${task.dueDate}`;
      case 'reminder':
        return `This is a reminder for ${task.title}`;
    }
  };

  const setNotifyOn = task => {
    // set notify date 1 day before due date
    if (task.dueDate) {
      const dueDate = new Date(task.dueDate);
      dueDate.setDate(dueDate.getDate() - 1);
      return dueDate.toISOString();
    } else {
      return null;
    }
  };

  const type = setNotificationType(task);
  const message = setMessage(task);
  const notifyOn = setNotifyOn(task);

  const notification = {
    message: message,
    type: type,
    notifyOn: notifyOn,
  };

  return notification;
};
