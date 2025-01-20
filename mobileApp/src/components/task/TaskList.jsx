import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {
  Text,
  useTheme,
  IconButton,
  FAB,
  TouchableRipple,
} from 'react-native-paper';
import {useTaskContext} from '../../context/TaskContext';
import TaskFilterModal from './TaskFilterModal';
import PullToRefresh from '../PullToRefresh/PullToRefresh';
import ListActions from './ListActions';
import {TaskListStyles} from './styles/TaskListStyles';
import TaskSection from './TaskSection';
import {useNavigation} from '@react-navigation/native';
/**
 * Renders the main task list component with filtering and refresh capabilities.
 * Displays tasks in sections (active and completed) with the ability to filter, sort,
 * and perform actions like delete.
 *
 * @component
 * @returns {React.ReactElement} The rendered TaskList component
 */
const TaskList = ({list}) => {
  const theme = useTheme();
  const {tasks, toggleTask} = useTaskContext();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [showTasks, setShowTasks] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setCompletedTasks(
      tasks
        .filter(task => task.listId === list.id)
        .filter(task => task.status === 'completed'),
    );
  }, [tasks, list]);

  const listActions = section => {
    if (section === 'completed') {
      return (
        <TouchableRipple onPress={handleClearAll} style={{marginRight: 16}}>
          <Text
            style={{
              color: showCompleted
                ? theme.colors.primary
                : theme.colors.onSurface,
            }}>
            {`Remove All`}
          </Text>
        </TouchableRipple>
      );
    }
    return (
      <ListActions
        onFilterPress={() => setFilterModalVisible(true)}
        onSortPress={() => {}}
      />
    );
  };

  const handleClearAll = () => {
    console.log('handleClearAll', completedTasks);
    completedTasks.forEach(task => {
      toggleTask(task.id, {status: 'archived'});
    });
  };

  const handleClearTask = task => {
    console.log('handleClearTask', task);
    toggleTask(task.id, {status: 'archived'});
  };

  return (
    <View
      style={[
        TaskListStyles.container,
        {backgroundColor: theme.colors.surfaceContainerHigh},
      ]}
      testID="task-list">
      <View>
        <TaskSection
          title={`${list?.name} `}
          tasks={tasks.filter(
            task => task.listId === list.id && task.status === 'active',
          )}
          rightComponent={listActions()}
          expanded={showTasks}
          onExpand={() => setShowTasks(!showTasks)}
          onDeleteTask={task => handleClearTask(task)}
        />
        {completedTasks.length > 0 && (
          <TaskSection
            title={`Completed (${completedTasks.length})`}
            tasks={completedTasks}
            rightComponent={listActions('completed')}
            expanded={showCompleted}
            onExpand={() => setShowCompleted(!showCompleted)}
            onDeleteTask={task => handleClearTask(task)}
          />
        )}
      </View>
      <TaskFilterModal
        visible={filterModalVisible}
        onDismiss={() => setFilterModalVisible(false)}
      />
      <FAB
        icon="plus"
        color={theme.colors.onPrimary}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: theme.colors.primary,
        }}
        onPress={() => {
          navigation.navigate('TaskAddNew');
        }}
      />
    </View>
  );
};

export default TaskList;
