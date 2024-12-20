import React from 'react';
import {View} from 'react-native';
import {List, Icon} from 'react-native-paper';
import TaskFilterItems from './TaskFilterItems';

/**
 * Renders a list of tag filters
 * @component
 * @param {Object} props
 * @param {Object} props.theme - Theme object from react-native-paper
 * @param {Object} props.tags - Object containing tag definitions
 * @param {Array} props.tasks - Array of tasks
 * @param {Function} props.onFilterSelect - Callback when a tag filter is selected
 * @returns {React.ReactElement} Tag filters component
 */
const TaskFilterTags = ({theme, tags, tasks, onFilterSelect}) => {
  return (
    <List.Accordion
      title="Tags"
      titleStyle={{color: theme.colors.onSurface}}
      left={() => (
        <View style={styles.tagIcon}>
          <Icon source="tag" size={24} />
        </View>
      )}
      style={styles.accordion}>
      {Object.values(tags || {}).map(tag => (
        <TaskFilterItems
          key={tag.name}
          count={tasks.filter(task => task.tags === tag.name).length}
          title={tag.name}
          color={tag.color}
          onPress={() => onFilterSelect(`Tag: ${tag.name}`)}
        />
      ))}
    </List.Accordion>
  );
};

const styles = {
  tagIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordion: {
    paddingLeft: 15,
  },
};

export default TaskFilterTags;
