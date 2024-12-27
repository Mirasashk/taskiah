// mobileApp/src/screens/TaskDetailScreen.jsx
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import TaskDetailForm from '../components/task/TaskDetailForm';

/**
 * Screen component for viewing and editing task details
 * @component
 * @returns {React.ReactElement}
 */
const TaskDetailScreen = () => {
  return (
    <View testID="task-detail-screen">
      <TaskDetailForm />
    </View>
  );
};

export default TaskDetailScreen;
