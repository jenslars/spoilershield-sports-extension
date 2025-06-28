import React from 'react';
import {
  StyledDateNumber,
  StyledDay,
  StyledWeekday,
  StyledWeekdayBackground,
} from './styles';

const Day = ({ date, isActive, onClick }) => {
  if (!date) return null;

  const today = new Date();
  const isToday = date.toDateString() === today.toDateString(); // Check if the date is today

  const weekdayLetter = date.toLocaleString('default', { weekday: 'short' }).charAt(0); 
  const dayNumber = date.getDate();

  return (
    <StyledDay onClick={onClick} isActive={isActive} isToday={isToday}>
      <StyledWeekdayBackground isToday={isToday} isActive={isActive}>
        <StyledWeekday isToday={isToday} isActive={isActive}>{weekdayLetter}</StyledWeekday>
        <StyledDateNumber isToday={isToday} isActive={isActive}>{dayNumber}</StyledDateNumber>
      </StyledWeekdayBackground>
    </StyledDay>
  );
};

export default Day;
