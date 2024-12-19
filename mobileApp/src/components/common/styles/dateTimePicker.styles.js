import {StyleSheet} from 'react-native';

export const createStyles = theme =>
  StyleSheet.create({
    modal: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      width: '80%',
      paddingBottom: 20,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    cardContent: {
      paddingHorizontal: 5,
      paddingVertical: 5,
    },
    timePicker: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    confirmButton: {
      marginTop: 10,
      backgroundColor: theme.colors.primary,
      width: 100,
    },
    buttonContainer: {
      alignItems: 'center',
    },
    timePickerContainer: {
      alignItems: 'flex-start',
    },
  });
