import {StyleSheet} from 'react-native';

export const createStyles = theme =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '80%',
    },
    modalContainer: {
      backgroundColor: theme.colors.surface,
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      margin: 0,
    },
  });
