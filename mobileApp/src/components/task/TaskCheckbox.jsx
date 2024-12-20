import React from 'react';
import {IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const TaskCheckbox = ({checked, onPress}) => (
  <IconButton
    icon={
      checked
        ? 'checkbox-marked-circle-outline'
        : 'checkbox-blank-circle-outline'
    }
    size={20}
    onPress={onPress}
    style={styles.checkbox}
  />
);

const styles = StyleSheet.create({
  checkbox: {
    // Add specific checkbox styles if needed
  },
});

export default TaskCheckbox;
