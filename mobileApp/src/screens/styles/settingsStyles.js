import {StyleSheet} from 'react-native';

export const settingsStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    section: {
      marginBottom: 16,
    },
    sectionHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.colors.primary,
    },
  });
