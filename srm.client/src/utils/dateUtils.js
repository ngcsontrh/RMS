import dayjs from 'dayjs';

/**
 * Format a date string to DD/MM/YYYY format
 * @param {string} dateString Date string to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  return dayjs(dateString).format('DD/MM/YYYY');
};

/**
 * Format a date to display in a friendly format
 * @param {string} dateString Date string to format
 * @returns {string} Formatted date string
 */
export const formatDateFriendly = (dateString) => {
  if (!dateString) return '';
  return dayjs(dateString).format('DD MMMM, YYYY');
};

/**
 * Check if a date is valid
 * @param {string} dateString Date string to check
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidDate = (dateString) => {
  return dayjs(dateString).isValid();
};

/**
 * Calculate duration between two dates in days
 * @param {string} startDate Start date
 * @param {string} endDate End date
 * @returns {number} Duration in days
 */
export const getDurationInDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return end.diff(start, 'day');
};