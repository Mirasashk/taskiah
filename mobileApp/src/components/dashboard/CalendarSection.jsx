import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {Calendar} from 'react-native-calendars';
import {useTheme} from 'react-native-paper';
import {useTaskContext} from '../../context/TaskContext';
import {format} from 'date-fns';
import useCalendarTheme from '../../theme/calendarTheme';
const CalendarSection = () => {
  const theme = useTheme();
  const {tasks} = useTaskContext();
  const calendarTheme = useCalendarTheme();

  const markedDates = useMemo(() => {
    const dates = {};
    tasks.forEach(task => {
      if (task.dueDate) {
        try {
          const dateStr = format(new Date(task.dueDate), 'yyyy-MM-dd');
          dates[dateStr] = {
            marked: true,
            dotColor:
              task.priority === 'high'
                ? theme.colors.error
                : theme.colors.primary,
          };
        } catch (error) {
          console.warn('Invalid date found:', task.dueDate);
        }
      }
    });
    return dates;
  }, [tasks, theme.colors]);

  return (
    <View style={{marginVertical: 16}}>
      <Calendar
        theme={{
          backgroundColor: theme.colors.surfaceVariant,
          calendarBackground: theme.colors.surfaceVariant,
          textSectionTitleColor: theme.colors.onSurface,
          selectedDayBackgroundColor: theme.colors.primary,
          selectedDayTextColor: theme.colors.onPrimary,
          todayTextColor: theme.colors.primary,
          dayTextColor: theme.colors.onSurface,
          textDisabledColor: theme.colors.onSurfaceDisabled,
          monthTextColor: theme.colors.onSurface,
          arrowColor: theme.colors.onSurface,
        }}
        markedDates={markedDates}
        enableSwipeMonths={true}
        style={{
          borderRadius: 12,
          padding: 16,
        }}
      />
    </View>
  );
};

export default CalendarSection;
