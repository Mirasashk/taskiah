import {StyleSheet} from 'react-native';

export const createTaskDetailStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    header: {
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.onBackground,
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      color: theme.colors.onBackground,
      marginBottom: 16,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    dateLabel: {
      fontSize: 14,
      color: theme.colors.onBackground,
      marginRight: 8,
    },
    dateText: {
      fontSize: 14,
      color: theme.colors.primary,
    },
    priorityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    priorityLabel: {
      fontSize: 14,
      color: theme.colors.onBackground,
      marginRight: 8,
    },
    priorityText: {
      fontSize: 14,
      fontWeight: '500',
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 24,
    },
    button: {
      minWidth: 120,
    },
    completedBadge: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: theme.colors.success,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    completedText: {
      color: theme.colors.onPrimary,
      fontSize: 12,
      fontWeight: '500',
    },
  });

export default createTaskDetailStyles;
