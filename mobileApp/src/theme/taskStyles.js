import {StyleSheet} from 'react-native';

export const createTaskStyles = theme =>
  StyleSheet.create({
    listContainer: {
      paddingVertical: 8,
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    card: {
      marginBottom: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.surfaceContainerLow,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    cardTitle: {
      paddingLeft: 10,
      paddingTop: 5,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
    },
  });
