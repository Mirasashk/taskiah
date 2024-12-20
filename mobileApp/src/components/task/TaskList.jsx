import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {useTaskContext} from '../../context/TaskContext';
import TaskFilterModal from './TaskFilterModal';
import ScrollableRefresh from '../PullToRefresh';
import ListActions from './ListActions';
import TaskSection from './TaskSection';
import {createTaskStyles} from '../../theme/taskStyles';

/**
 * Renders the main task list with active and completed task sections
 * @component
 * @returns {React.ReactElement} Task list component
 */
const TaskList = () => {
  const theme = useTheme();
  const {tasks, filteredTasks, filter, getTasks} = useTaskContext();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [expandCompletedList, setExpandCompletedList] = useState(false);

  const styles = createTaskStyles(theme);
  const completedTasksCount = tasks.filter(
    task => task.status === 'completed',
  ).length;

  const handleRefresh = useCallback(async () => {
    await getTasks();
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, [getTasks]);

  const handleToggleComplete = useCallback(taskId => {
    console.log('taskId', taskId);
  }, []);

  const handleDelete = useCallback(taskId => {
    console.log('taskId', taskId);
  }, []);

  if (!tasks?.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="titleMedium">No tasks found</Text>
      </View>
    );
  }

  const activeTasks = tasks.filter(task => task.status === 'active');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <ScrollableRefresh onRefresh={handleRefresh}>
      <View style={styles.listContainer}>
        <TaskSection
          title="Tasks"
          tasks={activeTasks}
          filteredTasks={filteredTasks}
          filter={filter}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
          styles={styles}
          titleStyle={styles.cardTitle}
          rightComponent={() => (
            <ListActions
              onFilterPress={() => setShowFilterModal(true)}
              onSortPress={() => console.log('sort')}
            />
          )}
        />

        <TaskSection
          title={`Completed Tasks (${completedTasksCount})`}
          tasks={completedTasks}
          filteredTasks={filteredTasks.filter(
            task => task.status === 'completed',
          )}
          filter={filter}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
          styles={styles}
          titleStyle={styles.cardTitle}
          onPress={() => setExpandCompletedList(!expandCompletedList)}
          expanded={expandCompletedList}
        />

        <TaskFilterModal
          visible={showFilterModal}
          onDismiss={() => setShowFilterModal(false)}
        />
      </View>
    </ScrollableRefresh>
  );
};

export default TaskList;
