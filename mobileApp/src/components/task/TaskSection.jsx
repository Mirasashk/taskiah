import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import {useTaskContext} from '../../context/TaskContext';
import {TaskSectionStyles} from './styles/TaskSectionStyles';
/**
 * Renders a section of tasks with a title and optional right component
 * @component
 * @param {Object} props
 * @param {string} props.title - Title of the section
 * @param {Array} props.tasks - Array of tasks
 * @param {Array} props.filteredTasks - Array of filtered tasks
 * @param {string} props.filter - Current filter name
 * @param {Function} props.onToggleComplete - Callback when task completion is toggled
 * @param {Function} props.onDelete - Callback when task is deleted
 * @param {Object} props.titleStyle - Style for the title
 * @param {Function} props.rightComponent - Component to render on the right
 * @param {Function} props.onPress - Callback when section is pressed
 * @param {boolean} props.expanded - Whether the section is expanded
 * @returns {React.ReactElement} Task section component
 */
const TaskSection = ({
  title,
  tasks,
  filteredTasks,
  filter,
  titleStyle,
  rightComponent,
  onPress,
  expanded = true,
}) => {
  const {toggleTask, deleteTask} = useTaskContext();
  const theme = useTheme();
  const styles = TaskSectionStyles(theme);
  const [expand, setExpand] = useState(expanded);

  const handlePress = () => {
    if (tasks.length > 0) {
      setExpand(!expand);
    }
  };

  const handleToggleComplete = (taskId, status) => {
    console.log('handleToggleComplete', taskId, status);
    if (status === 'completed') {
      toggleTask(taskId, {status: 'active'});
    } else {
      toggleTask(taskId, {status: 'completed'});
    }
  };

  return (
    <Card style={styles.card} onPress={handlePress}>
      <Card.Title
        title={title}
        titleStyle={[titleStyle, {marginTop: 5}]}
        right={() => rightComponent}
        onPress={onPress}
      />
      {expand && (
        <Card.Content>
          {filteredTasks?.length > 0
            ? filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={() =>
                    handleToggleComplete(task.id, task.status)
                  }
                  onDelete={deleteTask}
                />
              ))
            : tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={() =>
                    handleToggleComplete(task.id, task.status)
                  }
                  onDelete={deleteTask}
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
  filteredTasks: PropTypes.array.isRequired,
  filter: PropTypes.string,
  onToggleComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  titleStyle: PropTypes.object,
  rightComponent: PropTypes.func,
  onPress: PropTypes.func,
  expanded: PropTypes.bool,
};

export default TaskSection;
