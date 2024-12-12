import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const TaskScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <Text>TaskScreen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  taskContainer: {
    gap: 8,
  },
});

export default TaskScreen;
