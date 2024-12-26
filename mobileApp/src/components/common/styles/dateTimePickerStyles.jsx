import {StyleSheet} from 'react-native';

export const dateTimePickerStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
    modal: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      marginHorizontal: 16,
      borderRadius: 25,
    },
    card: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderRadius: 25,
    },
    cardContent: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderRadius: 25,
    },
    calendar: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderRadius: 25,
    },
    timePickerContainer: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    timePickerModal: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    timePickerButton: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    timePickerButtonText: {
      color: theme.colors.onSurface,
    },
    timePickerModalContent: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    timePickerModalButton: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    timePickerModalButtonText: {
      color: theme.colors.onSurface,
    },
    buttonContainer: {
      marginTop: 12,
    },
    confirmButton: {
      backgroundColor: theme.colors.primary,
      width: '50%',
      alignSelf: 'center',
    },
  });
