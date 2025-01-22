import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import AddTaskForm from '../components/task/AddTaskForm';
import {useNavigation} from '@react-navigation/native';

const TaskAddNewScreen = ({route}) => {
  const {listId} = route.params;
  const navigation = useNavigation();

  return (
    <View>
      <AddTaskForm listId={listId} onClose={() => navigation.goBack()} />
    </View>
  );
};

export default TaskAddNewScreen;
