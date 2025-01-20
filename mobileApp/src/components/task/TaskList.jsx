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
 * Renders the main task list component with filtering and refresh capabilities.
 * Displays tasks in sections (active and completed) with the ability to filter, sort,
 * and perform actions like delete.
 *
 * @component
 * @returns {React.ReactElement} The rendered TaskList component
 */
const TaskList = ({list}) => {
  const theme = useTheme();
  const {tasks, filter} = useTaskContext();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleDelete = task => {
    deleteTask(task);
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
      <View>
        <TaskSection
          title={`${list?.name} `}
          tasks={tasks.filter(task => task.listId === list.id)}
          rightComponent={listActions()}
          expanded={true}
          deleteTask={task => handleDelete(task)}
          onPress={() => {
            navigation.navigate('TaskAddNew', {listId: list.id});
          }}
        />
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
