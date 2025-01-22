import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, IconButton} from 'react-native-paper';

import TaskCheckbox from './TaskCheckbox';

/**
 * Renders an individual task item with completion checkbox and actions.
 * Supports toggling completion status and deletion of tasks.
 *
 * @component
 * @param {Object} props Component props
 * @param {Object} props.task - Task object
 * @param {string} props.task.id - Unique identifier of the task
 * @param {string} props.task.title - Title of the task
 * @param {('active'|'completed'|'deleted')} props.task.status - Current status of the task
 * @param {Function} props.onToggleComplete - Callback when task completion is toggled
 * @param {Function} props.onDelete - Callback when task is deleted
 * @param {Function} props.onPress - Callback when task is pressed
 * @returns {React.ReactElement} The rendered TaskItem component
 */
const TaskItem = ({task, onToggleComplete, onDelete, onPress}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(task.status === 'completed');
  }, [task]);

  const handleToggleComplete = () => {
    setIsChecked(!isChecked);
    onToggleComplete(task);
  };

  return (
    <View style={styles.cardContent}>
      <View style={styles.leftContent}>
        <TaskCheckbox checked={isChecked} onPress={handleToggleComplete} />
        <View style={styles.textContainer}>
          <Text
            variant="titleMedium"
            style={[styles.title, isChecked && styles.completedText]}
            onPress={() => onPress?.(task)}>
            {task.title}
          </Text>
        </View>
      </View>
      <IconButton icon="delete" size={20} onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 8,
    flex: 1,
  },
  title: {
    width: '100%',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TaskItem;
