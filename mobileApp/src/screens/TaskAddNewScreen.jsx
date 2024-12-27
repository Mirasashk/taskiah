import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import AddTaskForm from '../components/task/AddTaskForm';

const TaskAddNewScreen = () => {
  return (
    <View>
      <AddTaskForm />
    </View>
  );
};

export default TaskAddNewScreen;
