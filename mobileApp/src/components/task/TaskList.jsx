import React, {useState, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {Text, useTheme, IconButton, FAB} from 'react-native-paper';
import {useTaskContext} from '../../context/TaskContext';
import TaskFilterModal from './TaskFilterModal';
import PullToRefresh from '../PullToRefresh/PullToRefresh';
import ListActions from './ListActions';
import {TaskListStyles} from './styles/TaskListStyles';
import TaskSection from './TaskSection';
import {useNavigation} from '@react-navigation/native';
/**
 * Renders the main task list with filtering and refresh capabilities
 * @component
 * @returns {React.ReactElement} Task list component
 */
const TaskList = () => {
  const theme = useTheme();
  const {tasks, getTasks, filter, filteredTasks, completedTasks} =
    useTaskContext();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const navigation = useNavigation();
  const handleRefresh = useCallback(async () => {
    await getTasks();
  }, [getTasks]);

  const getTaskList = () => {
    if (filter === 'All tasks') {
      return tasks;
    }
    return filteredTasks;
  };

  const listActions = section => {
    if (section === 'completed') {
      return (
        <View
          style={{
            flexDirection: 'row',
            paddingRight: 10,
            alignItems: 'center',
          }}>
          <Text>{`(Clear All)`}</Text>
          <IconButton icon="delete" size={24} />
        </View>
      );
    }
    return (
      <ListActions
        onFilterPress={() => setFilterModalVisible(true)}
        onSortPress={() => {}}
      />
    );
  };

  return (
    <View
      style={[
        TaskListStyles.container,
        {backgroundColor: theme.colors.surfaceContainerHigh},
      ]}
      testID="task-list">
      <PullToRefresh onRefresh={handleRefresh}>
        <View>
          <TaskSection
            title={`${filter} (${getTaskList().length})`}
            tasks={getTaskList()}
            rightComponent={listActions()}
            expanded={true}
          />
          <TaskSection
            title={`Completed tasks (${completedTasks.length})`}
            tasks={completedTasks}
            rightComponent={listActions('completed')}
            expanded={false}
          />
        </View>
      </PullToRefresh>
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
