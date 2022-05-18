import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Calendar, CalendarProps } from '../index';
import * as utils from '../utils';
import { currentDate } from '../constants';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const initialProps: CalendarProps = {
  setPeriod: jest.fn(),
  buttonsDefinedPeriods: [
    { label: '1 Month', returnInMonths: 1 },
    { label: '3 Months', returnInMonths: 3 },
    { label: '6 Months', returnInMonths: 6 },
    { label: '1 Year', returnInMonths: 12 }
  ]
};

describe('<Calendar />', () => {
  describe('Renders', () => {
    test('expect to render correctly label calendar with current date', () => {
      // arrange
      const mockProps = { ...initialProps };
      const labelCalendar = utils.createCalendarLabelDate(currentDate);
      render(<Calendar {...mockProps} />);

      // act
      const labelText = screen.getByText(labelCalendar);

      // assert
      expect(labelText).toBeInTheDocument();
    });
    test('expect to render buttons of pre defined period if prop have buttonsDefinedPeriods valid', () => {
      // arrange
      const mockProps = {
        ...initialProps,
        buttonsDefinedPeriods: [{ label: '1 Month', returnInMonths: 1 }]
      };
      render(<Calendar {...mockProps} />);

      // act
      const labelButton = screen.getByText('1 Month');

      // assert
      expect(labelButton).toBeInTheDocument();
    });
    test('expect to not render buttons of pre defined period if prop dont have buttonsDefinedPeriods valid', () => {
      // arrange
      const mockProps = { ...initialProps, buttonsDefinedPeriods: undefined };
      render(<Calendar {...mockProps} />);

      // act
      const labelButton = screen.queryByText('1 Month');

      // assert
      expect(labelButton).not.toBeInTheDocument();
    });
  });
  describe('Styles', () => {
    test('verify styles if day is normal', () => {
      // arrange
      const mockProps = { ...initialProps, date: [new Date(2022, 4, 15), new Date(2022, 4, 20)] };
      const date = new Date(2022, 4, 21);
      const normalDayStyle = 'color: #2d3139; font-weight: 400;';
      const normalDayParentStyle = 'background: transparent;';
      render(<Calendar {...mockProps} />);

      // act
      const selectedDay = screen.getByText(String(date.getDate()));
      const selectedDayParent = selectedDay.parentElement;

      // assert
      expect(selectedDay).toHaveStyle(normalDayStyle);
      expect(selectedDayParent).toHaveStyle(normalDayParentStyle);
    });
    test('change styles if day is selected', () => {
      // arrange
      const mockProps = { ...initialProps, date: [new Date(2022, 4, 15), new Date(2022, 4, 20)] };
      const selectedDayStyles = 'color: #fff; font-weight: 700;';
      const selectedParentDayStyles = 'background: #378FF7;';
      render(<Calendar {...mockProps} />);

      // act
      const selectedDay = screen.getByText(String(mockProps.date[0].getDate()));
      const selectedDayParent = selectedDay.parentElement;

      // assert
      expect(selectedDay).toHaveStyle(selectedDayStyles);
      expect(selectedDayParent).toHaveStyle(selectedParentDayStyles);
    });
    test('change styles if day is between selected dates', () => {
      // arrange
      const mockProps = { ...initialProps, date: [new Date(2022, 4, 10), new Date(2022, 5, 0)] };
      const date = new Date(2022, 4, 20);
      const betweenSelectedDaysStyle = 'color: #2d3139; font-weight: 400;';
      const betweenSelectedDaysParentStyle = 'background: #378ff745;';
      render(<Calendar {...mockProps} />);

      // act
      const selectedDay = screen.getByText(String(date.getDate()));
      const selectedDayParent = selectedDay.parentElement;

      // assert
      expect(selectedDay).toHaveStyle(betweenSelectedDaysStyle);
      expect(selectedDayParent).toHaveStyle(betweenSelectedDaysParentStyle);
    });
    test('change style if day month is not of the main visible month', () => {
      // arrange
      const mockProps = { ...initialProps, date: [new Date(2022, 4, 15), new Date(2022, 4, 20)] };
      const notVisibleMonthParentStyle = 'opacity: 0.43;';
      render(<Calendar {...mockProps} />);

      // act
      const firstDays = screen.queryAllByText(1);
      const firstDayOfNextMonthParam = firstDays[firstDays.length - 1].parentElement;

      // assert
      expect(firstDayOfNextMonthParam).toHaveStyle(notVisibleMonthParentStyle);
    });
  });
  describe('Interactions', () => {
    describe('Click', () => {
      beforeEach(() => jest.clearAllMocks());

      test('expect to call setPeriod if click in pre determined periods - 1 Month', () => {
        // arrange
        const mockProps = { ...initialProps };
        const actualDate = new Date(new Date().setHours(0, 0, 1, 0));
        const previousDate = utils.getPreviousDateWithMonthPeriod(actualDate, 1);
        render(<Calendar {...mockProps} />);

        // act
        const preDeterminedPeriodButton = screen.getByText('1 Month');
        fireEvent.click(preDeterminedPeriodButton);

        // assert
        expect(mockProps.setPeriod).toHaveBeenCalledWith([previousDate, actualDate]);
        expect(mockProps.setPeriod).toHaveBeenCalledTimes(1);
      });
      test('expect to call setPeriod if click in pre determined periods - 3 Months', () => {
        // arrange
        const mockProps = { ...initialProps };
        const actualDate = new Date(new Date().setHours(0, 0, 1, 0));
        const previousDate = utils.getPreviousDateWithMonthPeriod(actualDate, 3);
        render(<Calendar {...mockProps} />);

        // act
        const preDeterminedPeriodButton = screen.getByText('3 Months');
        fireEvent.click(preDeterminedPeriodButton);

        // assert
        expect(mockProps.setPeriod).toHaveBeenCalledWith([previousDate, actualDate]);
        expect(mockProps.setPeriod).toHaveBeenCalledTimes(1);
      });
      test('expect to call setPeriod if click in pre determined periods - 6 Months', () => {
        // arrange
        const mockProps = { ...initialProps };
        const actualDate = new Date(new Date().setHours(0, 0, 1, 0));
        const previousDate = utils.getPreviousDateWithMonthPeriod(actualDate, 6);
        render(<Calendar {...mockProps} />);

        // act
        const preDeterminedPeriodButton = screen.getByText('6 Months');
        fireEvent.click(preDeterminedPeriodButton);

        // assert
        expect(mockProps.setPeriod).toHaveBeenCalledWith([previousDate, actualDate]);
        expect(mockProps.setPeriod).toHaveBeenCalledTimes(1);
      });
      test('expect to call setPeriod if click in pre determined periods - 1 year', () => {
        // arrange
        const mockProps = { ...initialProps };
        const actualDate = new Date(new Date().setHours(0, 0, 1, 0));
        const previousDate = utils.getPreviousDateWithMonthPeriod(actualDate, 12);
        render(<Calendar {...mockProps} />);

        // act
        const selectedDay = screen.getByText('1 Year');
        fireEvent.click(selectedDay);

        // assert
        expect(mockProps.setPeriod).toHaveBeenCalledWith([previousDate, actualDate]);
        expect(mockProps.setPeriod).toHaveBeenCalledTimes(1);
      });
      test('expect to change to previous month if click in prev arrow', () => {
        // arrange
        const mockProps = { ...initialProps };
        const prevLabelOfCurrentDate = utils.createCalendarLabelDate(
          utils.getPreviousDateWithMonthPeriod(currentDate, 1)
        );
        render(<Calendar {...mockProps} />);

        // act
        const prevArrow = screen.getByTestId('prev-arrow');
        fireEvent.click(prevArrow);
        const labelText = screen.getByText(prevLabelOfCurrentDate);

        // assert
        expect(labelText).toBeInTheDocument();
      });
      test('expect to change to next month if click in next arrow', () => {
        // arrange
        const mockProps = { ...initialProps };
        const nextLabelOfCurrentDate = utils.createCalendarLabelDate(
          utils.getNextDateWithMonthPeriod(currentDate, 1)
        );
        render(<Calendar {...mockProps} />);

        // act
        const nextArrow = screen.getByTestId('next-arrow');
        fireEvent.click(nextArrow);
        const labelText = screen.getByText(nextLabelOfCurrentDate);

        // assert
        expect(labelText).toBeInTheDocument();
      });
      test('expect to select period if click in some day and selectedPeriod was empty', () => {
        // arrange
        const mockProps = { ...initialProps };
        const selectedDayNumber = 15;
        const dateReturnedFromMock = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          selectedDayNumber
        );
        const selectedDayStyle = 'background: #378FF7;';
        render(<Calendar {...mockProps} />);

        // act
        const selectedDay = screen.getByText(String(selectedDayNumber));
        fireEvent.click(selectedDay);

        // assert
        expect(selectedDay.parentElement).toHaveStyle(selectedDayStyle);
        waitFor(() => expect(selectedDay.parentElement).toHaveFocus());
        expect(mockProps.setPeriod).toHaveBeenCalledWith([dateReturnedFromMock]);
      });
      test('expect to discard date if click is in some existent selectedPeriod day', () => {
        // arrange
        const mockProps = { ...initialProps, date: [new Date(2022, 4, 15), new Date(2022, 4, 20)] };
        const normalDayStyle = 'background: transparent;';
        render(<Calendar {...mockProps} />);

        // act
        const selectedDay = screen.getByText(mockProps.date[0].getDate());
        fireEvent.click(selectedDay);

        // assert
        expect(selectedDay.parentElement).toHaveStyle(normalDayStyle);
        waitFor(() => expect(selectedDay.parentElement).toHaveFocus());
        expect(mockProps.setPeriod).toHaveBeenCalledWith([mockProps.date[1]]);
      });
      test('expect to insert date selected before the existent date if the new was before the other', () => {
        // arrange
        const mockProps = { ...initialProps };
        const lowestData = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);
        const biggestData = new Date(currentDate.getFullYear(), currentDate.getMonth(), 20);
        render(<Calendar {...mockProps} />);

        // act
        const firstSelectedDay = screen.getByText(String(biggestData.getDate()));
        fireEvent.click(firstSelectedDay);
        const lastSelectedDay = screen.getByText(String(lowestData.getDate()));
        fireEvent.click(lastSelectedDay);

        // assert
        expect(mockProps.setPeriod).toHaveBeenCalledWith([lowestData, biggestData]);
      });
      test('expect to insert date selected after the existent date if the new was after the other', () => {
        // arrange
        const mockProps = { ...initialProps };
        const lowestData = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);
        const biggestData = new Date(currentDate.getFullYear(), currentDate.getMonth(), 20);
        render(<Calendar {...mockProps} />);

        // act
        const lastSelectedDay = screen.getByText(String(lowestData.getDate()));
        fireEvent.click(lastSelectedDay);
        const firstSelectedDay = screen.getByText(String(biggestData.getDate()));
        fireEvent.click(firstSelectedDay);

        // assert
        expect(mockProps.setPeriod).toHaveBeenCalledWith([lowestData, biggestData]);
      });
      test('expect to move selected dates if all range was selected and maintain the order', () => {
        // arrange
        const mockProps = { ...initialProps, date: [new Date(2022, 4, 15), new Date(2022, 4, 20)] };
        const selectedDayNumber = 17;
        const dateReturnedFromMock = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          selectedDayNumber
        );
        render(<Calendar {...mockProps} />);

        // act
        const selectedDay = screen.getByText(selectedDayNumber);
        fireEvent.click(selectedDay);

        // assert
        expect(mockProps.setPeriod).toHaveBeenCalledWith([dateReturnedFromMock, mockProps.date[1]]);
      });
      test('expect to move to previous month if user click in outside main visible month days (days of previous month)', () => {
        // arrange
        const mockProps = { ...initialProps, date: [new Date(2022, 4, 15), new Date(2022, 4, 20)] };
        const prevLabelOfCurrentDate = utils.createCalendarLabelDate(
          new Date(mockProps.date[0].getFullYear(), mockProps.date[0].getMonth() - 1, 1)
        );
        render(<Calendar {...mockProps} />);

        // act
        const dayOfPreviousMonth = screen.queryAllByText(30)[0];
        fireEvent.click(dayOfPreviousMonth);
        const labelText = screen.getByText(prevLabelOfCurrentDate);

        // assert
        expect(labelText).toBeInTheDocument();
      });
      test('expect to move to next month if user click in outside main visible month days (days of next month)', () => {
        // arrange
        const mockProps = { ...initialProps, date: [new Date(2022, 4, 15), new Date(2022, 4, 20)] };
        const nextLabelOfCurrentDate = utils.createCalendarLabelDate(
          new Date(mockProps.date[0].getFullYear(), mockProps.date[0].getMonth() + 1, 1)
        );
        render(<Calendar {...mockProps} />);

        // act
        const firstDayOfMonths = screen.queryAllByText(1);
        const firstDayOfNextMonth = firstDayOfMonths[firstDayOfMonths.length - 1];
        fireEvent.click(firstDayOfNextMonth);
        const labelText = screen.getByText(nextLabelOfCurrentDate);

        // assert
        expect(labelText).toBeInTheDocument();
      });
    });

    describe('Keyboard', () => {
      test('expect to change to next month if pressed PageDown key', () => {
        // arrange
        const mockProps = { ...initialProps };
        const nextLabelOfCurrentDate = utils.createCalendarLabelDate(
          utils.getNextDateWithMonthPeriod(currentDate, 1)
        );
        render(<Calendar {...mockProps} />);

        // act
        const randomContainer = screen.getByTestId('days-container');
        fireEvent.keyDown(randomContainer, { key: 'PageDown' });
        const labelText = screen.getByText(nextLabelOfCurrentDate);

        // assert
        expect(labelText).toBeInTheDocument();
      });
      test('expect to change to previous month if pressed PageUp key', () => {
        // arrange
        const mockProps = { ...initialProps };
        const prevLabelOfCurrentDate = utils.createCalendarLabelDate(
          utils.getPreviousDateWithMonthPeriod(currentDate, 1)
        );
        render(<Calendar {...mockProps} />);

        // act
        const randomContainer = screen.getByTestId('days-container');
        fireEvent.keyDown(randomContainer, { key: 'PageUp' });
        const labelText = screen.getByText(prevLabelOfCurrentDate);

        // assert
        expect(labelText).toBeInTheDocument();
      });
      test('expect to change to previous year if pressed Shift and PageUp key', () => {
        // arrange
        const mockProps = { ...initialProps };
        const prevLabelOfCurrentDate = utils.createCalendarLabelDate(
          utils.getPreviousDateWithMonthPeriod(currentDate, 12)
        );
        render(<Calendar {...mockProps} />);

        // act
        const randomContainer = screen.getByTestId('days-container');
        fireEvent.keyDown(randomContainer, { key: 'PageUp', shiftKey: true });
        const labelText = screen.getByText(prevLabelOfCurrentDate);

        // assert
        expect(labelText).toBeInTheDocument();
      });
      test('expect to change to next year if pressed Shift and PageDown key', () => {
        // arrange
        const mockProps = { ...initialProps };
        const nextLabelOfCurrentDate = utils.createCalendarLabelDate(
          utils.getNextDateWithMonthPeriod(currentDate, 12)
        );
        render(<Calendar {...mockProps} />);

        // act
        const randomContainer = screen.getByTestId('days-container');
        fireEvent.keyDown(randomContainer, { key: 'PageDown', shiftKey: true });
        const labelText = screen.getByText(nextLabelOfCurrentDate);

        // assert
        expect(labelText).toBeInTheDocument();
      });
      test('expect to move focus to next day if pressed ArrowRight key', async () => {
        // arrange
        const mockProps = { ...initialProps, date: [new Date(2022, 3, 27), new Date(2022, 4, 15)] };
        const nextDayFocus = new Date(
          new Date(mockProps.date[1]).setDate(mockProps.date[1].getDate() + 1)
        );
        render(<Calendar {...mockProps} />);

        // act
        const daysContainer = screen.getByTestId('days-container');
        fireEvent.keyDown(daysContainer, { key: 'ArrowRight' });
        const dayFocus = screen.getByText(String(nextDayFocus.getDate()));

        // assert
        waitFor(() => expect(dayFocus.parentElement).toHaveFocus());
      });
      test('expect to move focus to previous day if pressed ArrowLeft key', async () => {
        // arrange
        const mockProps = { ...initialProps, date: [new Date(2022, 3, 27), new Date(2022, 4, 15)] };
        const previousDayFocus = new Date(
          new Date(mockProps.date[1]).setDate(mockProps.date[1].getDate() - 1)
        );
        render(<Calendar {...mockProps} />);

        // act
        const daysContainer = screen.getByTestId('days-container');
        fireEvent.keyDown(daysContainer, { key: 'ArrowLeft' });
        const dayFocus = screen.getByText(String(previousDayFocus.getDate()));

        // assert
        waitFor(() => expect(dayFocus.parentElement).toHaveFocus());
      });
      test('expect to move focus to next week if pressed ArrowDown key', () => {
        // arrange
        const mockProps = { ...initialProps, date: [new Date(2022, 3, 27), new Date(2022, 4, 15)] };
        const nextWeekFocus = new Date(
          new Date(mockProps.date[1]).setDate(mockProps.date[1].getDate() + 7)
        );
        render(<Calendar {...mockProps} />);

        // act
        const daysContainer = screen.getByTestId('days-container');
        fireEvent.keyDown(daysContainer, { key: 'ArrowDown' });
        const dayFocus = screen.getByText(String(nextWeekFocus.getDate()));

        // assert
        waitFor(() => expect(dayFocus.parentElement).toHaveFocus());
      });
      test('expect to move focus to previous week if pressed ArrowUp key', () => {
        // arrange
        const mockProps = { ...initialProps, date: [new Date(2022, 3, 27), new Date(2022, 4, 15)] };
        const previousWeekFocus = new Date(
          new Date(mockProps.date[1]).setDate(mockProps.date[1].getDate() - 7)
        );
        render(<Calendar {...mockProps} />);

        // act
        const daysContainer = screen.getByTestId('days-container');
        fireEvent.keyDown(daysContainer, { key: 'ArrowUp' });
        const dayFocus = screen.getByText(String(previousWeekFocus.getDate()));

        // assert
        waitFor(() => expect(dayFocus.parentElement).toHaveFocus());
      });
      test('expect to move focus to last day of previous month if pressed ArrowLeft in first day of month', async () => {
        // arrange
        const mockProps = { ...initialProps, date: [new Date(2022, 3, 1)] };
        const lastDayOfPreviousMonth = new Date(
          mockProps.date[0].getFullYear(),
          mockProps.date[0].getMonth(),
          0
        );
        const lastMonthLabel = utils.createCalendarLabelDate(lastDayOfPreviousMonth);
        render(<Calendar {...mockProps} />);

        // act
        const daysContainer = screen.getByTestId('days-container');
        fireEvent.keyDown(daysContainer, { key: 'ArrowLeft' });
        const dayFocus = screen.getByText(String(lastDayOfPreviousMonth.getDate()));
        const labelText = screen.getByText(lastMonthLabel);

        // assert
        waitFor(() => {
          expect(dayFocus.parentElement).toHaveAttribute('tabindex', '0');
          expect(labelText).toBeInTheDocument();
        });
      });
      test('expect to move focus to first day of previous month if pressed ArrowRight in last day of month', async () => {
        // arrange
        const mockProps = { ...initialProps, date: [new Date(2022, 3, 25), new Date(2022, 3, 30)] };
        const firstDayOfNextMonth = new Date(
          mockProps.date[0].getFullYear(),
          mockProps.date[0].getMonth() + 1,
          1
        );
        const nextMonthLabel = utils.createCalendarLabelDate(firstDayOfNextMonth);
        render(<Calendar {...mockProps} />);

        // act
        const daysContainer = screen.getByTestId('days-container');
        fireEvent.keyDown(daysContainer, { key: 'ArrowRight' });
        const dayFocus = await screen.findAllByText(String(firstDayOfNextMonth.getDate()));
        const labelText = screen.getByText(nextMonthLabel);

        // assert
        waitFor(() => {
          expect(dayFocus[0].parentElement).toHaveAttribute('tabindex', '0');
          expect(labelText).toBeInTheDocument();
        });
      });
      test('expect to move focus to previous month if pressed ArrowUp in first week line of month', () => {
        // arrange
        const mockProps = { ...initialProps, date: [new Date(2022, 3, 1), new Date(2022, 3, 3)] };
        const previousMonth = utils.getPreviousDateWithMonthPeriod(mockProps.date[0], 1);
        const previousMonthLabel = utils.createCalendarLabelDate(previousMonth);
        render(<Calendar {...mockProps} />);

        // act
        const daysContainer = screen.getByTestId('days-container');
        fireEvent.keyDown(daysContainer, { key: 'ArrowUp' });
        const labelText = screen.getByText(previousMonthLabel);

        // assert
        waitFor(() => {
          expect(labelText).toBeInTheDocument();
          expect(previousMonth.getMonth()).not.toEqual(mockProps.date[0].getMonth());
          expect(previousMonth.getMonth()).toEqual(mockProps.date[0].getMonth() - 1);
        });
      });
      test('expect to move focus to next month if pressed ArrowDown in last week line of month', () => {
        // arrange
        const mockProps = { ...initialProps, date: [new Date(2022, 3, 25), new Date(2022, 3, 27)] };
        const nextMonth = utils.getNextDateWithMonthPeriod(mockProps.date[0], 1);
        const nextMonthLabel = utils.createCalendarLabelDate(nextMonth);
        render(<Calendar {...mockProps} />);

        // act
        const daysContainer = screen.getByTestId('days-container');
        fireEvent.keyDown(daysContainer, { key: 'ArrowDown' });
        const labelText = screen.getByText(nextMonthLabel);

        // assert
        waitFor(() => {
          expect(labelText).toBeInTheDocument();
          expect(nextMonth.getMonth()).not.toEqual(mockProps.date[0].getMonth());
          expect(nextMonth.getMonth()).toEqual(mockProps.date[0].getMonth() + 1);
        });
      });
    });
  });
});
