import styled from 'styled-components';

import { daysOfWeek } from './constants';

export const CalendarModalContainer = styled.div`
  width: min-content;
  height: min-content;

  padding: 13px 20px;
  background: #ffffff;
  border-radius: 4px;
`;

export const PreDefinedPeriodContainer = styled.div`
  position: relative;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 8px;

  button {
    position: relative;
    width: 88px;
    min-height: 24px;

    text-align: center;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: 0px;
    color: #2d3139;

    background: #f2f4f5;
    border-radius: 5px;
    cursor: pointer;
    border: none;

    &:focus {
      filter: drop-shadow(0px 0px 1px #000);
      outline: none;
    }
  }
`;
export const MonthManager = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    font-size: 0;
    border: 0;
    background: transparent;
    border: 1px solid transparent;
    transition: background 0.2s ease-in-out;
    cursor: pointer;

    display: flex;
    align-items: center;

    &:first-of-type {
      transform: scaleX(-1);
    }

    &:hover {
      filter: brightness(90%);
    }

    &:focus {
      border-radius: 5px;
      border: 1px solid #000;
      outline: none;
    }
  }

  span {
    text-align: center;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: 0px;
    color: #2d3139;
  }
`;
export const MonthDaysContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DaysStringContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${daysOfWeek.length}, 1fr);
  cursor: default;
  margin-bottom: 13px;

  span {
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    font-size: 0.5rem;
    line-height: 0.625rem;
    letter-spacing: 0px;
    color: #a7abb2;
  }
`;

export const DaysNumbersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${daysOfWeek.length}, 1fr);
  justify-items: center;
  border-radius: 5px;
  border: 1px solid transparent;

  cursor: pointer;

  &:focus-visible {
    border: 1px solid #a7abb2;
  }
`;

interface DaysNumberProps {
  isDayOfOtherMonth: boolean;
  isSelectedDay: boolean;
  isBetweenDay: boolean;
}

export const DaysNumber = styled.button<DaysNumberProps>`
  position: relative;
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${props => {
    if (props.isSelectedDay) return '#378FF7';
    else if (props.isBetweenDay) return '#378ff745';
    else return 'transparent';
  }};

  transition: background 0.1s ease-in-out;
  opacity: ${props => (props.isDayOfOtherMonth ? 0.43 : 1)};

  span {
    text-align: center;
    font-size: 0.625rem;
    line-height: 0.75rem;
    letter-spacing: 0px;
    color: ${props => (props.isSelectedDay ? '#fff' : '#2d3139')};
    font-weight: ${props => {
      if (props.isSelectedDay) return '700';
      return '400';
    }};
    transition: all 0.1s ease-in-out;
  }

  &:hover,
  &:focus-within {
    background: ${props => (props.isSelectedDay ? '#378FF7' : '#378ff745')};

    span {
      font-weight: 700;
    }
  }
`;
