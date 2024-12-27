import {StyleSheet} from 'react-native';

const createDrawerMainStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      marginHorizontal: 'auto',
    },
    headerText: {
      textAlign: 'center',
    },
  });

export default createDrawerMainStyles;
