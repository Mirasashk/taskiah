import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from 'react-native-paper';
import TaskList from '../components/task/TaskList';
import AddListTab from '../components/task/AddListTab';
import TabLabel from '../components/task/TabLabel';
import {useTaskContext} from '../context/TaskContext';
import {getTabNavigatorConfig} from '../config/navigation';

const Tab = createMaterialTopTabNavigator();

/**
 * TasksScreen component that manages task lists and creation
 * @component
 * @returns {React.ReactElement} Tasks screen component
 */
const TasksScreen = () => {
  const theme = useTheme();
  const {tasks, addTask, deleteTask, getTasks} = useTaskContext();
  const [visible, setVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleAddTask = () => {
    // Implement task creation logic
    hideModal();
    setNewTaskTitle('');
  };

  const handleToggleComplete = taskId => {
    // Implement toggle complete logic
  };

  const handleDeleteTask = taskId => {
    // Implement delete task logic
  };

  return (
    <Tab.Navigator
      testID="tasks-screen"
      initialRouteName="Active"
      screenOptions={getTabNavigatorConfig(theme)}>
      <Tab.Screen
        name="Active"
        component={TaskList}
        options={{
          tabBarLabel: ({focused}) => (
            <TabLabel focused={focused} label="Active" theme={theme} />
          ),
        }}
      />
      <Tab.Screen
        name="AddList"
        component={AddListTab}
        options={{
          tabBarItemStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarLabel: ({focused}) => (
            <TabLabel
              focused={focused}
              label="Add List"
              theme={theme}
              showIcon={true}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TasksScreen;
