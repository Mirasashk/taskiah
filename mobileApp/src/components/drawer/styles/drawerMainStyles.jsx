import {StyleSheet} from 'react-native';

const createDrawerMainStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    headerText: {
      color: theme.colors.text,
    },
  });

export default createDrawerMainStyles;
