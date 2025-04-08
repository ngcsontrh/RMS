import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Import Vietnamese locale
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

// Set locale (can be configurable)
dayjs.locale('en');

// Common date formats
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';
export const TIME_FORMAT = 'HH:mm';
export const ISO_FORMAT = 'YYYY-MM-DD';

/**
 * Format a date value using the specified format
 * @param date Date to format
 * @param format Format pattern (defaults to DATE_FORMAT)
 * @returns Formatted date string
 */
export const formatDate = (date: string | dayjs.Dayjs | undefined | null, format: string = DATE_FORMAT): string => {
  if (!date) return '';
  return dayjs(date).format(format);
};

/**
 * Format a date-time value using the specified format
 * @param dateTime Date-time to format
 * @param format Format pattern (defaults to DATE_TIME_FORMAT)
 * @returns Formatted date-time string
 */
export const formatDateTime = (dateTime: string | dayjs.Dayjs | undefined | null, format: string = DATE_TIME_FORMAT): string => {
  if (!dateTime) return '';
  return dayjs(dateTime).format(format);
};

/**
 * Get relative time (e.g., "2 days ago", "in 3 hours")
 * @param date Date to compare with now
 * @returns Relative time string
 */
export const getRelativeTime = (date: string | dayjs.Dayjs | undefined | null): string => {
  if (!date) return '';
  return dayjs(date).fromNow();
};

/**
 * Convert a dayjs object to ISO string format suitable for API
 * @param date The dayjs object
 * @returns ISO string format of the date
 */
export const toISOString = (date: dayjs.Dayjs | undefined | null): string | undefined => {
  if (!date) return undefined;
  return date.toISOString();
};

/**
 * Parse a string date to dayjs object
 * @param dateString String representation of date
 * @param format Format of the date string (optional)
 * @returns dayjs object
 */
export const parseDate = (dateString: string | undefined | null, format?: string): dayjs.Dayjs | undefined => {
  if (!dateString) return undefined;
  return format ? dayjs(dateString, format) : dayjs(dateString);
};

export default dayjs;