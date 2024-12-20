import {StyleSheet} from 'react-native';

/**
 * Creates styles for task-related components
 * @param {Object} theme - Theme object from react-native-paper
 * @returns {Object} StyleSheet object
 */
export const createTaskStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    listContainer: {
      flex: 1,
      padding: 16,
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.colors.onBackground,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    emptyText: {
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
    },
    taskItem: {
      marginBottom: 8,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
    },
  });
