import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from 'react-native-paper';
import TaskList from '../components/task/TaskList';
import AddListTab from '../components/task/AddListTab';
import TabLabel from '../components/task/TabLabel';
import {useTaskContext} from '../context/TaskContext';
import {getTabNavigatorConfig} from '../config/navigation';
import {Dimensions} from 'react-native';
import {useListContext} from '../context/ListContext';
import {View, Text} from 'react-native';
import AllLists from '../components/task/AllLists';
const Tab = createMaterialTopTabNavigator();

/**
 * TasksScreen component that manages task lists and creation
 * @component
 * @returns {React.ReactElement} Tasks screen component
 */
const TasksScreen = () => {
  const theme = useTheme();
  const {lists, myTasksList, myLists, sharedLists} = useListContext();

  const tabLength = lists.length + 1;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleAddTask = () => {
    // Implement task creation logic
    hideModal();
    setNewTaskTitle('');
  };

  return (
    <Tab.Navigator
      testID="tasks-screen"
      initialRouteName="All Lists"
      screenOptions={{
        ...getTabNavigatorConfig(theme),
        tabBarStyle: {width: Dimensions.get('window').width},
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 'auto',
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary,
          height: 3,
        },
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen name="All Lists" component={AllLists} />
      {lists
        .filter(list => list.id === myTasksList.id)
        .map(list => (
          <Tab.Screen
            key={list.id}
            name={list.name.slice(0, 10)}
            component={TaskList}
          />
        ))}
      {myLists.map(list => (
        <Tab.Screen
          key={list.id}
          name={list.name.slice(0, 10)}
          component={TaskList}
        />
      ))}
      {sharedLists.map(list => (
        <Tab.Screen
          key={list.id}
          name={list.name.slice(0, 10)}
          component={TaskList}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TasksScreen;
