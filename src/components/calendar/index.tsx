import React, { useCallback, useEffect, useRef, useState } from 'react';

// import IconComponent from '~/assets/icons/component';
import { currentDate, daysOfWeek } from './constants';
import RightArrowIcon from './right_arrow.svg';
import {
  MonthManager,
  CalendarModalContainer,
  PreDefinedPeriodContainer,
  MonthDaysContainer,
  DaysStringContainer,
  DaysNumbersContainer,
  DaysNumber
} from './styles';
import * as utils from './utils';

interface ButtonsDefinedPeriodsProps {
  label: string;
  returnInMonths: number;
}

export interface CalendarProps {
  setPeriod: (PeriodSelected: Date[]) => void;
  date?: Date[];
  buttonsDefinedPeriods?: ButtonsDefinedPeriodsProps[];
}

/**
 * This component will render a calendar with the days available and pre defined periods buttons
 * @param {CalendarProps['setPeriod']} setPeriod - function to set the period selected
 * @param {CalendarProps['date']=} date - Tuple of range of dates selected
 * @param {CalendarProps['buttonsDefinedPeriods']=} buttonsDefinedPeriods - label and returnInMonths of the buttons
 * @returns {JSX.Element} return the rendered calendar
 * @example
 * const [date, setDate] = useState<Date[]>([])
 * <Calendar setPeriod={setDate} date={date} />
 */

export const Calendar = ({
  setPeriod,
  date = [currentDate],
  buttonsDefinedPeriods
}: CalendarProps): JSX.Element => {
  const [dayInFocus, setDayInFocus] = useState<Date | null>(
    date.length > 1 ? date[date.length - 1] : null
  );
  const [mainVisiblePeriod, setMainVisiblePeriod] = useState<Date>(date[date.length - 1]);
  const [selectedPeriod, setSelectedPeriod] = useState<Date[]>(date.length > 1 ? date : []);
  const daysRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    if (dayInFocus && dayInFocus.getMonth() !== mainVisiblePeriod.getMonth()) {
      setDayInFocus(new Date(mainVisiblePeriod.getFullYear(), mainVisiblePeriod.getMonth(), 1));
      return;
    }
    setDayInFocus(dayInFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainVisiblePeriod]);

  const submitCalendar = (submittedPeriod: Date[]) => {
    setPeriod(submittedPeriod);
  };

  const handlePreDefinedPeriodInMonths = (monthQuantity: number) => {
    const actualDate = new Date(new Date().setHours(0, 0, 1, 0));
    const previousDate = utils.getPreviousDateWithMonthPeriod(actualDate, monthQuantity);
    submitCalendar([previousDate, actualDate]);
  };

  const backwardPeriodInMonthsToUpdateCalendar = useCallback(
    (monthQuantity = 1) => {
      const previousDate = utils.getPreviousDateWithMonthPeriod(mainVisiblePeriod, monthQuantity);
      setMainVisiblePeriod(previousDate);
    },
    [mainVisiblePeriod]
  );

  const forwardPeriodInMothsToUpdateCalendar = useCallback(
    (monthQuantity = 1) => {
      const futureDate = utils.getNextDateWithMonthPeriod(mainVisiblePeriod, monthQuantity);
      setMainVisiblePeriod(futureDate);
    },
    [mainVisiblePeriod]
  );

  const focusForwardPeriodInDays = useCallback(
    (daysQuantity: number) => {
      if (dayInFocus) {
        const nextPeriodInFocus = new Date(
          new Date(dayInFocus).setDate(dayInFocus.getDate() + daysQuantity)
        );

        if (mainVisiblePeriod.getMonth() < nextPeriodInFocus.getMonth()) {
          forwardPeriodInMothsToUpdateCalendar(1);
        }

        setDayInFocus(nextPeriodInFocus);
      }
    },
    [dayInFocus, forwardPeriodInMothsToUpdateCalendar, mainVisiblePeriod]
  );

  const focusBackwardPeriodInDays = useCallback(
    (daysQuantity: number) => {
      if (dayInFocus) {
        const previousPeriodInFocus = new Date(
          new Date(dayInFocus).setDate(dayInFocus.getDate() - daysQuantity)
        );

        if (mainVisiblePeriod.getMonth() > previousPeriodInFocus.getMonth()) {
          backwardPeriodInMonthsToUpdateCalendar(1);
        }

        setDayInFocus(previousPeriodInFocus);
      }
    },
    [backwardPeriodInMonthsToUpdateCalendar, dayInFocus, mainVisiblePeriod]
  );

  const changeMainMonthShortcutKeyboard = useCallback(
    (event: React.KeyboardEvent): void => {
      const { key } = event;
      const shiftIsPressed = event.shiftKey;

      switch (key) {
        case 'PageDown':
          event.preventDefault();
          return forwardPeriodInMothsToUpdateCalendar(shiftIsPressed ? 12 : 1);
        case 'PageUp':
          event.preventDefault();
          return backwardPeriodInMonthsToUpdateCalendar(shiftIsPressed ? 12 : 1);
      }
    },
    [backwardPeriodInMonthsToUpdateCalendar, forwardPeriodInMothsToUpdateCalendar]
  );

  const arrowShortcutKeyboard = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        return focusBackwardPeriodInDays(7);
      case 'ArrowDown':
        event.preventDefault();
        return focusForwardPeriodInDays(7);
      case 'ArrowLeft':
        event.preventDefault();
        return focusBackwardPeriodInDays(1);
      case 'ArrowRight':
        event.preventDefault();
        return focusForwardPeriodInDays(1);
    }
  };

  const handleSelectDay = (day: Date) => {
    if (utils.verifyIfMonthIsDifferent(day, mainVisiblePeriod)) {
      day > mainVisiblePeriod
        ? forwardPeriodInMothsToUpdateCalendar()
        : backwardPeriodInMonthsToUpdateCalendar();
      return;
    }

    setDayInFocus(new Date(day));

    const newSelectedDates = utils.returnNewRangeDates(day, selectedPeriod);
    setSelectedPeriod(newSelectedDates);
    submitCalendar(newSelectedDates);
  };

  const manageTabIndexDay = (day: Date): number => {
    const hasNotDaySelected = selectedPeriod.length === 0;
    const isFirstDayOfMainMonth =
      new Date(day).getTime() === new Date(new Date(mainVisiblePeriod).setDate(1)).getTime();

    if (hasNotDaySelected && isFirstDayOfMainMonth && !dayInFocus) {
      setDayInFocus(new Date(new Date(mainVisiblePeriod).setDate(1)));
      return 0;
    }

    return dayInFocus && dayInFocus.getTime() === day.getTime() ? 0 : -1;
  };

  return (
    <CalendarModalContainer
      onKeyDown={(event: React.KeyboardEvent) => changeMainMonthShortcutKeyboard(event)}
    >
      <PreDefinedPeriodContainer>
        {buttonsDefinedPeriods?.map(buttonDefinedPeriod => {
          return (
            <button
              key={buttonDefinedPeriod.label}
              onClick={() => handlePreDefinedPeriodInMonths(buttonDefinedPeriod.returnInMonths)}
            >
              {buttonDefinedPeriod.label}
            </button>
          );
        })}
      </PreDefinedPeriodContainer>

      <MonthManager>
        <button onClick={() => backwardPeriodInMonthsToUpdateCalendar()} data-testid='prev-arrow'>
          <img src={RightArrowIcon} alt='arrow-left' />
        </button>
        <span>{utils.createCalendarLabelDate(mainVisiblePeriod)}</span>
        <button onClick={() => forwardPeriodInMothsToUpdateCalendar()} data-testid='next-arrow'>
          <img src={RightArrowIcon} alt='arrow-right' />
        </button>
      </MonthManager>

      <MonthDaysContainer>
        <DaysStringContainer>
          {daysOfWeek.map(day => {
            return (
              <span key={day} title={day}>
                {day.slice(0, 3)}
              </span>
            );
          })}
        </DaysStringContainer>
        <DaysNumbersContainer
          data-testid='days-container'
          onKeyDown={arrowShortcutKeyboard}
          tabIndex={0}
        >
          {utils.createDaysAvailableInPeriod(mainVisiblePeriod).map((day: Date, index: number) => {
            const isSelected = utils.verifyIfDayExists(day, selectedPeriod);
            const isDayOfOtherMonth = utils.verifyIfMonthIsDifferent(day, mainVisiblePeriod);
            const isDayBetweenDaysSelected = utils.verifyIfDayIsBetweenDates(
              day,
              selectedPeriod[0],
              selectedPeriod[1]
            );

            if (dayInFocus?.getTime() === day.getTime() && daysRef.current[index]) {
              setTimeout(() => {
                daysRef.current[index].setAttribute('tabindex', '0');
                daysRef.current[index].focus();
              }, 50);
            }

            return (
              <DaysNumber
                ref={(buttonRef: HTMLButtonElement) => (daysRef.current[index] = buttonRef)}
                key={`${day.getTime()}`}
                onClick={() => handleSelectDay(day)}
                tabIndex={manageTabIndexDay(day)}
                isDayOfOtherMonth={isDayOfOtherMonth}
                isBetweenDay={isDayBetweenDaysSelected}
                isSelectedDay={isSelected}
              >
                <span>{day.getDate()}</span>
              </DaysNumber>
            );
          })}
        </DaysNumbersContainer>
      </MonthDaysContainer>
    </CalendarModalContainer>
  );
};
