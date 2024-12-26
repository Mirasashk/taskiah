import {StyleSheet} from 'react-native';

export const TaskDetailFormStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderRadius: 0,
      height: '100%',
    },
    textInput: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    textInputContent: {
      paddingLeft: 0,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    updateButton: {
      width: '50%',
      alignSelf: 'center',
      marginTop: 24,
    },
    completeButton: {
      position: 'absolute',
      margin: 16,
      bottom: 0,
      right: 0,
    },
  });
