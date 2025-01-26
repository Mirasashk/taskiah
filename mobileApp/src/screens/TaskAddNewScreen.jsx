import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import AddTaskForm from '../components/task/AddTaskForm';

const TaskAddNewScreen = ({route}) => {
  const {listId} = route.params;
  return (
    <View>
      <AddTaskForm listId={listId} />
    </View>
  );
};

export default TaskAddNewScreen;
