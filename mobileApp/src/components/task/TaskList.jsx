import React, {useState, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useTaskContext} from '../../context/TaskContext';
import TaskFilterModal from './TaskFilterModal';
import PullToRefresh from '../PullToRefresh/PullToRefresh';
import ListActions from './ListActions';
import TaskItem from './TaskItem';
import {TaskListStyles} from './styles/TaskListStyles';

/**
 * Renders the main task list with filtering and refresh capabilities
 * @component
 * @returns {React.ReactElement} Task list component
 */
const TaskList = () => {
  const theme = useTheme();
  const {tasks, getTasks} = useTaskContext();
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const handleRefresh = useCallback(async () => {
    await getTasks();
  }, [getTasks]);

  const renderEmptyList = () => (
    <View
      style={[
        TaskListStyles.emptyContainer,
        {backgroundColor: theme.colors.surfaceContainerHigh},
      ]}>
      <Text style={TaskListStyles.emptyText}>No tasks found</Text>
    </View>
  );

  const renderItem = ({item}) => <TaskItem task={item} />;

  return (
    <View style={TaskListStyles.container} testID="task-list">
      <ListActions
        onFilterPress={() => setFilterModalVisible(true)}
        onSortPress={() => {}}
      />
      <PullToRefresh onRefresh={handleRefresh} isFlatList={true}>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={TaskListStyles.listContainer}
          ListEmptyComponent={renderEmptyList}
        />
      </PullToRefresh>
      <TaskFilterModal
        visible={filterModalVisible}
        onDismiss={() => setFilterModalVisible(false)}
      />
    </View>
  );
};

export default TaskList;
