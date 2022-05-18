import { quantityOfDaysInWeek } from './constants';

export const getPreviousDateWithMonthPeriod = (date: Date, monthQuantity: number): Date => {
  if (monthQuantity <= 0) return date;
  const selectedDate = new Date(date);
  const previousMonthOnYear: number = selectedDate.getMonth() - monthQuantity;
  const previousDate = new Date(selectedDate.setMonth(previousMonthOnYear));

  return previousDate;
};

export const getNextDateWithMonthPeriod = (date: Date, monthQuantity: number): Date => {
  if (monthQuantity <= 0) return date;
  const selectedDate = new Date(date);
  const nextMonthOnYear: number = selectedDate.getMonth() + monthQuantity;
  const nextDate = new Date(selectedDate.setMonth(nextMonthOnYear));

  return nextDate;
};

export const createCalendarLabelDate = (date: Date): string => {
  const monthName = new Intl.DateTimeFormat('default', { month: 'long' }).format(date);
  const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.substring(1);
  const yearNumber = date.getFullYear();
  const finishedLabelDate = `${capitalizedMonthName} ${yearNumber}`;

  return finishedLabelDate;
};

export const getAllDaysInMonth = (date: Date): Date[] => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const iteratedDate = new Date(year, month, 1);
  const allDaysInMonth: Date[] = [];

  while (iteratedDate.getMonth() === month) {
    allDaysInMonth.push(new Date(iteratedDate));
    iteratedDate.setDate(iteratedDate.getDate() + 1);
  }

  return allDaysInMonth;
};

export const getPeriodDaysOfPreviousMonth = (date: Date, daysQuantity: number): Date[] => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysOfPeriod: Date[] = [];
  let loopCounter = 1;

  while (daysQuantity >= loopCounter) {
    daysOfPeriod.push(new Date(year, month, loopCounter - daysQuantity));
    loopCounter++;
  }

  return daysOfPeriod;
};

export const getPeriodDaysOfNextMonth = (date: Date, daysQuantity: number): Date[] => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const daysOfPeriod: Date[] = [];
  let loopCounter = 1;

  while (daysQuantity >= loopCounter) {
    daysOfPeriod.push(new Date(year, month, loopCounter));
    loopCounter++;
  }

  return daysOfPeriod;
};

export const isSunday = (day: number): boolean => day === 0;

export const createDaysAvailableInPeriod = (date: Date): Date[] => {
  const allDaysInMonth = getAllDaysInMonth(date);

  const dayNameOfFirstDayInMonth: number = allDaysInMonth[0].getDay();
  const quantityOfDaysToGetInPreviousMonth = isSunday(dayNameOfFirstDayInMonth)
    ? 6
    : dayNameOfFirstDayInMonth - 1;

  const numberOnWeekOfLastDayInMonth = allDaysInMonth[allDaysInMonth.length - 1].getDay();
  const quantityOfDaysToGetInNextMonth = isSunday(numberOnWeekOfLastDayInMonth)
    ? 0
    : quantityOfDaysInWeek - numberOnWeekOfLastDayInMonth;

  if (quantityOfDaysToGetInNextMonth !== 0) {
    const nextMonthDays = getPeriodDaysOfNextMonth(date, quantityOfDaysToGetInNextMonth);
    allDaysInMonth.push(...nextMonthDays);
  }
  if (quantityOfDaysToGetInPreviousMonth !== 0) {
    const previousMonthDays = getPeriodDaysOfPreviousMonth(
      date,
      quantityOfDaysToGetInPreviousMonth
    );
    allDaysInMonth.unshift(...previousMonthDays);
  }

  return allDaysInMonth;
};

export const returnNewRangeDates = (day: Date, selectedPeriod: Date[]): Date[] => {
  const timestampDay = day.getTime();

  if (verifyIfDayExists(day, selectedPeriod)) {
    const removeDuplicates = selectedPeriod.filter(
      existentDay => existentDay.getTime() !== timestampDay
    );
    return removeDuplicates;
  }

  if (selectedPeriod.length === 0) {
    return [day];
  }
  if (selectedPeriod.length === 1) {
    const existentDate = selectedPeriod[0];
    const selectedPeriodInCorrectOrder =
      existentDate.getTime() > timestampDay ? [day, existentDate] : [existentDate, day];
    return selectedPeriodInCorrectOrder;
  }
  if (selectedPeriod.length === 2) {
    const firstPeriodTimestamp = selectedPeriod[0].getTime();
    const lastPeriodTimestamp = selectedPeriod[1].getTime();

    const dayIsBiggerThanLastPeriod = timestampDay > lastPeriodTimestamp;
    const dayIsSmallerThanFirstPeriod = timestampDay < firstPeriodTimestamp;
    const dayIsNearToLastPeriod =
      timestampDay - firstPeriodTimestamp >= lastPeriodTimestamp - timestampDay;
    const dayIsNearToFirstPeriod =
      timestampDay - firstPeriodTimestamp < lastPeriodTimestamp - timestampDay;

    if (dayIsBiggerThanLastPeriod) return [selectedPeriod[0], day];
    if (dayIsSmallerThanFirstPeriod) return [day, selectedPeriod[1]];
    if (dayIsNearToLastPeriod) return [selectedPeriod[0], day];
    if (dayIsNearToFirstPeriod) return [day, selectedPeriod[1]];
  }
  return selectedPeriod;
};

export const verifyIfDayIsBetweenDates = (date: Date, startDate: Date, endDate: Date): boolean => {
  if (!startDate || !endDate) return false;
  return date.getTime() > startDate.getTime() && date.getTime() < endDate.getTime();
};

export const verifyIfDayExists = (day: Date, arrayOfDates: Date[]): boolean => {
  return !!arrayOfDates.find(date => date.getTime() === day.getTime());
};

export const verifyIfMonthIsDifferent = (date1: Date, date2: Date): boolean => {
  return date1.getMonth() !== date2.getMonth();
};
