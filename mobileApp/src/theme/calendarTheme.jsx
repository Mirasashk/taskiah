import {useTheme} from 'react-native-paper';

const useCalendarTheme = () => {
  const theme = useTheme();

  return {
    backgroundColor: theme.colors.surfaceContainerHigh,
    calendarBackground: theme.colors.surfaceContainerHigh,
    textSectionTitleColor: theme.colors.onSurface,
    todayTextColor: theme.colors.primary,
    dayTextColor: theme.colors.onSurface,
    textDisabledColor: theme.colors.onSurfaceDisabled,
    indicatorColor: theme.colors.primary,
    arrowColor: theme.colors.onSurface,
    monthTextColor: theme.colors.onSurface,
    selectedDayBackgroundColor: theme.colors.primary,
    selectedDayTextColor: theme.colors.onPrimary,
  };
};

export default useCalendarTheme;
