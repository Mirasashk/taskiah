import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure you have this installed
import TaskList from '../components/task/TaskList';
import {useTaskContext} from '../context/TaskContext';
import PullToRefresh from '../components/PullToRefresh/PullToRefresh';
const Tab = createMaterialTopTabNavigator();

const AddListScreen = () => {
  const theme = useTheme();
  // This can be a placeholder or a separate component as needed
  return (
    <View
      style={[
        styles.addListContainer,
        {backgroundColor: theme.colors.surfaceContainerHigh},
      ]}>
      <Text>Add new list here</Text>
    </View>
  );
};

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
      initialRouteName="Active"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurface,
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary,
        },
        // Set background color for the tab bar and the screens
        tabBarStyle: {
          backgroundColor: theme.colors.surfaceContainerHigh,
        },
        contentStyle: {
          backgroundColor: theme.colors.surfaceContainerHigh,
        },
      }}>
      <Tab.Screen
        name="Active"
        component={TaskList}
        options={{tabBarLabel: 'Active'}}
      />
      <Tab.Screen
        name="AddList"
        component={AddListScreen}
        options={{
          tabBarItemStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarLabel: ({focused}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <Text
                  style={{
                    color: focused
                      ? theme.colors.primary
                      : theme.colors.onSurface,
                  }}>
                  Add List
                </Text>
                <MaterialCommunityIcons
                  name="plus"
                  size={16}
                  style={{
                    color: focused
                      ? theme.colors.primary
                      : theme.colors.onSurface,
                  }}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 8,
  },
});

export default TasksScreen;
