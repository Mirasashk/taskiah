import React from 'react';
import TaskDetailForm from './TaskDetailForm';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';

const AddTaskForm = () => {
  const {user} = useContext(AuthContext);

  const DEFAULT_TASK = {
    title: '',
    description: '',
    status: 'active',
    priority: 'medium',
    category: '',
    tag: '',
    dueDate: null,
  };

  const initialTask = {
    ...DEFAULT_TASK,
    ownerId: user?.id,
  };

  return <TaskDetailForm mode="create" initialTask={initialTask} />;
};

export default AddTaskForm;
