import {format} from 'date-fns';

export const formatDueDate = dueDate => {
  if (!dueDate) return null;

  if (dueDate.toDate) {
    return format(dueDate.toDate(), 'MMM d, yyyy');
  }

  if (dueDate instanceof Date) {
    return format(dueDate, 'MMM d, yyyy');
  }

  if (typeof dueDate === 'number') {
    return format(new Date(dueDate), 'MMM d, yyyy');
  }

  return null;
};

export const isSameDay = (date1, date2) => {
  return new Date(date1).toDateString() === new Date(date2).toDateString();
};
