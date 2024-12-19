import {StyleSheet} from 'react-native';

export const createStyles = theme =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },
    card: {
      backgroundColor: theme.colors.surfaceContainerLow,
      borderRadius: 40,
    },
    avatar: {
      backgroundColor: theme.colors.surfaceContainerLow,
    },
  });
