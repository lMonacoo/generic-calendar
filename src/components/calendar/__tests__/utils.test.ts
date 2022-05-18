import { currentDate } from '../constants';
import {
  createCalendarLabelDate,
  createDaysAvailableInPeriod,
  getAllDaysInMonth,
  getNextDateWithMonthPeriod,
  getPeriodDaysOfNextMonth,
  getPeriodDaysOfPreviousMonth,
  getPreviousDateWithMonthPeriod,
  isSunday,
  returnNewRangeDates,
  verifyIfDayExists,
  verifyIfDayIsBetweenDates,
  verifyIfMonthIsDifferent
} from '../utils';

describe('Testing calendar utils functions', () => {
  describe('(getPreviousDateWithMonthPeriod): Date', () => {
    test('expect to return previous month passing positive number', () => {
      // arrange
      const date = currentDate;
      const monthQuantity = 1;

      // act
      const previousDate = getPreviousDateWithMonthPeriod(date, monthQuantity);

      // assert
      expect(previousDate).toEqual(new Date(date.setMonth(date.getMonth() - monthQuantity)));
    });
    test('expect to return initial date if number was negative', () => {
      // arrange
      const date = currentDate;
      const monthQuantity = -1;

      // act
      const previousDate = getPreviousDateWithMonthPeriod(date, monthQuantity);

      // assert
      expect(previousDate).toEqual(date);
    });
    test('expect to return initial date if number was zero', () => {
      // arrange
      const date = currentDate;
      const monthQuantity = 0;

      // act
      const previousDate = getPreviousDateWithMonthPeriod(date, monthQuantity);

      // assert
      expect(previousDate).toEqual(date);
    });
    test('expect to return for last year if date was in the first month of the year', () => {
      // arrange
      const date = new Date(2022, 0, 1);
      const yearBeforeDate = date.getFullYear() - 1;
      const monthQuantity = 1;

      // act
      const previousDate = getPreviousDateWithMonthPeriod(date, monthQuantity);
      const previousDateFullYear = previousDate.getFullYear();

      // assert
      expect(previousDateFullYear).toEqual(yearBeforeDate);
    });
  });

  describe('(getNextDateWithMonthPeriod): Date', () => {
    test('expect to return next month passing positive number', () => {
      // arrange
      const date = currentDate;
      const monthQuantity = 1;

      // act
      const nextDate = getNextDateWithMonthPeriod(date, monthQuantity);

      // assert
      expect(nextDate).toEqual(new Date(date.setMonth(date.getMonth() + monthQuantity)));
    });
    test('expect to return initial date if number was negative', () => {
      // arrange
      const date = currentDate;
      const monthQuantity = -1;

      // act
      const nextDate = getNextDateWithMonthPeriod(date, monthQuantity);

      // assert
      expect(nextDate).toEqual(date);
    });
    test('expect to return initial date if number was zero', () => {
      // arrange
      const date = currentDate;
      const monthQuantity = 0;

      // act
      const nextDate = getNextDateWithMonthPeriod(date, monthQuantity);

      // assert
      expect(nextDate).toEqual(date);
    });
    test('expect to return for last year if date was in the first month of the year', () => {
      // arrange
      const date = new Date(2022, 11, 1);
      const yearNextDate = date.getFullYear() + 1;
      const monthQuantity = 1;

      // act
      const nextDate = getNextDateWithMonthPeriod(date, monthQuantity);
      const nextDateFullYear = nextDate.getFullYear();

      // assert
      expect(nextDateFullYear).toEqual(yearNextDate);
    });
  });

  describe('(createCalendarLabelDate): string', () => {
    test('expect to return a string with the month name and current year', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const stringPatter = 'May 2022';

      // act
      const labelDate = createCalendarLabelDate(date);

      // assert
      expect(labelDate).toEqual(stringPatter);
    });
    test('expect to return a string with the first character uppercase', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const MonthName = 'May';

      // act
      const labelDate = createCalendarLabelDate(date);

      // assert
      expect(labelDate[0]).toEqual(MonthName[0]);
    });
    test('expect to return a correct month if date was wrong with leap year', () => {
      // arrange
      const date = new Date(2022, 1, 30);
      const MonthName = 'March 2022';

      // act
      const labelDate = createCalendarLabelDate(date);

      // assert
      expect(labelDate).toEqual(MonthName);
    });
  });

  describe('(getAllDaysInMonth): Date[]', () => {
    test('expect to return an array with same length of days in the month', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const quantityOfDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

      // act
      const allDaysInMonth = getAllDaysInMonth(date);

      // assert
      expect(allDaysInMonth.length).toEqual(quantityOfDaysInMonth);
    });
    test('expect to return an array with the first day of the month in the first index', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

      // act
      const allDaysInMonth = getAllDaysInMonth(date);

      // assert
      expect(allDaysInMonth[0].getTime()).toEqual(firstDayOfMonth.getTime());
    });
    test('expect to return an array with the last day of the month in the last index', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      // act
      const allDaysInMonth = getAllDaysInMonth(date);

      // assert
      expect(allDaysInMonth[allDaysInMonth.length - 1].getTime()).toEqual(lastDayOfMonth.getTime());
    });
  });

  describe('(getPeriodDaysOfPreviousMonth): Date[]', () => {
    test('expect to return an array with length wanted', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const quantityOfDaysWantedOfPreviousMonth = 5;

      // act
      const previousMonthDays = getPeriodDaysOfPreviousMonth(
        date,
        quantityOfDaysWantedOfPreviousMonth
      );

      // assert
      expect(previousMonthDays.length).toEqual(quantityOfDaysWantedOfPreviousMonth);
    });
    test('expect to return an array with the last day of the previous month in the last index', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const quantityOfDaysWantedOfPreviousMonth = 5;
      const lastDayOfPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0);

      // act
      const previousMonthDays = getPeriodDaysOfPreviousMonth(
        date,
        quantityOfDaysWantedOfPreviousMonth
      );

      // assert
      expect(previousMonthDays[previousMonthDays.length - 1].getTime()).toEqual(
        lastDayOfPreviousMonth.getTime()
      );
    });
    test('expect to return an array with days of the previous month', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const quantityOfDaysWantedOfPreviousMonth = 5;
      const previousMonthNumber = date.getMonth() - 1;

      // act
      const previousMonthDays = getPeriodDaysOfPreviousMonth(
        date,
        quantityOfDaysWantedOfPreviousMonth
      );

      // assert
      expect(previousMonthDays[0].getMonth()).toEqual(previousMonthNumber);
    });
  });

  describe('(getPeriodDaysOfNextMonth): Date[]', () => {
    test('expect to return an array with length wanted', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const quantityOfDaysWantedOfNextMonth = 5;

      // act
      const nextMonthDays = getPeriodDaysOfNextMonth(date, quantityOfDaysWantedOfNextMonth);

      // assert
      expect(nextMonthDays.length).toEqual(quantityOfDaysWantedOfNextMonth);
    });
    test('expect to return an array with the first day of the next month in the first index', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const quantityOfDaysWantedOfNextMonth = 5;
      const firstDayOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

      // act
      const nextMonthDays = getPeriodDaysOfNextMonth(date, quantityOfDaysWantedOfNextMonth);

      // assert
      expect(nextMonthDays[0].getTime()).toEqual(firstDayOfNextMonth.getTime());
    });
    test('expect to return an array with days of the next month', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const quantityOfDaysWantedOfNextMonth = 5;
      const nextMonthNumber = date.getMonth() + 1;

      // act
      const nextMonthDays = getPeriodDaysOfNextMonth(date, quantityOfDaysWantedOfNextMonth);

      // assert
      expect(nextMonthDays[0].getMonth()).toEqual(nextMonthNumber);
    });
  });

  describe('(isSunday): boolean', () => {
    test('expect to return true if day is sunday', () => {
      // arrange
      const date = new Date(2022, 4, 1).getDay();

      // act
      const verification = isSunday(date);

      // assert
      expect(verification).toBeTruthy();
    });
    test('expect to return false if day is not sunday', () => {
      // arrange
      const date = new Date(2022, 4, 2).getDay();

      // act
      const verification = isSunday(date);

      // assert
      expect(verification).toBeFalsy();
    });
    test('expect to return false if day is negative number', () => {
      // arrange
      const number = -1;

      // act
      const verification = isSunday(number);

      // assert
      expect(verification).toBeFalsy();
    });
  });

  describe('(createDaysAvailableInPeriod): Date[]', () => {
    test('expect to return an array with all days of actual month', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const quantityOfDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

      // act
      const daysAvailableInPeriod = createDaysAvailableInPeriod(date);
      const daysInDateMonth = daysAvailableInPeriod.filter(
        day => day.getMonth() === date.getMonth()
      );

      // assert
      expect(daysInDateMonth.length).toEqual(quantityOfDaysInMonth);
    });
    test('expect to have previous days in the array if month dont start on monday', () => {
      // arrange
      const monthDateThatStartsOnSunday = new Date(2022, 4, 1);
      const previousMonth = monthDateThatStartsOnSunday.getMonth() - 1;

      // act
      const daysAvailableInPeriod = createDaysAvailableInPeriod(monthDateThatStartsOnSunday);

      // assert
      expect(daysAvailableInPeriod[0].getMonth()).toEqual(previousMonth);
    });
    test('expect to have next days in the array if month dont end on sunday', () => {
      // arrange
      const monthDateThatEndsOnTuesday = new Date(2022, 4, 1);
      const nextMonth = monthDateThatEndsOnTuesday.getMonth() + 1;

      // act
      const daysAvailableInPeriod = createDaysAvailableInPeriod(monthDateThatEndsOnTuesday);

      // assert
      expect(daysAvailableInPeriod[daysAvailableInPeriod.length - 1].getMonth()).toEqual(nextMonth);
    });
    test('expect to dont have previous days in the array month starts on monday', () => {
      // arrange
      const monthDateThatStartsOnMonday = new Date(2021, 10, 1);

      // act
      const daysAvailableInPeriod = createDaysAvailableInPeriod(monthDateThatStartsOnMonday);

      // assert
      expect(daysAvailableInPeriod[0].getMonth()).toEqual(monthDateThatStartsOnMonday.getMonth());
    });
    test('expect to dont have next days in the array if month ends on sunday', () => {
      // arrange
      const monthDateThatStartsOnSunday = new Date(2021, 9, 1);

      // act
      const daysAvailableInPeriod = createDaysAvailableInPeriod(monthDateThatStartsOnSunday);

      // assert
      expect(daysAvailableInPeriod[daysAvailableInPeriod.length - 1].getMonth()).toEqual(
        monthDateThatStartsOnSunday.getMonth()
      );
    });
  });

  describe('(returnNewRangeDates): Date[]', () => {
    test('expect to return the default selectedPeriod if the array is bigger than length 2 - length 3', () => {
      // arrange
      const selectedPeriod = [new Date(2022, 4, 5), new Date(2022, 4, 10), new Date(2022, 4, 15)];
      const date = new Date(2022, 4, 1);

      // act
      const newRangeDates = returnNewRangeDates(date, selectedPeriod);

      // assert
      expect(newRangeDates).toEqual(selectedPeriod);
    });
    test('expect to remove the day if the day exists in the selectedPeriod and return the rest of array', () => {
      // arrange
      const selectedPeriod = [new Date(2022, 4, 5), new Date(2022, 4, 10)];
      const date = selectedPeriod[0];

      // act
      const newRangeDates = returnNewRangeDates(date, selectedPeriod);

      // assert
      expect(newRangeDates).toEqual([selectedPeriod[1]]);
    });
    test('expect to return an array with one date if is selectedPeriod is empty', () => {
      // arrange
      const selectedPeriod = [] as Date[];
      const date = new Date(2022, 4, 5);

      // act
      const newRangeDates = returnNewRangeDates(date, selectedPeriod);

      // assert
      expect(newRangeDates).toEqual([date]);
    });
    test('expect to return array with day prop in the end if selectedPeriod has only one index and is before day - length 1', () => {
      // arrange
      const selectedPeriod = [new Date(2022, 4, 5)];
      const date = new Date(2022, 4, 10);

      // act
      const newRangeDates = returnNewRangeDates(date, selectedPeriod);

      // assert
      expect(newRangeDates).toEqual([...selectedPeriod, date]);
    });
    test('expect to return array with day prop in the start if selectedPeriod has only one index and is after day - length 1', () => {
      // arrange
      const selectedPeriod = [new Date(2022, 4, 10)];
      const date = new Date(2022, 4, 5);

      // act
      const newRangeDates = returnNewRangeDates(date, selectedPeriod);

      // assert
      expect(newRangeDates).toEqual([date, ...selectedPeriod]);
    });
    test('expect to replace the first date existent in the array if day prop is near to the first than last date', () => {
      // arrange
      const selectedPeriod = [new Date(2022, 4, 5), new Date(2022, 4, 10)];
      const dateBeforeFirstSelectedPeriod = new Date(2022, 4, 1);

      // act
      const newRangeDates = returnNewRangeDates(dateBeforeFirstSelectedPeriod, selectedPeriod);

      // assert
      expect(newRangeDates).toEqual([dateBeforeFirstSelectedPeriod, selectedPeriod[1]]);
    });
    test('expect to replace the last date existent in the array if day prop is near to the last than first date', () => {
      // arrange
      const selectedPeriod = [new Date(2022, 4, 5), new Date(2022, 4, 10)];
      const dateAfterLastSelectedPeriod = new Date(2022, 4, 15);

      // act
      const newRangeDates = returnNewRangeDates(dateAfterLastSelectedPeriod, selectedPeriod);

      // assert
      expect(newRangeDates).toEqual([selectedPeriod[0], dateAfterLastSelectedPeriod]);
    });
    test('expect to replace the last date if day prop is near to the last than first date in the range dates', () => {
      // arrange
      const selectedPeriod = [new Date(2022, 4, 5), new Date(2022, 4, 10)];
      const dateNearLastDateInPeriod = new Date(2022, 4, 9);

      // act
      const newRangeDates = returnNewRangeDates(dateNearLastDateInPeriod, selectedPeriod);

      // assert
      expect(newRangeDates).toEqual([selectedPeriod[0], dateNearLastDateInPeriod]);
    });
    test('expect to replace the first date if day prop is near to the first than last date in the range dates', () => {
      // arrange
      const selectedPeriod = [new Date(2022, 4, 5), new Date(2022, 4, 10)];
      const dateNearFirstDateInPeriod = new Date(2022, 4, 6);

      // act
      const newRangeDates = returnNewRangeDates(dateNearFirstDateInPeriod, selectedPeriod);

      // assert
      expect(newRangeDates).toEqual([dateNearFirstDateInPeriod, selectedPeriod[1]]);
    });
  });

  describe('(verifyIfDayIsBetweenDates): boolean', () => {
    test('expect to return true if date is between startDate and endDate', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const startDate = new Date(2022, 3, 1);
      const endDate = new Date(2022, 5, 1);

      // act
      const verification = verifyIfDayIsBetweenDates(date, startDate, endDate);

      // assert
      expect(verification).toBeTruthy();
    });
    test('expect to return false if date is after endDate', () => {
      // arrange
      const date = new Date(2022, 6, 1);
      const startDate = new Date(2022, 3, 1);
      const endDate = new Date(2022, 5, 1);

      // act
      const verification = verifyIfDayIsBetweenDates(date, startDate, endDate);

      // assert
      expect(verification).toBeFalsy();
    });
    test('expect to return false if date is before startDate', () => {
      // arrange
      const date = new Date(2022, 2, 1);
      const startDate = new Date(2022, 3, 1);
      const endDate = new Date(2022, 5, 1);

      // act
      const verification = verifyIfDayIsBetweenDates(date, startDate, endDate);

      // assert
      expect(verification).toBeFalsy();
    });
    test('expect to return false if startDate is null', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const startDate = null as unknown as Date;
      const endDate = new Date(2022, 5, 1);

      // act
      const verification = verifyIfDayIsBetweenDates(date, startDate, endDate);

      // assert
      expect(verification).toBeFalsy();
    });
    test('expect to return false if endDate is null', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const startDate = new Date(2022, 3, 1);
      const endDate = null as unknown as Date;

      // act
      const verification = verifyIfDayIsBetweenDates(date, startDate, endDate);

      // assert
      expect(verification).toBeFalsy();
    });
  });

  describe('(verifyIfDayExists): boolean', () => {
    test('expect to return true if day exists in simple array of dates', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const simpleArray = [new Date(2022, 4, 1), new Date(2022, 4, 2)];

      // act
      const verification = verifyIfDayExists(date, simpleArray);

      // assert
      expect(verification).toBeTruthy();
    });
    test('expect to return true if day exists in a big array of dates', () => {
      // arrange
      const date = new Date(2022, 4, 1);
      const allDaysInMonth = getAllDaysInMonth(date);

      // act
      const verification = verifyIfDayExists(date, allDaysInMonth);

      // assert
      expect(verification).toBeTruthy();
    });
    test('expect to return false if day does not exist in simple array of dates', () => {
      // arrange
      const date = new Date(2022, 4, 2);
      const simpleArray = [new Date(2022, 4, 1), new Date(2022, 4, 3)];

      // act
      const verification = verifyIfDayExists(date, simpleArray);

      // assert
      expect(verification).toBeFalsy();
    });
  });

  describe('(verifyIfMonthIsDifferent): boolean', () => {
    test('expect to return true if month is different', () => {
      // arrange
      const date1 = new Date(2022, 4, 1);
      const date2 = new Date(2022, 5, 1);

      // act
      const verification = verifyIfMonthIsDifferent(date1, date2);

      // assert
      expect(verification).toBeTruthy();
    });
    test('expect to return false if month is equal', () => {
      // arrange
      const date1 = new Date(2022, 4, 1);
      const date2 = new Date(2022, 4, 1);

      // act
      const verification = verifyIfMonthIsDifferent(date1, date2);

      // assert
      expect(verification).toBeFalsy();
    });
  });
});
