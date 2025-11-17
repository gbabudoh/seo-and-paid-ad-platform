import { format, formatDistance, formatRelative, isAfter, isBefore, subDays } from 'date-fns';

/**
 * Date formatting utilities
 */

export function formatDate(date: Date | string, formatStr: string = 'PP'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr);
}

export function formatDateDistance(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true });
}

export function formatDateRelative(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatRelative(dateObj, new Date());
}

export function getDateRange(days: number = 30): { start: Date; end: Date } {
  const end = new Date();
  const start = subDays(end, days);
  return { start, end };
}

export function isDateAfter(date: Date | string, compareDate: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const compareObj = typeof compareDate === 'string' ? new Date(compareDate) : compareDate;
  return isAfter(dateObj, compareObj);
}

export function isDateBefore(date: Date | string, compareDate: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const compareObj = typeof compareDate === 'string' ? new Date(compareDate) : compareDate;
  return isBefore(dateObj, compareObj);
}

