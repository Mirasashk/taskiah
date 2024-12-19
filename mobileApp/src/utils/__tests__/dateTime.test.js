import {convertTo12HourFormat, formatTime} from '../dateTime';

describe('dateTime utils', () => {
  describe('convertTo12HourFormat', () => {
    test('converts 24 hour format to 12 hour format', () => {
      expect(convertTo12HourFormat(13)).toBe(1);
      expect(convertTo12HourFormat(0)).toBe(12);
      expect(convertTo12HourFormat(12)).toBe(12);
      expect(convertTo12HourFormat(23)).toBe(11);
    });
  });

  describe('formatTime', () => {
    test('formats time correctly with AM/PM', () => {
      expect(formatTime(9, 30)).toBe('9:30 AM');
      expect(formatTime(13, 45)).toBe('1:45 PM');
      expect(formatTime(0, 0)).toBe('12:0 AM');
      expect(formatTime(23, 59)).toBe('11:59 PM');
    });
  });
});
