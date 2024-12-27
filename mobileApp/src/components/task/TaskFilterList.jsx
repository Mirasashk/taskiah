import React, {useCallback} from 'react';
import {View} from 'react-native';
import {List, useTheme} from 'react-native-paper';
import TaskFilterItems from './TaskFilterItems';
import TaskFilterTags from './TaskFilterTags';
import {useTaskContext} from '../../context/TaskContext';
import {useAuth} from '../../context/AuthContext';
import {FILTER_TYPES, FILTER_LABELS} from '../../config/constants/filters';
import {isSameDay} from '../../utils/dateUtils';

/**
 * Renders a list of task filters including system filters and tags
 * @component
 * @param {Object} props
 * @param {Function} props.onDismiss - Callback when filter selection is complete
 * @returns {React.ReactElement} Filter list component
 */
const TaskFilterList = ({onDismiss}) => {
  const theme = useTheme();
  const {user} = useAuth();
  const {tasks, setFilter, setFilteredTasks, deletedTasks} = useTaskContext();

  const handleFilter = useCallback(
    filter => {
      if (filter.startsWith('Tag:')) {
        const tag = filter.split(':')[1].trim();
        setFilteredTasks(tasks.filter(task => task.tags === tag));
        setFilter(tag);
      } else {
        switch (filter) {
          case FILTER_TYPES.ALL:
            setFilteredTasks([]);
            setFilter(FILTER_LABELS[FILTER_TYPES.ALL]);
            break;
          case FILTER_TYPES.TODAY:
            setFilteredTasks(
              tasks.filter(task => isSameDay(task.dueDate, new Date())),
            );
            setFilter(FILTER_LABELS[FILTER_TYPES.TODAY]);
            break;
          case FILTER_TYPES.IMPORTANT:
            setFilteredTasks(tasks.filter(task => task.priority === 'high'));
            setFilter(FILTER_LABELS[FILTER_TYPES.IMPORTANT]);
            break;
          case FILTER_TYPES.DELETED:
            setFilteredTasks(deletedTasks);
            setFilter(FILTER_LABELS[FILTER_TYPES.DELETED]);
            break;
        }
      }
      onDismiss();
    },
    [tasks, deletedTasks, setFilter, setFilteredTasks, onDismiss],
  );

  return (
    <View style={styles.container}>
      <List.Section style={styles.section}>
        <TaskFilterItems
          count={tasks.filter(task => task.status !== 'completed').length}
          title="All active tasks"
          icon="inbox-full"
          onPress={() => handleFilter(FILTER_TYPES.ALL)}
        />
        <TaskFilterItems
          count={
            tasks
              .filter(task => isSameDay(task.dueDate, new Date()))
              .filter(task => task.status !== 'completed').length
          }
          title="Today"
          icon="calendar-month"
          onPress={() => handleFilter(FILTER_TYPES.TODAY)}
        />
        <TaskFilterItems
          count={
            tasks
              .filter(task => task.priority === 'high')
              .filter(task => task.status !== 'completed').length
          }
          title="Important"
          icon="star"
          onPress={() => handleFilter(FILTER_TYPES.IMPORTANT)}
        />
        <TaskFilterItems
          count={
            deletedTasks.filter(task => task.status !== 'completed').length
          }
          title="Deleted"
          icon="trash-can"
          onPress={() => handleFilter(FILTER_TYPES.DELETED)}
        />
        <TaskFilterTags
          theme={theme}
          tags={user?.tags}
          tasks={tasks}
          onFilterSelect={handleFilter}
        />
      </List.Section>
    </View>
  );
};

const styles = {
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    width: '70%',
  },
};

export default TaskFilterList;
