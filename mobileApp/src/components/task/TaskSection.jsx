import React, {useState, useEffect} from 'react';
import {Card, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import {useTaskContext} from '../../context/TaskContext';
import {TaskSectionStyles} from './styles/TaskSectionStyles';
/**
 * Renders a collapsible section of tasks with a title and optional actions.
 *
 * @component
 * @param {Object} props Component props
 * @param {string} props.title - Title of the section
 * @param {Array<Object>} props.tasks - Array of task objects
 * @param {Array<Object>} [props.filteredTasks] - Array of filtered task objects
 * @param {Object} [props.titleStyle] - Custom styles for the section title
 * @param {React.ReactNode} [props.rightComponent] - Component to render on the right side of header
 * @param {Function} [props.onPress] - Callback when section header is pressed
 * @param {boolean} [props.expanded=true] - Whether the section is initially expanded
 * @param {boolean} [props.completedTasksList=false] - Whether this section shows completed tasks
 * @returns {React.ReactElement} The rendered TaskSection component
 */
const TaskSection = ({
  title,
  tasks,
  filteredTasks,
  titleStyle,
  rightComponent,
  onPress,
  expanded = true,
  onExpand,
  completedTasksList = false,
  onDeleteTask,
}) => {
  const theme = useTheme();
  const styles = TaskSectionStyles(theme);
  const {toggleTask} = useTaskContext();

  const handlePress = () => {
    if (tasks.length > 0) {
      onExpand();
    }
  };

  const handleToggleComplete = task => {
    setTimeout(() => {
      if (task.status === 'completed') {
        toggleTask(task.id, {status: 'active'});
      } else {
        toggleTask(task.id, {status: 'completed'});
      }
    }, 1000);
  };

  const handleDelete = taskId => {
    onDeleteTask(taskId);
  };

  return (
    <Card style={styles.card} onPress={handlePress}>
      <Card.Title
        title={title}
        titleStyle={[titleStyle, {marginTop: 5}]}
        right={() => rightComponent}
        onPress={onPress}
      />
      {expanded && (
        <Card.Content>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={() => handleToggleComplete(task)}
              onDelete={() => handleDelete(task)}
            />
          ))}
        </Card.Content>
      )}
    </Card>
  );
};

TaskSection.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  filter: PropTypes.string,
  titleStyle: PropTypes.object,
  rightComponent: PropTypes.object,
  onPress: PropTypes.func,
  expanded: PropTypes.bool,
};

export default TaskSection;
