import React from 'react';
import TaskDetailForm from './TaskDetailForm';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';

const AddTaskForm = ({listId}) => {
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
    listId: listId,
  };

  return (
    <TaskDetailForm mode="create" initialTask={initialTask} listId={listId} />
  );
};

export default AddTaskForm;
