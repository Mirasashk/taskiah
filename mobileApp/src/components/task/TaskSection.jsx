import React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

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
 * @param {Object} props.styles - Styles object
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
  onToggleComplete,
  onDelete,
  styles,
  titleStyle,
  rightComponent,
  onPress,
  expanded = true,
}) => (
  <Card style={styles.card} onPress={onPress}>
    <Card.Title
      title={title}
      titleStyle={titleStyle}
      right={rightComponent}
      onPress={onPress}
    />
    {expanded && (
      <Card.Content>
        {filteredTasks.length > 0 ? (
          <View>
            <Text variant="titleMedium">{filter}</Text>
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))}
          </View>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))
        )}
      </Card.Content>
    )}
  </Card>
);

TaskSection.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  filteredTasks: PropTypes.array.isRequired,
  filter: PropTypes.string,
  onToggleComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  titleStyle: PropTypes.object,
  rightComponent: PropTypes.func,
  onPress: PropTypes.func,
  expanded: PropTypes.bool,
};

export default TaskSection;
