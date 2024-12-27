export const convertTo12HourFormat = hours => hours % 12 || 12;

export const formatTime = (hours, minutes) => {
  const formattedHours = convertTo12HourFormat(hours);
  const period = hours >= 12 ? 'PM' : 'AM';
  return `${formattedHours}:${minutes} ${period}`;
};
