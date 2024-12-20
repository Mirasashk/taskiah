import {StyleSheet} from 'react-native';

export const createTaskFieldStyles = theme =>
  StyleSheet.create({
    container: {
      marginVertical: 8,
    },
    fieldContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 4,
    },
    label: {
      fontSize: 16,
      color: theme.colors.onSurface,
      marginRight: 8,
    },
    value: {
      fontSize: 16,
      color: theme.colors.primary,
      flex: 1,
      textAlign: 'right',
    },
    regularValue: {
      color: theme.colors.onSurface,
    },
    icon: {
      marginLeft: 8,
    },
    touchable: {
      flex: 1,
    },
  });

export default createTaskFieldStyles;
